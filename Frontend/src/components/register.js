import React, { useState,useEffect } from "react";
import MyNavbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import axios from "axios";

const Register = () => {
  const [confirmpassword, setConfirmpassword] = useState("");
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [userdetails,setUserDetails]= useState([])
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/user`)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const userDetails = res.data.map(item => ({
            email: item.email,
            phone: item.phone
          }));
          setUserDetails(userDetails)
        }
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, phone, password } = values;
   
     if (userdetails.some(user => user.email === email)) {
      setError('Email already exists');
    } else if (userdetails.some(user => user.phone.toString() === phone)) {
      setError('Phone number already exists');
    } else if (password !== confirmpassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      navigate("/emailverification", { state: { values } });
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
                <h1 className="text-center fs-3">Create Account</h1>
              </div>
              <hr />
              <div className="form-group d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <div className="d-flex col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={handleInput}
                    placeholder="Enter First Name"
                    pattern="[A-Z][a-z]*\s*\w*"
                    title="First letter should be uppercase, remaining letters are lowercase. No special characters"
                    required
                  />
                   <span className="text-danger fs-4"> &nbsp;*</span>
                </div>
              </div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <div className="d-flex col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={handleInput}
                    placeholder="Enter Last Name"
                    pattern="[A-Z][a-z]*\s*\w*"
                    title="First letter should be uppercase, remaining letters are lowercase. No special characters"
                    required
                  />
                   <span className="text-danger fs-4"> &nbsp;*</span>
                </div>
              </div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="d-flex col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleInput}
                    placeholder="Enter Email"
                    required
                  />
                   <span className="text-danger fs-4"> &nbsp;*</span>
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
                <div className="d-flex col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="tel"
                    id="phone"
                    name="phone"
                    minLength={10}
                    maxLength={10}
                    onChange={handleInput}
                    placeholder="Enter Phone Number"
                    pattern="[0-9]{10}"
                    title="10 digit numeric value only"
                    required
                  />
                   <span className="text-danger fs-4"> &nbsp;*</span>
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
                <div className="d-flex col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="Enter Password"
                    required
                  />
                   <span className="text-danger fs-4"> &nbsp;*</span>
                </div>
              </div>
              <div className="form-group  d-md-flex justify-content-center">
                <label
                  className="control-label col-sm-2 col-md-2"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>
                <div className="d-flex col-sm-6 col-md-4 col-xs-12">
                  <input
                    className="form-control mb-2"
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={(e)=>setConfirmpassword(e.currentTarget.value)}
                    placeholder="Enter Confirm Password"
                    required
                  />
                   <span className="text-danger fs-4"> &nbsp;*</span>
                </div>
              </div>
            </div>
            {/* Error message */}
            {error && (
                <div className="text-danger text-center mb-3">{error}</div>
              )}
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
