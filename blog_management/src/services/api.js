const API_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const fetchBlogs = async (token: string) => {
  const response = await fetch(`${API_URL}/blogs/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

export const createBlog = async (token, blog) => {
  const response = await fetch(`${API_URL}/blogs/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) throw new Error('Failed to create blog');
  return response.json();
};

export const updateBlog = async (token, id, blog) => {
  const response = await fetch(`${API_URL}/blogs/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) throw new Error('Failed to update blog');
  return response.json();
};

export const deleteBlog = async (token, id) => {
  const response = await fetch(`${API_URL}/blogs/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete blog');
  return true;
};