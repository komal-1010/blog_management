import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Auth/Login';
import BlogPost from './pages/User/BlogPost';

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
    path: "/blog",
    element: <BlogPost />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
