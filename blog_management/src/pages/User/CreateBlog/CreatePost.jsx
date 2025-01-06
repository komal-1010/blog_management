import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreatePost.css';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { title, content };

    axios.post("/api/blogs", newBlog)
      .then(() => navigate("/admin/blogs"))
      .catch((error) => console.error("Error creating blog:", error));
  };

  return (
    <div className="create-blog">
      <a href="/admin-dashboard"> Go TO Dashboard</a>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
