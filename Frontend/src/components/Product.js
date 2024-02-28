import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { addToCart, addToWishlist } = useCart();

  return (
    <div className="d-flex justify-content-center">
      <div className="card productcard">
        <Link
          to={"/product/" + props.product.id}
          state={{ productdetails: props.product, type: props.type }}
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
            onClick={() => addToCart(props.product)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary ms-1 me-1"
            onClick={() => addToWishlist(props.product)}
          >
            <i className="bi bi-heart-fill" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
