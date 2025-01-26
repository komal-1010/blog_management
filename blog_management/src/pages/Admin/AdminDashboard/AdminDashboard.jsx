import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/Header/Header.jsx";
import Sidebar from "../../../components/Sidebar/Sidebar.jsx";
import Dashboard from "../../../components/Dashboard/Dashboard.jsx";
import BlogEditor from '../../User/BlogEditor/BlogEditor.jsx';
import BlogList from '../BlogList/BlogList.jsx';
import axios from 'axios';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const role = user ? user.role : "user";

    if (role === 'user') {
      // If the role is 'user', navigate to the blogs page
      navigate('/blogs');
      return; // Stop the rest of the function from running
    }

    fetchBlogs(); // Fetch blogs if role is not 'user'
  }, [navigate]);

  const fetchBlogs = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const role = user ? user.role : "user";
    console.log("role", role);
    try {
      const baseUrl = "http://localhost:8000/api";
      const response = await fetch(`${baseUrl}/read/`, {
        method: "GET",
        headers: {
          "X-User-Role": role,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleSaveBlog = async (blog) => {
    try {
      const response = await axios.post('http://localhost:8000/api/create/', blog);
      console.log('Blog saved successfully:', response.data);
      navigate('/admin-dashboard');
      alert('Blog saved successfully!');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    }
  };

  const handleEditBlog = (blog) => {
    navigate(`/admin/blog/edit/${blog}`);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard blogs={blogs} />;
      case 'write':
        return <BlogEditor onSave={handleSaveBlog} blog={blogs} />;
      case 'manage':
        return (
          <BlogList
            blogs={blogs}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
            onAdd={() => setActiveMenu('write')}
          />
        );
      default:
        return <Dashboard blogs={blogs} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userRole="admin"
        activeMenu={activeMenu}
        onMenuSelect={setActiveMenu}
      />
      <div className="main-content">
        <Header onLogout={handleLogout} userRole="admin" />
        <main className="dashboard">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
