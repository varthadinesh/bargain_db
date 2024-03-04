import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import MyNavbar from "./navbar";
import Footer from "./footer";
import axios from "axios";

export default function Productdetails(props) {
  const { id } = useParams();
  const location = useLocation();
  const { productdetails, admin} = location.state;

  console.log(admin);

  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState({
    accepted_by_admin: "true",
    id: id
  });

  const handleProductlist = () => {
    // console.log(productdetails.accepted_by_admin)
    axios.post("http://localhost:8080/adminaccepted",values)
    .then((res) => {console.log(res)})
    .catch((err) => {console.log(err)});
  }

  return (
    <div className="fullscreen">
      {/* <h1>Product Details for ID: {id}</h1> */}
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
            {admin === "admin" ? (
              <>
                <div className="d-flex">
                  <b> QTY </b>: &nbsp;
                  <select className="form-select" style={{ width: "60px" }}>
                    <option value={1}>1</option>
                  </select>
                  <button type="submit" className="btn btn-secondary ms-3">
                    ADD TO CART
                  </button>
                </div>
                <button
                  type="button"
                  className="btn  btn-outline-secondary mt-3 mb-3"
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
