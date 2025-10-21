import React from "react";

function Footer() {
  return (
    <footer
      className="text-white pt-5"
      style={{
        backgroundColor: "#121212",
        width: "100%",
      }}
    >
      <div className="container pb-4">
        <div className="row">
          {/* About VoteMate */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase fw-bold mb-3 text-warning">VoteMate</h5>
            <p className="text-secondary">
              VoteMate is a secure and user-friendly online voting platform
              built to make elections faster, transparent, and accessible for
              everyone. Your vote matters — make it count digitally.
            </p>
            <a href="#readmore" className="text-warning text-decoration-none">
              Learn more →
            </a>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3 text-warning">Quick Links</h6>
            <ul className="list-unstyled text-secondary">
              <li>
                <a href="#home" className="text-secondary text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-secondary text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#howitworks" className="text-secondary text-decoration-none">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact" className="text-secondary text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3 text-warning">Our Features</h6>
            <ul className="list-unstyled text-secondary">
              <li>✔️ End-to-End Encryption</li>
              <li>✔️ Voter Authentication</li>
              <li>✔️ Real-Time Results</li>
              <li>✔️ Admin Control Panel</li>
            </ul>
          </div>

          {/* Subscribe + Social */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3 text-warning">Stay Updated</h6>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter your email"
              />
              <button className="btn btn-warning" type="button">
                Subscribe
              </button>
            </div>

            <h6 className="text-uppercase fw-bold mb-2 text-warning">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="text-center py-3"
        style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #333" }}
      >
        <small className="text-secondary">
          © 2025 <span className="text-warning">VoteMate</span>. All rights reserved. |
          Developed by <span className="text-white">Ashik</span>.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
