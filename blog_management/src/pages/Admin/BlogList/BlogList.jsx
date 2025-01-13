import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import "../BlogList/BlogList.css";
import BlogEditor from "../../User/BlogEditor/BlogEditor";
import { useParams } from "react-router-dom";

const BlogList = ({ blogs, onEdit, onDelete, onAdd, onSave }) => {
  const [editBlog, setEditBlog] = useState(null); // Blog to be edited
  const handleEdit = (blog) => {
    onEdit(blog); // Set the blog to edit
  };

  const handleDelete = (id) => {
    onDelete(id);
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
      {editBlog && (
        <BlogEditor
          onSave={handleEdit} // Save the blog when editing is done
          blog={editBlog} // Pass the selected blog to the editor
        />
      )}
    </div>
  );
};

export default BlogList;
