import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/pngegg.png";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header ">
      <div className="navbar container container mx-auto">
        <Link to={"/"}>
          <img className="header-icon" src={logo} alt="air-bnb" />
        </Link>

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
