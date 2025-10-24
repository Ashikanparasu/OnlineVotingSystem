// AdminDashboard.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import AddStudentForm from "./components/AddStudentForm";
import VoterList from "./components/VoterList";
import VoteResultChart from "./components/VoteResultChart";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <StatsCards stats={[
          { title: "Total Students", value: 120 },
          { title: "Votes Cast", value: 85 },
          { title: "Pending Votes", value: 35 },
          { title: "Status", value: "Ongoing" },
        ]} />;
      case "add":
        return <AddStudentForm />;
      case "list":
        return <VoterList />;
      case "results":
        return <VoteResultChart />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar onSelect={setPage} />
      <div className="content">{renderPage()}</div>
    </div>
  );
};

export default AdminDashboard;
