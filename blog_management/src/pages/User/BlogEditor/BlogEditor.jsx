import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";

const BlogEditor = () => {
  const { id } = useParams(); // Extract blog ID from URL
  const [editableBlog, setEditableBlog] = useState(null); // Initialize editable blog state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // To handle errors
  const [successMessage, setSuccessMessage] = useState(""); // To handle success messages
  const navigate = useNavigate(); // For redirection after successful submission

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8001/api/get/${id}/`);
          setEditableBlog(response.data); // Set the fetched blog data
        } else {
          setEditableBlog({}); // Initialize as empty for "Create" mode
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setEditableBlog({ ...editableBlog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:8001/api/update/${id}/` // Edit existing blog
      : `http://localhost:8001/api/create/`; // Create new blog

    try {
      const response = await axios.put(url, editableBlog);
      setSuccessMessage(id ? "Blog updated successfully!" : "Blog created successfully!");
      setError(null); // Clear previous errors

      // Redirect to the blog page after a successful submit
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error submitting blog:", error);
      setError("An error occurred while saving the blog. Please try again.");
      setSuccessMessage(""); // Clear previous success message
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  return (
    <div className="write-blog">
      <h2>{id ? "Edit Blog" : "Write New Blog"}</h2>
      
      {error && <div className="error-message">{error}</div>} {/* Display error */}
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
      
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={editableBlog.title || ""}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={editableBlog.content || ""}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows={10}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setEditableBlog({ ...editableBlog, status: "draft" })}
          >
            Save as Draft
          </button>
          <button type="submit" className="primary-button">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
