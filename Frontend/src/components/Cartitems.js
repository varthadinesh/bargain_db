import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./navbar";
import Footer from "./footer";

export default function Cartitems() {
  const navigate = useNavigate();
  const { cartItems, calculateTotalPrice, removeFromCart } = useCart();
  const totalPrice = calculateTotalPrice();

  const checkout = () => {
    if (sessionStorage.getItem("token") !== null) {
      navigate("/checkoutpage");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product, index) => (
                <tr key={index}>
                  <td>
                    <button
                      type="button"
                      className="btn-close w-50"
                      onClick={() => removeFromCart(product.id)}
                    ></button>
                  </td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxWidth: "50px", maxHeight: "80px" }}
                    />
                  </td>
                  <td className="text-secondary">{product.name}</td>
                  <td>&#8377; {product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="d-md-flex gap-3 float-end me-2">
            <p className="mt-1"><b>Total Price: &#8377; {totalPrice}</b></p>
            <button
              type="button"
              className="btn btn-primary"
              disabled={cartItems.length === 0} // Disable the button if cart is empty
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
