import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import MyNavbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { useCart } from "./CartContext";

export default function Productdetails() {
  const { id } = useParams();
  const location = useLocation();
  const { productdetails, admin } = location.state;
  productdetails.userid = sessionStorage.getItem("user-token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (sessionStorage.getItem("token") !== "admin") {
      sessionStorage.getItem("user-token") !== null && setIsLoggedIn(true);
    }
  },[])

  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState({
    accepted_by_admin: "true",
    id: id,
  });

  const handleProductlist = () => {
    axios
      .post("http://localhost:8080/adminaccepted", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Product added to the store successfully");
    window.location.href = "/bargain_db/";
  };

  const { addToCart, addToWishlist, cartItems } = useCart();

  const handleAddToCart = () => {
    if (cartItems.length > 0) {
      var unique_item = true;
      cartItems.map((item) => {
        if (item.id === productdetails.id) {
          alert("Product already exists in the cart");
          unique_item = false;
          //eslint-disable-next-line array-callback-return
          return;
        }
        return null;
      });
      unique_item && addToCart(productdetails);
    } else {
      addToCart(productdetails);
    }
  };

  
  const handleAddToWishlist = () => {
    if (isLoggedIn) {
      addToWishlist(productdetails);
    } else {
      navigate("/login");
    }
  };


  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
        <nav className="p-2 ps-lg-5 pe-lg-5">
          <Link to="/" className="text-decoration-none text-dark">
            <i className="bi bi-house-fill"></i>
          </Link>
          &nbsp; /{" "}
          <Link
            to={"/" + productdetails.product_type}
            className="text-decoration-none text-dark"
          >
            {productdetails.product_type}
          </Link>
          /{" "}
          <Link
            to={"/" + productdetails.category}
            className="text-decoration-none text-dark"
          >
            {productdetails.category}
          </Link>{" "}
          / {productdetails.name}
        </nav>
        <div className="p-2 ps-lg-5 pe-lg-5 d-lg-flex">
          <div className="p-2 ps-lg-4 pe-lg-4 d-flex justify-content-center">
            <img
              src={productdetails.image}
              alt="product"
              className="productdetailsimg"
            ></img>
          </div>
          <div className="ps-md-3 p-2">
            <h2 className="text-secondary">{productdetails.name}</h2>
            <p>{productdetails.description}</p>
            <br />
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Location</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {productdetails.location}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Color</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {productdetails.color}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Can it be altered</b>
              </p>
              <p className=" col-md-8 col-lg-10">
                : {productdetails.alteration}
              </p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Size</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {productdetails.size}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Size (Measurements)</b>
              </p>
              <p className=" col-md-8 col-lg-10">
                : {productdetails.measurements}
              </p>
            </div>

            {productdetails.material !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Material</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.material}
                </p>
              </div>
            )}
            {productdetails.occasion !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Occasion</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.occasion}
                </p>
              </div>
            )}
            {productdetails.type !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>type</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.type}</p>
              </div>
            )}
            {productdetails.brand !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Brand</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.brand}</p>
              </div>
            )}
            {productdetails.product_condition !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Product_Condition</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.product_condition}
                </p>
              </div>
            )}
            {productdetails.style !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Style</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.style}</p>
              </div>
            )}
            {productdetails.season !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Season</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.season}</p>
              </div>
            )}
            {productdetails.fit !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Fit</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.fit}</p>
              </div>
            )}
            {productdetails.length !== null && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Length</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.length}</p>
              </div>
            )}
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Times Worn</b>
              </p>
              <p className=" col-md-8  col-lg-10">: {productdetails.worn}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Product ID</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {id}</p>
            </div>

            <p className="text-success fs-4">
              <b>&#8377;{productdetails.price}.00</b>
            </p>
            {admin !== "admin" ? (
              <>
                <div className="d-flex">
                  <b> QTY </b>: &nbsp;
                  <select className="form-select" style={{ width: "60px" }}>
                    <option value={1}>1</option>
                  </select>
                  <button
                    type="submit"
                    className="btn btn-secondary ms-3"
                    onClick={handleAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
                <button
                  type="button"
                  className="btn  btn-outline-secondary mt-3 mb-3"
            onClick={handleAddToWishlist}

                >
                  <i className="bi bi-heart-fill" /> ADD TO WISHLIST
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleProductlist}
                className="btn  btn-outline-secondary mt-3 mb-3"
              >
                ADD TO PRODUCT LIST
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
