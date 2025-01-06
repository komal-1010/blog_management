import React from "react";
import '../AdminDashboard/AdminDashboard.css';  // Ensure you have the styles in this file
import Sidebar from "../../../components/Sidebar/Sidebar";  // Correct import for Sidebar

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <h1>Admin Dashboard</h1>
        <p>Welcome to your admin dashboard. You can manage all blogs here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
