import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import "../BlogList/BlogList.css";
import BlogEditor from "../../User/BlogEditor/BlogEditor";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogList = ({ blogs, onEdit, onDelete, onAdd, onSave }) => {
  const [editBlog, setEditBlog] = useState([]); // Blog to be edited

  const handleDelete = async (id) => {
    try {
      // Confirm before deletion
      const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
      if (!confirmDelete) return;
  
      // Call the delete API
      const response = await axios.delete(`http://localhost:8000/api/delete/${id}/`);
      console.log("Delete successful:", response.data);
  
      // Callback to update the UI after deletion
      onDelete(id);
  
      // Optional: show success message
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while trying to delete the blog. Please try again.");
    }
  };
  const handleSave = (updatedBlog) => {
    onSave(updatedBlog); // Save the updated blog
    setEditBlog(null); // Close editor after saving
  };

  return (
    <div className="manage-blogs">
      <div className="section-header">
        <h2>Manage Blogs</h2>
        <button className="add-blog-button" onClick={onAdd}>
          <Plus size={20} />
          New Blog
        </button>
      </div>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <div className="blog-info">
              <h3>{blog.title}</h3>
              <p className="blog-meta">
                <span>By {blog.author}</span>
                <span>•</span>
                <span>{blog.date}</span>
                <span className={`status ${blog.status}`}>{blog.status}</span>
              </p>
            </div>
            <div className="blog-actions">
              <button
                className="icon-button edit"
                onClick={(e) => {
                  const selectedBlog = blogs.find((item) => item.id === blog.id);
                  if (selectedBlog) {
                    setEditBlog(selectedBlog);
                  } else {
                    console.error("Blog not found for ID:", blog.id);
                  }
                  onEdit(blog.id);
                }}
              >
                <Edit size={18} />
              </button>
              <button
                className="icon-button delete"
                onClick={() => handleDelete(blog.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
