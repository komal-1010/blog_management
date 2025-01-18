import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BlogDetail.css'; // Import the CSS

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get/${id}/`);
        setBlog(response.data);
      } catch (error) {
        setError('Error fetching blog details. Please try again later.');
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Blogs
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="loading">
        <span>Loading...</span>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Blogs
      </button>
      <article className="blog-content">
        <h1>{blog.title}</h1>
        <div className="blog-meta">
          <span>By {blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        <div className="blog-body">
          <p>{blog.content}</p>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
