import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/get/${id}/`);
        console.log("data", response.data);
        setBlog(response.data); // Save the data to state
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]); 

  if (!blog) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="blog-detail">
      <button className="back-button" onClick={() => navigate('/blogs')}>
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
          {blog.content}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
