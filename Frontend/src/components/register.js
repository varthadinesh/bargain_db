import React, { useState } from "react";
import MyNavbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

const Register = () => {
  const [confirmpassword, setConfirmpassword] = useState("");
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.password[0] === confirmpassword) {
      navigate("/emailverification", { state: { values } });
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
      <div className="p-2 ps-lg-5 pe-lg-5 mb-5">
        <div className="col-xs-12 col-md-12 col-lg-12">
          <form method="post" onSubmit={handleSubmit}>
            <div>
              <div>
                <h3 className="text-center">Create Account</h3>
              </div>
              <hr />
              <div className="form-group d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <div className="col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={handleInput}
                    pattern="[A-Z][a-z]*\s*\w*"
                    title="First letter should be uppercase, remaining letters are lowercase. No special characters"
                    required
                  />
                </div>
              </div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <div className="col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={handleInput}
                    pattern="[A-Z][a-z]*\s*\w*"
                    title="First letter should be uppercase, remaining letters are lowercase. No special characters"
                    required
                  />
                </div>
              </div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <div className="col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={handleInput}
                    pattern="[0-9]{10}"
                    title="10 digit numeric value only"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>
                <div className="col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={(e)=>setConfirmpassword(e.currentTarget.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group  d-md-flex justify-content-center">
              <div className="col-sm-2 col-md-2"></div>
              <div className="col-sm-6 col-md-4 col-xs-12 text-center">
                <button
                  type="submit"
                  className="btn btn-primary register-next-step-button w-50"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Register;
