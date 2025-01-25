import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../BlogEditor/BlogEditor.css"
const BlogEditor = () => {
  const { id } = useParams(); 
  const [editableBlog, setEditableBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate(); 
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const fetchBlog = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:8000/api/get/${id}/`, {
            method: "GET",
            headers: {
              "X-User-Role": user?.role,
            },
          });
          console.log("Response status:", response.status);
          
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);  // Handles errors like 403, 404, etc.
          }
    
          const data = await response.json();  // Parse JSON data from the response
          console.log("Blog data:", data);
          setEditableBlog(data);  // Now we set the actual blog data
        } else {
          setEditableBlog({});
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setEditableBlog({ ...editableBlog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = id
      ? await axios.put(`http://localhost:8000/api/update/${id}/`, editableBlog) 
      : await axios.post(`http://localhost:8000/api/create/`, editableBlog); 
      setSuccessMessage(id ? "Blog updated successfully!" : "Blog created successfully!");
      setError(null); 

      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error submitting blog:", error);
      setError("An error occurred while saving the blog. Please try again.");
      setSuccessMessage("");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const saveAsDraft = async () => {
    const url = id 
    ? `http://localhost:8000/api/update/${id}/`
    : `http://localhost:8000/api/create/`;
  
  try {
    const method = id ? 'put' : 'post'; 
    const response = await axios({
      method,
      url,   
      data: { ...editableBlog, status: "draft" },
    });
  } catch (error) {
    console.error("Error:", error); 
  }
  
  };
  return (
    <div className="write-blog">
      <h2>{id ? "Edit Blog" : "Write New Blog"}</h2>
      
      {error && <div className="error-message">Error:{error}</div>} 
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={editableBlog?.title || ""}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={editableBlog?.content || ""}
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
            onClick={saveAsDraft}
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
