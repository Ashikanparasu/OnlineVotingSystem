import React from "react";

function StudentDashboard() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(120deg, #1c1c1c, #2a2a2a)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "#FFD700", fontSize: "2.5rem", marginBottom: "1rem" }}>
        🎓 Welcome to Student Dashboard
      </h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
        You have successfully logged in using OTP.
      </p>
    </div>
  );
}

export default StudentDashboard;
