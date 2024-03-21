import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useData } from "./CartContext";
import axios from "axios";

const MyNavbar = () => {
  const { user } = useData();
  const navigate = useNavigate();
  const {
    cartItems,
    calculateTotalPrice,
    removeFromCart,
    setCartItems,
    // incrementQuantity,
    // decrementQuantity,
    wishItems,
    removeFromWishlist,
    moveFromWishlistToCart,
    selectedWishlistItems,
    handleCheckboxChange,
  } = useCart();
  const totalPrice = calculateTotalPrice();

  // Create refs for dropdown menus
  const womenDropdownRef = useRef(null);
  const kidsDropdownRef = useRef(null);
  const jewelryDropdownRef = useRef(null);
  const booksDropdownRef = useRef(null);

  // Function to handle hover event for dropdowns
  const handleDropdownHover = (ref) => {
    if (ref.current) {
      ref.current.classList.add("show");
    }
  };

  // Function to handle mouse leave event for dropdowns
  const handleDropdownLeave = (ref) => {
    if (ref.current) {
      ref.current.classList.remove("show");
    }
  };
  const handleMoveSelectedToCart = () => {
    moveFromWishlistToCart();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  const handlelogout = () => {
    sessionStorage.removeItem("user-token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    if (sessionStorage.getItem("user-token") === null) {
      setCartItems([]);
      calculateTotalPrice();
    }
  };

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/selleraccount")
      .then((res) => {
        if (res.data !== "Error" && res.data !== "Fail") {
          res.data.map((item) => {
            if (item.email === user.email) {
              return setSellers(item);
            }
            return null;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/addcart")
      .then((response) => {
        if (response.data !== "Fail" && response.data !== "Error") {
          if (sessionStorage.getItem("user-token") !== null) {
            sessionStorage.getItem("token") === "user" &&
              setCartItems(
                response.data.filter(
                  (item) =>
                    item.userid.toString() ===
                      sessionStorage.getItem("user-token") &&
                    item.payment_status === null
                )
              );
          } else {
            setCartItems(response.data.filter((item) => item.userid === null));
          }
        } else {
          console.log("No Items in the cart");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkout = () => {
    if (sessionStorage.getItem("token") !== null) {
      navigate("/checkoutpage");
    } else {
      navigate("/login");
    }
  };

  console.log(cartItems);

  return (
    <div className="gradientnav">
      <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top d-md-flex justify-content-between">
        <div className="ms-5">
          <Link to="/">
            <img
              src="https://bargain-boutique.com/wp-content/uploads/2023/03/Bargain-Boutique-Logo-1.png"
              alt="logo"
              height="50px"
              width="120px"
            />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse d-md-flex ps-2 pe-2 mt-2"
          id="navbarTogglerDemo03"
        >
          <ul className="list-unstyled d-flex gap-md-3">
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownHover(womenDropdownRef)}
              onMouseLeave={() => handleDropdownLeave(womenDropdownRef)}
            >
              <Link
                className="nav-link ps-3 pe-3"
                to="/women"
                id="navbarDropdownWomen"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                WOMENS
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownWomen"
                ref={womenDropdownRef}
              >
                <Link className="dropdown-item" to="/highendcouture">
                  High end Couture
                </Link>
                <Link className="dropdown-item" to="/sarees">
                  Sarees
                </Link>
                <Link className="dropdown-item" to="/lehenga">
                  Lehenga
                </Link>
                <Link className="dropdown-item" to="/dresses">
                  Dresses
                </Link>
                <Link className="dropdown-item" to="/twinningoutfits">
                  Twinning Outfits
                </Link>
              </div>
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownHover(kidsDropdownRef)}
              onMouseLeave={() => handleDropdownLeave(kidsDropdownRef)}
            >
              <Link
                className="nav-link ps-3 pe-3"
                to="/kids"
                id="navbarDropdownKids"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                KIDS
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownKids"
                ref={kidsDropdownRef}
              >
                <Link className="dropdown-item" to="/girl">
                  Girl
                </Link>
                <Link className="dropdown-item" to="/boy">
                  Boy
                </Link>
              </div>
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownHover(jewelryDropdownRef)}
              onMouseLeave={() => handleDropdownLeave(jewelryDropdownRef)}
            >
              <Link
                className="nav-link ps-3 pe-3"
                to="/jewelry"
                id="navbarDropdownKids"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                JEWELLERY
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownKids"
                ref={jewelryDropdownRef}
              >
                <Link className="dropdown-item" to="/jewelrycollection">
                  Collection
                </Link>
              </div>
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownHover(booksDropdownRef)}
              onMouseLeave={() => handleDropdownLeave(booksDropdownRef)}
            >
              <Link
                className="nav-link ps-3 pe-3"
                to="/books"
                id="navbarDropdownKids"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                BOOKS
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownKids"
                ref={booksDropdownRef}
              >
                <Link className="dropdown-item" to="/bookscollection">
                  Book Collections
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="d-md-flex">
          <div className="d-md-flex ps-2 pe-2">
            {/* <div className="m-2">
              <input
                className="form-control mr-sm-2 mt-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div> */}
            <div className="">
              {/* <button
                className="btn cartBtn"
                data-bs-toggle="modal"
                data-bs-target="#myModal2"
              >
                {" "}
                <i className="bi bi-heart-fill fs-4 position-relative">
                {wishItems.length > 0 && (
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
      {wishItems.length}
      <span className="visually-hidden">unread messages</span>
    </span>
  )}
                 </i>
              </button> */}
              <button
                className="btn cartBtn "
                // data-bs-toggle="modal"
                // data-bs-target="#myModal1"
              >
                {" "}
                <Link
                  to="/cartitems"
                  className="text-decoration-none text-dark"
                >
                  <i className="bi bi-cart3 fs-4 position-relative">
                    {cartItems.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {cartItems.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </i>
                </Link>
              </button>
            </div>
          </div>
          <div className="d-md-flex ps-2 pe-2 mt-2">
            {isLoggedIn ? (
              <div className="button-group ">
                <button
                  type="button"
                  className="btn btn-secondary me-2 rounded-circle d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="text-white">
                    <i className="bi bi-person-fill fs-6"></i>
                  </span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end p-1">
                  <li className="p-1">
                    <button className="dropdown-item" type="button">
                      Hello, {user.firstname}
                    </button>
                  </li>

                  {user.email === "admin@admin" ? (
                    <li className="p-1">
                      <Link
                        to="/acceptproduct"
                        className="text-decoration-none text-dark ps-3"
                      >
                        <i className="bi bi-file-earmark-person-fill"></i>{" "}
                        Accept Product
                      </Link>
                    </li>
                  ) : null}
                  {sellers.length !== 0 ? (
                    <li className="p-1">
                      <Link
                        to="/sellerproducts"
                        className="text-decoration-none text-dark ps-3"
                      >
                        <i className="bi bi-file-earmark-person-fill"></i>{" "}
                        Administration
                      </Link>
                    </li>
                  ) : null}
                  <li className="p-1">
                    <button
                      className="btn cartBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal2"
                    >
                      {" "}
                      <i className="bi bi-heart-fill fs-6 position-relative">
                        {" "}
                        My wishlist
                        {wishItems.length > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            {wishItems.length}
                            <span className="visually-hidden">
                              unread messages
                            </span>
                          </span>
                        )}
                      </i>
                    </button>
                  </li>
                  <li className="p-1">
                    <Link
                      to="/customerinfo"
                      className="text-decoration-none text-dark ps-3"
                    >
                      <i className="bi bi-person-fill-gear"></i> My Account
                    </Link>
                  </li>
                  <li className="p-1">
                    <Link
                      to="/login"
                      className="text-decoration-none text-dark ps-3"
                      onClick={handlelogout}
                    >
                      <i className="bi bi-box-arrow-right"></i> Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="mt-1">
                <Link to="/login" className="text-decoration-none text-dark">
                  LOGIN
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* cartmodal */}
      <div className="modal" id="myModal1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body" id="showmod"></div>

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

                    {/* <td>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => decrementQuantity(index)}
                      >
                        -
                      </button>
                      <span className="mx-2">{product.quantity}</span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => incrementQuantity(index)}
                      >
                        +
                      </button>
                    </td> */}
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-footer d-md-flex justify-content-between">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <div className="d-md-flex gap-1">
                <p className="mt-1">Total Price: {totalPrice}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  disabled={cartItems.length === 0} // Disable the button if cart is empty
                  onClick={checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* wishmodal */}
      <div className="modal" id="myModal2">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body" id="showmod"></div>

            <table className="table table-hover ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Action</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {wishItems.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        type="button"
                        className="btn-close w-50"
                        onClick={() => removeFromWishlist(product.id)}
                      ></button>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedWishlistItems.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                    </td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ maxWidth: "50px", maxHeight: "80px" }}
                      />
                    </td>
                    <td className="text-secondary">{product.name}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleMoveSelectedToCart}
                disabled={selectedWishlistItems.length === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
