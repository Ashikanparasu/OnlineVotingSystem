import React from "react";

function Nav() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{
        background: "transparent",
        padding: "1.2rem 3rem", // increased height
      }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <a
          className="navbar-brand d-flex align-items-center"
          href="#"
          style={{ fontSize: "2rem", fontWeight: "700", letterSpacing: "1px" }}
        >
          <img
            src="/vote.png"
            width="65"
            height="65"
            className="d-inline-block align-text-top me-3"
            alt="VoteMate Logo"
            style={{
              filter: "drop-shadow(0 0 10px #ffc107)",
              borderRadius: "12px",
            }}
          />
          <span className="text-warning">VOTE</span>
          <span className="text-white">MATE</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right-side nav links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link text-white fs-5 mx-3"
                href="#home"
                onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white fs-5 mx-3"
                href="#about"
                onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white fs-5 mx-3"
                href="#contact"
                onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
