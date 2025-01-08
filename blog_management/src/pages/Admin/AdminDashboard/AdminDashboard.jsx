import React from 'react';



const AdminDashboard = (blogs ) => {
  const publishedCount = blogs.filter(b => b.status === 'published').length;
  const draftCount = blogs?.filter(b => b.status === 'draft').length;

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Blogs</h3>
          <p className="stat-value">{blogs.length}</p>
        </div>
        <div className="stat-card">
          <h3>Published</h3>
          <p className="stat-value">{publishedCount}</p>
        </div>
        <div className="stat-card">
          <h3>Drafts</h3>
          <p className="stat-value">{draftCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;