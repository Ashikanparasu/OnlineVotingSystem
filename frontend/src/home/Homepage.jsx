import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav.jsx";
import Main from "./Main.jsx";
import StudentLogin from "./login/StudentLogin.jsx";
import AdminLogin from "./login/AdminLogin.jsx";
import Footer from "./Footer.jsx";
import '../index.css';


function Homepage() {
  return (
    <div style={{ width: "100%", color: "#fff" }}>
      {/* ✅ Animated Background Image Section */}
      <section
        className="animated-background"
        style={{
          width: "100%",
          height: "100vh", // full-screen background area
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Nav />

        <main
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            minHeight: "70vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </main>
      </section>

      {/* ✅ Footer starts after image */}
      <Footer />
    </div>
  );
}

export default Homepage;
