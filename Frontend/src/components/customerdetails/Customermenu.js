import React from "react";
import { NavLink } from "react-router-dom";

export default function Customermenu() {
  return (
    <div className="border">
      <div className="bg-secondary text-white text-center p-2 fs-4">
        <b>My Account</b>
      </div>
      <div className="customermenu">
        <ul className="list-group">
            <NavLink to='/customerinfo' className="text-decoration-none list-unstyled">
          <li className="p-2">
            <i className="bi bi-caret-right-square-fill"></i> Customer Info
          </li>
          </NavLink>
          <NavLink to='/addresses'  className="text-decoration-none list-unstyled">
          <li className="p-2">
            <i className="bi bi-caret-right-square-fill"></i> Addresses
          </li>
          </NavLink>
          <NavLink to='/orders' className="text-decoration-none list-unstyled" >
          <li className="p-2">
            <i className="bi bi-caret-right-square-fill"></i> Orders
          </li>
          </NavLink>
          <NavLink to='/downloadableproducts' className="text-decoration-none list-unstyled" >
          <li className="p-2">
            <i className="bi bi-caret-right-square-fill"></i> Downloadable
            Products
          </li>
          </NavLink>
          <NavLink to='/changepassword' className="text-decoration-none list-unstyled" >
          <li className="p-2">
            <i className="bi bi-caret-right-square-fill"></i> Change Password
          </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
