import React, { useState, useEffect } from "react";

const BlogEditor = ({ onSave, blog }) => {
  const [editableBlog, setEditableBlog] = useState(blog || {}); // Initialize local state

  useEffect(() => {
    setEditableBlog(blog); // Update local state when the blog prop changes
  }, [blog]);

  const handleChange = (e) => {
    setEditableBlog({ ...editableBlog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editableBlog); // Pass the updated blog to the parent component
  };

  return (
    <div className="write-blog">
      <h2>{editableBlog ? "Edit Blog" : "Write New Blog"}</h2>
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
