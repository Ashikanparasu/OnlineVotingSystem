import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  // ✅ Send OTP to Admin Email (connects to backend)
  const handleSendOtp = async () => {
    try {
      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }

      const response = await axios.post("http://localhost:8080/api/admin/send-otp", { email });

      if (response.status === 200) {
        setOtpSent(true);
        setError("");
      } else {
        setError("Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error sending OTP. Check backend connection.");
    }
  };

  // ✅ Verify OTP (connects to backend)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/admin/verify-otp", {
        email,
        otp,
      });

      if (response.status === 200 && response.data === true) {
        navigate("/admin-page"); // ✅ redirect on success
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error verifying OTP.");
    }
  };

  return (
    <div
      className="login-page d-flex align-items-center justify-content-end"
      style={{
        width: "100%",
        height: "100vh",
        background: "transparent",
        paddingRight: "8%",
      }}
    >
      <div
        className="login-card"
        style={{
          background: "transparent",
          border: "none",
          borderRadius: "0",
          boxShadow: "none",
          padding: "4rem 4rem",
          width: "550px",
          color: "#fff",
        }}
      >
        <h1
          className="text-center mb-4"
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: "2.2rem",
          }}
        >
          Admin Login
        </h1>

        <form onSubmit={handleVerifyOtp}>
          {/* Email + Send OTP */}
          <div
            className="mb-3 position-relative d-flex"
            style={{ alignItems: "center", gap: "12px" }}
          >
            <div style={{ position: "relative", flex: 1 }}>
              <FaEnvelope
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "15px",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  opacity: 0.9,
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Admin Email ID"
                className="form-control bg-transparent text-white ps-5"
                required
                style={{
                  border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: "12px",
                  height: "55px",
                  fontSize: "1rem",
                  color: "#fff",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={otpSent}
              style={{
                backgroundColor: otpSent ? "gray" : "#FFD700",
                border: "none",
                color: "#000",
                fontWeight: "600",
                borderRadius: "10px",
                padding: "10px 20px",
                height: "55px",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {otpSent ? "Sent" : "Send OTP"}
            </button>
          </div>

          {/* OTP Input */}
          {otpSent && (
            <div className="mb-4 position-relative">
              <FaKey
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "15px",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  opacity: 0.9,
                }}
              />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="form-control bg-transparent text-white ps-5"
                required
                style={{
                  border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: "12px",
                  height: "55px",
                  fontSize: "1rem",
                  color: "#fff",
                }}
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <p
              style={{
                color: "#ff6961",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          {otpSent && (
            <button
              type="submit"
              className="btn w-100 mt-3"
              style={{
                backgroundColor: "#FFD700",
                color: "#000",
                fontWeight: "600",
                borderRadius: "12px",
                height: "55px",
                fontSize: "1.1rem",
                transition: "0.3s",
              }}
            >
              Verify OTP
            </button>
          )}
        </form>

        {/* Back to Home */}
        <p
          className="text-center mt-4"
          style={{
            color: "#fff",
            fontSize: "1rem",
          }}
        >
          ←{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#FFD700",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Back to Home
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
