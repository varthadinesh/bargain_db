import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = (props) => {
  //eslint-disable-next-line no-unused-vars
  const [existingProducts, setExistingProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const { addToCart, addToWishlist, cartItems } = useCart();
  props.product.userid = sessionStorage.getItem("user-token");
  // console.log(cartItems.length);
  useEffect(() => {
    axios
      .get("http://localhost:8080/addcart")
      .then((response) => {
        if (response.data !== "Fail" && response.data !== "Error") {
          if (Array.isArray(response.data)) {
            setExistingProducts(response.data);
          }
        } else {
          console.log("No Items in the cart");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });

    if (sessionStorage.getItem("token") !== "admin") {
      sessionStorage.getItem("user-token") !== null && setIsLoggedIn(true);
    }
  }, []);

  const handleAddToWishlist = () => {
    if (isLoggedIn) {
      addToWishlist(props.product);
    } else {
      navigate("/login");
    }
  };

  const handleAddToCart = () => {
    if (cartItems.length > 0) {
      var unique_item = true;
      cartItems.map((item) => {
        if (item.id === props.product.id) {
          alert("Product already exists in the cart");
          unique_item = false;
          //eslint-disable-next-line array-callback-return
          return;
        }
        return null;
      });
      unique_item && addToCart(props.product);
    } else {
      addToCart(props.product);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card productcard">
        <Link
          to={"/product/" + props.product.id}
          state={{ productdetails: props.product, admin: props.admin }}
        >
          <img
            src={props.product.image}
            className="card-img-top"
            alt="product"
          />
        </Link>
        <div className="card-body">
          <h5 className="card-text">{props.product.name}</h5>
          <p className="card-text text-success">
            <b>&#8377; {props.product.price}.00</b>
          </p>
        </div>
        <div className="card-footer d-flex flex-wrap justify-content-center">
          <button
            className="btn btn-secondary ms-1 me-1"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary ms-1 me-1"
            onClick={handleAddToWishlist}
          >
            <i className="bi bi-heart-fill" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
