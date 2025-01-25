import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import BlogGrid from '../BlogGrid/BlogGrid.jsx'
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/read/`);
        setBlogs(response.data); // Save the data to state
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userRole="user"
        activeMenu="blogs"
        onMenuSelect={() => {}}
        className={isSidebarOpen ? '' : 'closed'} // Toggling the sidebar closed class
      />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}> {/* Dynamic margin based on sidebar state */}
        <Header onLogout={() => navigate('/')} userRole="user" />
        <main className="dashboard">
          <BlogGrid blogs={blogs} onReadMore={handleReadMore} />
        </main>
      </div>
    </div>
  );
};

export default BlogList;
