import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark ">
    <Link className="navbar-brand fnt" to="/"> 
    {" "} Eat Clean Bud! {" "}
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"

    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Recipes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/saved">
            Your Saved Recipes
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
