import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (email.trim() !== "") {
      setOtpSent(true);
    } else {
      setOtpSent(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP verification logic later
  };

  return (
    <div
      className="login-page d-flex align-items-center justify-content-end"
      style={{
        width: "100%",
        height: "100vh",
        background: "transparent",
        paddingRight: "10%",
      }}
    >
      <div
  className="login-card"
  style={{
    background: "rgba(255, 255, 255, 0.08)", // slightly lighter glass
    backdropFilter: "blur(25px)", // softer blur for glassy look
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "20px",
    boxShadow: "0 0 25px rgba(255, 255, 255, 0.05)",
    padding: "3.5rem 3rem",
    width: "480px",
    color: "#fff",
  }}
>

        <h2
          className="text-center mb-4"
          style={{ color: "#fff", fontWeight: "700" }}
        >
          Student Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input + Send OTP Button */}
          <div
            className="mb-3 position-relative d-flex"
            style={{ alignItems: "center", gap: "10px" }}
          >
            <div style={{ position: "relative", flex: 1 }}>
              <FaEnvelope
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "#ccc",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email ID"
                className="form-control bg-transparent text-white ps-5"
                required
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "10px",
                  height: "45px",
                  color: "#fff",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              style={{
                backgroundColor: "#FFD700",
                border: "none",
                color: "#000",
                fontWeight: "600",
                borderRadius: "10px",
                padding: "10px 15px",
                height: "45px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e6c200")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FFD700")}
            >
              Send OTP
            </button>
          </div>

          {/* OTP Sent Message */}
          {otpSent && (
            <p
              style={{
                color: "#FFD700",
                fontSize: "0.9rem",
                marginTop: "-5px",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              OTP sent to your email
            </p>
          )}

          {/* OTP Input */}
          <div className="mb-4 position-relative">
            <FaKey
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "#ccc",
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
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "10px",
                height: "45px",
                color: "#fff",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "600",
              borderRadius: "10px",
              height: "45px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e6c200")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FFD700")}
          >
            Submit
          </button>
        </form>

        {/* Back to Home */}
        <p
          className="text-center mt-4"
          style={{
            color: "#fff",
            fontSize: "0.9rem",
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

export default StudentLogin;
