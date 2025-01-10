import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog details from API
    fetch(`http://localhost:8000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(error => console.error('Error fetching blog:', error));
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
          <span>By {blog.author_name}</span>
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