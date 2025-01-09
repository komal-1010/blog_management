import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard.jsx";
import Login from "./pages/Auth/Login";
import BlogList from "./pages/User/BlogList/BlogList";
import BlogDetail from './pages/User/BlogDetail/BlogDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin-dashboard/*",
    element: <AdminDashboard />,
  },
  {
    path: "/blogs",
    element: <BlogList  />,
  },
  {
    path: "/admin/blog/create",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/blog/edit/:id",
    element: <AdminDashboard />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
  },
  // Redirect any unknown routes to the login page
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;