import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="display-5 fw-bold text-warning mb-3">
        Hello! Welcome to VoteMate
      </h1>
      <p className="lead text-secondary mb-4">
        Secure, Transparent, and Digital Voting Platform
      </p>

      <div className="d-flex gap-3 justify-content-center flex-wrap">
        <button
          className="btn btn-outline-warning px-4 py-2"
          style={{ borderRadius: "25px", transition: "0.3s" }}
          onClick={() => navigate("/student-login")}
        >
          Student Login
        </button>

        <button
          className="btn btn-outline-light px-4 py-2"
          style={{ borderRadius: "25px", transition: "0.3s" }}
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default Main;
