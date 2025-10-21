import React from "react";

function AdminLogin({ onClose }) {
  return (
    <div
      className="login-box animate__animated animate__fadeInDown"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "2.5rem",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      {/* ❌ Back Button */}
      <div
        style={{
          textAlign: "right",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
        onClick={onClose}
      >
        <i className="bi bi-arrow-left text-light fs-4"></i>
      </div>

      <h3 className="text-light mb-4 text-center">Admin Login</h3>

      <form>
        <div className="mb-3">
          <label className="form-label text-light">Admin ID</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Enter Admin ID"
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Password</label>
          <input
            type="password"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Enter Password"
          />
        </div>

        <button type="submit" className="btn btn-light w-100 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
