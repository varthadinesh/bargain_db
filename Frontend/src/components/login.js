import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { useData } from "./CartContext";

const Login = () => {
  sessionStorage.clear();
  const { setUserData } = useData();
  //eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState({
    username: "",
    password: "",
    selectedlogin: "",
  });
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [AdditionalContentbtn, setAdditionalContentbtn] = useState("+");

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    var url = "";
    if (values.selectedlogin.toString() === "customer") {
      url = "user";
    } else if (values.selectedlogin.toString() === "admin") {
      url = "admin";
    }
    axios
      .post(`http://localhost:8080/${url}`, values)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const data = res.data[0];
          setUserData(data);
          var token ;
          if(url ===  'user'){
            token = data.user_id;
            sessionStorage.setItem("token", "user");
          }else if(url==='admin'){
            token = data.admin_id;
            sessionStorage.setItem("token", "admin");
          }
          if (!token) {
            alert("Unable to login. Please try after some time.");
            return;
          }
          sessionStorage.removeItem("user-token");
          sessionStorage.setItem("user-token", token);
          navigate("/");
        } else {
          alert("Invalid Username or Password");
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleAdditionalContent = () => {
    if (showAdditionalContent) {
      setShowAdditionalContent(false);
      setAdditionalContentbtn("+");
    } else {
      setShowAdditionalContent(true);
      setAdditionalContentbtn("-");
    }
  };
  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
        <div className="d-md-flex justify-content-around m-5">
          <div className="col-md-5">
            <div className="card bg-white shadow mb-3 ">
              <div className="card-body">
                <h4>NEW CUSTOMER</h4>
                <hr />
                <p style={{ color: "#646464" }}>
                  By creating an account on our website, you will be able to
                  shop faster, be up to date on an orders status, and keep track
                  of the orders you have previously made.
                </p>
                <Link to="/register" className="text-decoration-none">
                  <button type="button" className="btn btn-primary">
                    Register
                  </button>
                </Link>
              </div>
            </div>
            <div className="card bg-white shadow mb-3">
              <div className="card-body ">
                <div>
                  <h4>
                    Why do you have to register?{" "}
                    <span
                      className="float-end"
                      onClick={toggleAdditionalContent}
                      style={{ cursor: "pointer" }}
                    >
                      {AdditionalContentbtn}
                    </span>
                  </h4>
                </div>
                {showAdditionalContent && (
                  <div>
                    <hr />
                    Registration as a buyer is mandatory. To track your order
                    and shipment status, or to reach out to you in case of any
                    issues, we prefer you to register and create a buyer's
                    account. The process takes less than a minute and will
                    definitely prove to be beneficial in the long run; just
                    enter a few basic details and you are good to go!
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card bg-white shadow mb-3">
              <div className="card-body">
                <form action="" method="post" onSubmit={handleSubmit}>
                  <div className="d-flex gap-5">
                    <div className="d-flex">
                      <input
                        type="radio"
                        name="selectedlogin"
                        id="customer"
                        value="customer"
                        onChange={handleInput}
                        required
                      />
                      &nbsp;
                      <h6>CUSTOMER</h6>
                    </div>
                    <div className="d-flex">
                      <input
                        type="radio"
                        name="selectedlogin"
                        id="admin"
                        value="admin"
                        onChange={handleInput}
                        required
                      />
                      &nbsp;
                      <h6>ADMIN</h6>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group p-2">
                    <label htmlFor="username">Email</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="User Name / Email"
                      className="form-control"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="form-group p-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      required
                      onChange={handleInput}
                    />
                  </div>
                  <div className="d-flex justify-content-between p-1">
                    <label>
                      <input type="checkbox" id="checkme" name="checkme" />
                      &nbsp;Remember me?
                    </label>
                    <a href="/">Forgot Password?</a>
                  </div>
                  <div>
                    <button
                      type="submit"
                      name="btn-login"
                      className="btn btn-primary "
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
