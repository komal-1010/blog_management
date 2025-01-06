import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard.jsx";
import Login from "./pages/Auth/Login.jsx";
import BlogPost from "./pages/User/BlogPost.jsx"
import BlogList from "./pages/User/BlogList/BlogList.jsx"
import CreateBlog from './pages/User/CreateBlog/CreatePost.jsx';
// Define your routes configuration
const router = createBrowserRouter([
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin/blogs",
    element: <BlogList />,
  },
  {
    path: "/admin/blog/create",
    element: <CreateBlog />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
