import React from 'react';

const BlogDetail = ({ blog, onBack }) => {
  return (
    <div className="blog-detail">
      <button className="back-button" onClick={onBack}>
        Back to Blogs
      </button>
      <article className="blog-content">
        <h1>{blog.title}</h1>
        <div className="blog-meta">
          <span>By {blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>
        <div className="blog-body">
          {blog.content}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;