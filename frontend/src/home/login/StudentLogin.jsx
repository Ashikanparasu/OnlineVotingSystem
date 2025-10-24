import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import "../../index.css"; // Make sure this includes your .animated-bg CSS

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // Send OTP
  const handleSendOtp = async () => {
    if (email.trim() === "") return alert("Enter your email");

    try {
      const res = await fetch("http://localhost:8080/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      if (json.ok) {
        setOtpSent(true);
        console.log("✅ OTP (Dev Mode):", json.data.devOtp);
      } else alert(json.message || "Failed to send OTP");
    } catch (err) {
      console.error(err);
    }
  };

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const json = await res.json();

      if (json.ok) {
        navigate("/student-dashboard");
      } else alert("Invalid OTP");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* ✅ Animated Background */}
      <div className="animated-bg"></div>

      <div
        className="d-flex align-items-center justify-content-end"
        style={{
          width: "100%",
          height: "100%",
          paddingRight: "8%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="login-card"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "none",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            padding: "3rem 4rem",
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
            Student Login
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Email + OTP */}
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
                  placeholder="Enter your Email ID"
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
                style={{
                  backgroundColor: "#FFD700",
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
                Send OTP
              </button>
            </div>

            {otpSent && (
              <>
                <p
                  style={{
                    color: "#FFD700",
                    fontSize: "1rem",
                    marginBottom: "20px",
                    textAlign: "left",
                  }}
                >
                  OTP sent to your email (check console for now 😉)
                </p>

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
                  }}
                >
                  Submit
                </button>
              </>
            )}
          </form>

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
    </div>
  );
}

export default StudentLogin;
