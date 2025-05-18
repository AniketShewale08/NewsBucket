import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onSearchChange }) => {
  const location = useLocation();

  const isGeneral = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          📰 NewsBucket
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {["entertainment", "business", "health", "science", "sports", "technology"].map((category) => (
              <li className="nav-item" key={category}>
                <Link className="nav-link text-capitalize" to={`/${category}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          {isGeneral && (
            <form className="d-flex ms-3" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
