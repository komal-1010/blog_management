import React from 'react';


const BlogGrid = ({ blogs, onReadMore }) => {
  return (
    <div className="read-blogs">
      <h2>Published Blogs</h2>
      <div className="blog-grid">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <p className="blog-excerpt">{blog.content}</p>
            <div className="blog-footer">
              <span>{blog.author}</span>
              <span>{blog.date}</span>
            </div>
            <button
              className="read-more"
              onClick={() => onReadMore(blog.id)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;