import React from "react";
import MyNavbar from "./navbar";
import Menu from "./menu";
import { Link } from "react-router-dom";
import Footer from "./footer";

export default function Contactus() {
  return (
    <div>
      <MyNavbar />
      <img
        src="https://ges.co.il/wp-content/uploads/2016/02/Contact-us-banner.jpg"
        alt="aboutus"
        width="100%"
        height="300px"
      ></img>
      <div className="d-lg-flex justify-content-around p-2 ps-lg-5 pe-lg-5">
        <div className="col-lg-3 col-xs-12 col-md-12">
          <Menu />
        </div>

        <div className="col-xs-12 col-md-12 col-lg-9 ps-3">
          <h4>Contact Us</h4>
          <section>
            <p>
              Thank you for visiting Closet Bargain. For any questions,
              feedback, and/or grievances please email us at &nbsp;
              <Link
                to="mailto:bargain@gmail.com"
                className="text-decoration-none"
              >
                bargain@gmail.com
              </Link>{" "}
              with the necessary information.
            </p>
            <p>
              We aim to respond within 24 hours and get back to you with the
              best possible answers and solutions for your queries. To find
              answers at the quickest rate, you can also check our Frequently
              Asked Questions page.
              <br />- Team Bargain
            </p>
          </section>
          <form className="m-3">
            <div className="d-md-flex col-md-8 col-xs-12 mt-3 mb-3">
              <label htmlFor="name" className="col-md-2">
                <b>Your Name</b>
              </label>
              <div className="d-flex col-md-8">
              <input
                type="text"
                className="col-md-5 form-control"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                required
              ></input>&nbsp;<span className="text-danger fs-4">*</span>
              </div>
            </div>
            <div className="d-md-flex col-md-8 col-xs-12 mt-3 mb-3">
              <label htmlFor="email" className="col-md-2">
                <b>Your Email</b>
              </label>
              <div className="d-flex col-md-8">
              <input
                type="email"
                className="form-control col-md-5"
                id="email"
                name="email"
                placeholder="Enter Your Email Address"
              ></input>&nbsp;<span className="text-danger fs-4">*</span>
              </div>
            </div>
            <div className="d-md-flex col-md-8 col-xs-12 mt-3 mb-3">
              <label htmlFor="enquiry" className="col-md-2">
                <b>Enquiry</b>
              </label>
              <div className="d-flex col-md-8">
              <textarea
                id="enquiry"
                className="col-md-5 form-control"
                name="enquiry"
                rows="5"
                cols="40"
                placeholder="Enter Your Enquiry"
              ></textarea>&nbsp;<span className="text-danger fs-4">*</span>
              </div>
            </div>
            <div className="d-md-flex col-md-8 col-xs-12 mt-3 mb-3">
              <div className="col-md-2"></div>
              <button type="submit" className="btn btn-primary col-md-3">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
