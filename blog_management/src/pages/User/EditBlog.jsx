import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './EditBlog.css';

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => console.error("Error fetching blog:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, content };

    axios.put(`/api/blogs/${id}`, updatedBlog)
      .then(() => navigate("/admin/blogs"))
      .catch((error) => console.error("Error updating blog:", error));
  };

  return (
    <div className="edit-blog">
      <h2>Edit Blog</h2>
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
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
