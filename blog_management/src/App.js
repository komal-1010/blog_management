import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard.jsx";
import Login from "./pages/Auth/Login.jsx";
import BlogList from "./pages/User/BlogList/BlogList.jsx"
import BlogEditor from './pages/User/BlogEditor.jsx';
import BlogGrid from './pages/User/BlogGrid.jsx';
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
    element: <BlogEditor />,
  },
  {
    path: "/admin/blog/grid",
    element: <BlogGrid />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
