import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // localStorage.clear();
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [selectedWishlistItems, setSelectedWishlistItems] = useState([]);

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    return storedUser || { firstname: "", lastname: "", email: "" };
  });

  const setUserData = (userData) => {
    setUser(userData);
  };
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const addToCart = (product) => {
    axios
      .post("http://localhost:8080/addcart", product)
      .then((response) => {
        setCartItems((prevItems) => [...prevItems, { ...product }]);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });

    alert("Product added to cart");
  };

  const removeFromCart = (productId) => {
    axios
      .delete(`http://localhost:8080/products/${productId}`)
      .then((response) => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
        alert("Product removed from cart:");
        console.log("Product removed from cart:");
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  const incrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/wishlist")
      .then((response) => {
        if (response.data !== "Fail" && response.data !== "Error") {
          if (Array.isArray(response.data)) {
            setWishItems(response.data);
          }
        } else {
          console.log("No Items in the wishlist");
        }
      })
      .catch((error) => {
        console.error("Error fetching wishlist items:", error);
      });
  }, []);

  const addToWishlist = (product) => {
    axios
      .post("http://localhost:8080/addwishlist", product)
      .then((response) => {
        setWishItems((prevItems) => [...prevItems, product]);
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
      });
    alert("Product added to wishlist");
  };

  const removeFromWishlist = (productId) => {
    axios
      .delete(`http://localhost:8080/wishlist/${productId}`)
      .then((response) => {
        setWishItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
        alert("Product removed from wishlist");
      })
      .catch((error) => {
        console.error("Error removing product from wishlist:", error);
      });
  };

  const moveFromWishlistToCart = () => {
    selectedWishlistItems.forEach((productId) => {
      const product = wishItems.find((item) => item.id === productId);
      if (product) {
        addToCart(product);
        removeFromWishlist(productId);
      }
    });
    setSelectedWishlistItems([]);
  };

  const handleCheckboxChange = (productId) => {
    if (selectedWishlistItems.includes(productId)) {
      setSelectedWishlistItems(
        selectedWishlistItems.filter((id) => id !== productId)
      );
    } else {
      setSelectedWishlistItems([...selectedWishlistItems, productId]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        user,
        setUserData,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        calculateTotalPrice,
        wishItems,
        addToWishlist,
        removeFromWishlist,
        moveFromWishlistToCart,
        selectedWishlistItems,
        handleCheckboxChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useData() {
  return useContext(CartContext);
}
