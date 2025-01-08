import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

const BlogList = ( blogs, onEdit, onDelete, onAdd ) => {
  return (
    <div className="manage-blogs">
      <div className="section-header">
        <h2>Manage Blogs</h2>
        <button className="add-blog-button" onClick={onAdd}>
          <Plus size={20} />
          New Blog
        </button>
      </div>
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-item">
            <div className="blog-info">
              <h3>{blog.title}</h3>
              <p className="blog-meta">
                <span>By {blog.author}</span>
                <span>•</span>
                <span>{blog.date}</span>
                <span className={`status ${blog.status}`}>{blog.status}</span>
              </p>
            </div>
            <div className="blog-actions">
              <button
                className="icon-button edit"
                onClick={() => onEdit(blog)}
              >
                <Edit size={18} />
              </button>
              <button
                className="icon-button delete"
                onClick={() => onDelete(blog.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;