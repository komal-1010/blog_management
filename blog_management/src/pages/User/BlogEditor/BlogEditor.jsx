import React, { useState } from 'react';


const BlogEditor = ({ onSave, blog,setBlog }) => {
  // const [blog, setBlog] = useState(initialBlog || {
  //   title: '',
  //   content: '',
  //   status: 'draft'
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("blog",blog,e)
    onSave({title:blog.title,content:blog.content,status:blog.status,author_name:blog.author_name});
  };

  return (
    <div className="write-blog">
      <h2>{blog ? 'Edit Blog' : 'Write New Blog'}</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            placeholder="Write your blog content here..."
            rows={10}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setBlog({ ...blog, status: 'draft' })}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="primary-button"
            onClick={() => setBlog({ ...blog, status: 'published' })}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;