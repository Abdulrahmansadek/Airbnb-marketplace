import React from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
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
            <NavLink to="/" activeclassname="active">
              <li>Home</li>
            </NavLink>

            <NavLink to="/offers">
              <li>Offers</li>
            </NavLink>
            <NavLink to="/about">
              <li>About</li>
            </NavLink>
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
