import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/blogs">Manage Blogs</Link></li>
        <li><Link to="/admin/blog/create">Create New Blog</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
