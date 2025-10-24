// Sidebar.jsx
import React from "react";
import { FaUsers, FaChartBar, FaPlus, FaCogs, FaHome } from "react-icons/fa";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li onClick={() => onSelect("dashboard")}><FaHome /> Dashboard</li>
        <li onClick={() => onSelect("add")}><FaPlus /> Add Student</li>
        <li onClick={() => onSelect("list")}><FaUsers /> Voter List</li>
        <li onClick={() => onSelect("results")}><FaChartBar /> Results</li>
        <li onClick={() => onSelect("settings")}><FaCogs /> Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
