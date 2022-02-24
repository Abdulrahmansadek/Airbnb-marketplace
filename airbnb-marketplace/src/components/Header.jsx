import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="header">
      <div className="navbar container">
        <img
          className="header-icon"
          src="https://freepikpsd.com/file/2019/10/airbnb-logo-white-png-4-Transparent-Images.png"
          alt="air-bnb"
        />

        <div className="nav">
          <ul>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/offers");
              }}
            >
              Offers
            </li>
            <li
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </li>
          </ul>
        </div>
        <div
          className="profile"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default Header;
