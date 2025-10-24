import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./home/Homepage";
import StudentLogin from "./home/login/StudentLogin";
import AdminLogin from "./home/login/AdminLogin";
import StudentDashboard from "./home/dashboard/StudentDashboard";
import OTPSuccess from "./succes/OTPSuccess";
import AdminPage from "./home/dashboard/AdminPage";
import AdminDashboard from "./home/dashboard/admin/AdminDashboard"; // ✅ Import the new dashboard
import './index.css';

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Homepage />} />

      {/* Login Pages */}
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* OTP Success and Dashboards */}
      <Route path="/otp-success" element={<OTPSuccess />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      {/* Admin Pages */}
      <Route path="/admin-page" element={<AdminPage />} />        {/* Welcome Page */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Full Dashboard */}
    </Routes>
  );
}

export default App;
