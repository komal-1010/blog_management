import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/Header/Header.jsx";
import Sidebar from "../../../components/Sidebar/Sidebar.jsx";
import Dashboard from "../../../components/Dashboard/Dashboard.jsx";
import BlogEditor from '../../User/BlogEditor/BlogEditor.jsx';
import "./AdminDashboard.css"
import BlogList from '../BlogList/BlogList.jsx';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user ? user.role : "user";
    console.log("role",role)
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
      setBlogs(data)
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
  };
  const handleSaveBlog = async (blog) => {
    try {
      // Sending a POST request to create the blog
      const response = await axios.post('http://localhost:8000/api/create/', blog);
  
      // Handle successful response (navigate to another page, show success message, etc.)
      console.log('Blog saved successfully:', response.data);
      navigate('/admin-dashboard'); // Navigate back to the list of blogs or another page
    } catch (error) {
      console.error('Error saving blog:', error);
      // Handle error (show error message, etc.)
    }
  };

  const handleEditBlog = (blog) => {
    // Navigate to edit page with blog data
    navigate(`/admin/blog/edit/${blog}`);
  };

  const handleDeleteBlog = (id) => {
    // Implement delete blog logic
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard blogs={blogs} />;
      case 'write':
        return <BlogEditor onSave={handleSaveBlog} blog={blogs}/>;
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