import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import BlogGrid from '../BlogGrid/BlogGrid';
import Sidebar from '../../../components/Sidebar/Sidebar';

const BlogList = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const blogs = [
    {
      id: 1,
      title: 'Getting Started with React',
      content: 'React is a powerful library for building user interfaces...',
      author: 'John Doe',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      content: 'Learn about advanced TypeScript patterns and best practices...',
      author: 'Jane Smith',
      date: '2024-03-14'
    }
  ];

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="app-container">
      {/* <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userRole="user"
        activeMenu="blogs"
        onMenuSelect={() => {}}
      /> */}
      <div className="main-content">
        {/* <Header onLogout={() => navigate('/')} userRole="user" /> */}
        <main className="dashboard">
          <BlogGrid blogs={blogs} onReadMore={handleReadMore} />
        </main>
      </div>
    </div>
  );
};

export default BlogList;