import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./navbar";
import { useCart } from "./CartContext";
import axios from "axios";

const Checkout = () => {
  const { user, cartItems, calculateTotalPrice } = useCart();
  const [skipShippingAddress, setSkipShippingAddress] = useState(false);
  const totalPrice = calculateTotalPrice();

  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    country: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    pincode: "",
    phone: user.phone,
  });
  const [newFields, setNewFields] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    country: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    pincode: "",
    phone: user.phone,
  });
  const [selectedOption, setSelectedOption] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setNewFields({ ...newFields, [name]: value });
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleContinue = () => {
    if (step === 1 && skipShippingAddress) {
      if (validateBillingAddress()) {
        setStep(step + 2);
      }
    } else {
      if (step === 1) {
        if (validateBillingAddress()) {
          setStep(step + 1);
        }
      } else if (step === 2) {
        if (selectedOption === "new" && !validateShippingAddress()) {
          return;
        } else if (selectedOption !== "new" && selectedOption !== "same") {
          return;
        }
        setStep(step + 1);
      } else if (step === 3) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step === 3 && skipShippingAddress) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };
  const validateBillingAddress = () => {
    return (
      fields.country.trim() !== "" &&
      fields.state.trim() !== "" &&
      fields.city.trim() !== "" &&
      fields.address1.trim() !== "" &&
      fields.pincode.trim() !== ""
    );
  };
  const validateShippingAddress = () => {
    // If the selected option is "new", validate the new fields
    if (selectedOption === "new") {
      if (
        !newFields.country ||
        !newFields.state ||
        !newFields.city ||
        !newFields.address1 ||
        !newFields.address2 ||
        !newFields.pincode
      ) {
        return false;
      }
    }

    return true;
  };

  const handleSkipShippingChange = (e) => {
    setSkipShippingAddress(e.target.checked);
  };

  const createPayment = async () => {
    try {
        let shippingAddressData = {};
        let billingAddressData = {};

        // Check if the checkbox for same shipping and billing address is checked
        if (skipShippingAddress) {
            // If checkbox is checked, use the same data for both shipping and billing addresses
            shippingAddressData = fields;
            billingAddressData = fields;
        } else {
            // If checkbox is not checked, proceed with the selectedOption logic
            if (selectedOption === "same") {
                shippingAddressData = fields;
                billingAddressData = fields;
            } else {
                if (selectedOption === "new") {
                    shippingAddressData = newFields;
                } else {
                    shippingAddressData = fields;
                }
                billingAddressData = newFields;
            }
        }

        // Send shipping address to backend
        await axios.post("http://localhost:8080/saveShippingAddress", {
            shippingAddress: shippingAddressData,
        });

        // Send billing address to backend
        await axios.post("http://localhost:8080/saveBillingAddress", {
            billingAddress: billingAddressData,
        });

        // After saving addresses, redirect to payment page
        const response = await axios.post("http://localhost:8080/createPayment", {
            cartItems,
        });
        window.location.href = response.data.redirectUrl;
    } catch (error) {
        console.error("Error creating payment:", error.response ? error.response.data : error.message);
        // Handle error appropriately (e.g., show an error message to the user)
    }
};

  return (
    <>
      <MyNavbar />
      <div className="container mt-5">
        <form>
          <div
            className="mb-3"
            style={{
              backgroundColor: step === 1 ? "#f0f0f0" : "#708090",
              padding: "10px",
            }}
          >
            <h5
              style={{
                color: step === 1 ? "black" : "white",
              }}
            >
              Billing Address
            </h5>
            {step === 1 && (
              <>
                <div className="mb-3">
                  <input
                    type="checkbox"
                    checked={skipShippingAddress}
                    onChange={handleSkipShippingChange}
                    className="me-1"
                  />
                  <label>
                    <strong>Ship to the same Address</strong>
                  </label>
                </div>
                <div className="row g-2">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Firstname"
                      name="firstname"
                      value={fields.firstname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Lastname"
                      name="lastname"
                      value={fields.lastname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={fields.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Country"
                      name="country"
                      value={fields.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      name="state"
                      value={fields.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      name="city"
                      value={fields.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Adress1"
                      name="address1"
                      value={fields.address1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Adress2"
                      name="address2"
                      value={fields.address2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pincode"
                      name="pincode"
                      value={fields.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      name="phone"
                      value={fields.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleContinue}
                >
                  {" "}
                  <i class="bi bi-arrow-right-square me-1 me-1"></i>
                  Continue
                </button>
              </>
            )}
          </div>
          <div
            className="mb-3"
            style={{
              backgroundColor:
                step === 2 && !skipShippingAddress ? "#f0f0f0" : "#708090",
              padding: "10px",
            }}
          >
            <h5
              style={{
                color: step === 2 ? "black" : "white",
              }}
            >
              Shipping Address
            </h5>
            {step === 2 && !skipShippingAddress && (
              <>
                <div className="mb-3">
                  <label className="form-label">Select Address Option:</label>
                  <select
                    className="form-select"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    required
                  >
                    <option value="">Select Address Option</option>
                    <option value="new">Add New Address</option>
                    <option value="same">Use Same as Billing Address</option>
                  </select>
                </div>

                {selectedOption === "new" && (
                  <>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Firstname"
                          name="firstname"
                          value={newFields.firstname}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Lastname"
                          name="lastname"
                          value={newFields.lastname}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control mb-2"
                          placeholder="Email"
                          name="email"
                          value={newFields.email}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Country"
                          name="country"
                          value={newFields.country}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="State"
                          name="state"
                          value={newFields.state}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="City"
                          name="city"
                          value={newFields.city}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Adress1"
                          name="address1"
                          value={newFields.address1}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Adress2"
                          name="address2"
                          value={newFields.address2}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Pincode"
                          name="pincode"
                          value={newFields.pincode}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Phone"
                          name="phone"
                          value={newFields.phone}
                          onChange={handleInputChange1}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === "same" && (
                  <p>Shipping details will be the same as billing address.</p>
                )}
                <div className="col-12 d-flex justify-content-between p-5">
                  <button className="btn btn-secondary" onClick={handleBack}>
                    <i class="bi bi-arrow-left-square"></i> Back
                  </button>
                  <button
                    className="btn btn-primary me-2"
                    onClick={handleContinue}
                  >
                    <i class="bi bi-arrow-right-square me-1"></i>Continue
                  </button>
                </div>
              </>
            )}
          </div>

          <div
            className="mb-3"
            style={{
              backgroundColor: step === 3 ? "#f0f0f0" : "#708090",
              padding: "10px",
            }}
          >
            <h5
              style={{
                color: step === 3 ? "black" : "white",
              }}
            >
              Payment Information
            </h5>
            {step === 3 && (
              <>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ maxWidth: "60px", maxHeight: "100px" }}
                          />
                        </td>
                        <td className="text-secondary">{product.name}</td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="col-md-4 bg-white shadow float-md-end">
                  <div className="p-3 ">
                    <p className="mb-0 d-flex justify-content-between">
                      Sub-Total: <span>&#8377;{totalPrice}.00</span>
                    </p>
                    <hr />
                    <p className="mb-0 fw-bold d-flex justify-content-between">
                      Total Price:{" "}
                      <span className="fw-light">&#8377;{totalPrice}.00</span>
                    </p>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-between p-5">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={handleBack}
                  >
                    <i className="bi bi-arrow-left-square"></i> Back
                  </button>
                  <button className="btn btn-primary" onClick={handleContinue}>
                    <i className="bi bi-arrow-right-square me-1"></i> Continue
                  </button>
                </div>
              </>
            )}
          </div>

          <div
            className="mb-3"
            style={{
              backgroundColor: step === 4 ? "#f0f0f0" : "#708090",
              padding: "10px",
            }}
          >
            <h5
              style={{
                color: step === 4 ? "black" : "white",
              }}
            >
              Confirm Order
            </h5>
            {step === 4 && (
              <>
                <div className="d-flex m-2" style={{ gap: "100px" }}>
                  <div style={{ padding: "10px" }}>
                    <h2>Billing Details:</h2>
                    <div>
                      <p>
                        {fields.firstname} {fields.lastname}
                      </p>
                      <p>Email: {fields.email}</p>
                      <p>phone: {fields.phone}</p>
                      <p>
                        {fields.address1} {fields.address2}
                      </p>
                      <p>
                        {fields.city},{fields.state},{fields.pincode}
                      </p>
                      <p>{fields.country}</p>
                    </div>
                  </div>

                  <div style={{ padding: "10px" }}>
                    <h2>Shipping Details:</h2>
                    {skipShippingAddress ? (
                      <>
                        <p>
                          {fields.firstname} {fields.lastname}
                        </p>
                        <p>Email: {fields.email}</p>
                        <p>Phone: {fields.phone}</p>
                        <p>
                          {fields.address1} {fields.address2}
                        </p>
                        <p>
                          {fields.city},{fields.state},{fields.pincode}
                        </p>
                        <p>{fields.country}</p>
                      </>
                    ) : (
                      <>
                        <p>
                          {selectedOption === "new"
                            ? newFields.firstname
                            : fields.firstname}{" "}
                          {selectedOption === "new"
                            ? newFields.lastname
                            : fields.lastname}
                        </p>
                        <p>
                          Email:{" "}
                          {selectedOption === "new"
                            ? newFields.email
                            : fields.email}{" "}
                        </p>
                        <p>
                          {" "}
                          Phone:{" "}
                          {selectedOption === "new"
                            ? newFields.phone
                            : fields.phone}
                        </p>
                        <p>
                          {selectedOption === "new"
                            ? newFields.address1
                            : fields.address1}{" "}
                          {selectedOption === "new"
                            ? newFields.address2
                            : fields.address2}
                        </p>
                        <p>
                          {" "}
                          {selectedOption === "new"
                            ? newFields.city
                            : fields.city}{" "}
                          ,
                          {selectedOption === "new"
                            ? newFields.state
                            : fields.state}{" "}
                          ,
                          {selectedOption === "new"
                            ? newFields.pincode
                            : fields.pincode}
                        </p>
                        <p>
                          {selectedOption === "new"
                            ? newFields.country
                            : fields.country}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ maxWidth: "60px", maxHeight: "100px" }}
                          />
                        </td>
                        <td className="text-secondary">{product.name}</td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="col-md-4 bg-white shadow float-md-end">
                  <div className="p-3 ">
                    <p className="mb-0 d-flex justify-content-between">
                      Sub-Total: <span>&#8377;{totalPrice}.00</span>
                    </p>
                    <hr />
                    <p className="mb-0 fw-bold d-flex justify-content-between">
                      Total Price:{" "}
                      <span className="fw-light">&#8377;{totalPrice}.00</span>
                    </p>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-between p-5">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={handleBack}
                  >
                    <i className="bi bi-arrow-left-square"></i> Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createPayment}
                  >
                    <i class="bi bi-bag-check-fill me-1"></i>Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
