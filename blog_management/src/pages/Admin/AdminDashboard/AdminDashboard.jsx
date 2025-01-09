import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/Header/Header.jsx";
import Sidebar from "../../../components/Sidebar/Sidebar.jsx";
import Dashboard from "../../../components/Dashboard/Dashboard.jsx";
import BlogList from "../../User/BlogList/BlogList.jsx"
import BlogEditor from '../../User/BlogEditor/BlogEditor.jsx';
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      content: 'React is a powerful library for building user interfaces...',
      status: 'published',
      date: '2024-03-15',
      author: 'John Doe'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      content: 'Learn about advanced TypeScript patterns and best practices...',
      status: 'draft',
      date: '2024-03-14',
      author: 'John Doe'
    }
  ]);

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
  };

  const handleSaveBlog = (blog: { title: string; content: string; status: string }) => {
    // Implement save blog logic
    console.log('Saving blog:', blog);
  };

  const handleEditBlog = (blog) => {
    // Navigate to edit page with blog data
    navigate(`/admin/blog/edit/${blog.id}`, { state: { blog } });
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
        return <BlogEditor onSave={handleSaveBlog} />;
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
console.log("isSidebarOpen",isSidebarOpen)
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