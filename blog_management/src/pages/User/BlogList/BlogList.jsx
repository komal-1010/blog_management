import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/api/blogs")
      .then(response => setBlogs(response.data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  const deleteBlog = (id) => {
    axios.delete(`/api/blogs/${id}`)
      .then(() => setBlogs(blogs.filter(blog => blog._id !== id)))
      .catch(error => console.error("Error deleting blog:", error));
  };

  return (
    <div className="blog-list">
      <a href="/admin-dashboard"> Go TO Dashboard</a>
      <h2>Manage Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <Link to={`/admin/blog/edit/${blog._id}`}>Edit</Link>
            <button onClick={() => deleteBlog(blog._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
