import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/pngegg.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="header">
      <div className="navbar container">
        <img className="header-icon" src={logo} alt="air-bnb" />

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
            navigate("/sign-in");
          }}
        >
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default Header;
