import React from "react";
import { useNavigate } from "react-router-dom";

function OTPSuccess() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        flexDirection: "column",
        background: "transparent",
        color: "#fff",
      }}
    >
      <h1 style={{ color: "#FFD700", fontWeight: "700" }}>
        ✅ OTP Verified Successfully!
      </h1>
      <p>You can now proceed to your dashboard.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#FFD700",
          color: "#000",
          border: "none",
          fontWeight: "600",
          borderRadius: "10px",
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default OTPSuccess;
