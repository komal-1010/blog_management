import React, { useState } from "react";
import '../AdminDashboard/AdminDashboard.css';  // Ensure you have the styles in this file
import Sidebar from "../../../components/Sidebar/Sidebar";  // Correct import for Sidebar
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  FileText, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'products', label: 'Products', icon: <ShoppingCart size={20} /> },
    { id: 'content', label: 'Content', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 relative`}>
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen && <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center p-4 ${
                activeMenu === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              <span className="inline-flex items-center justify-center">
                {item.icon}
              </span>
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center flex-1">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="hidden md:block text-left">
                    <h2 className="text-sm font-semibold">John Doe</h2>
                    <p className="text-xs text-gray-600">Administrator</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 73px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Stats Cards */}
            {[
              { label: 'Total Users', value: '1,234', change: '+12%' },
              { label: 'Total Revenue', value: '$12,345', change: '+8%' },
              { label: 'Active Products', value: '342', change: '+5%' },
              { label: 'Pending Orders', value: '24', change: '-2%' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'created a new post', time: '2 minutes ago' },
                { user: 'Jane Smith', action: 'updated their profile', time: '5 minutes ago' },
                { user: 'Mike Johnson', action: 'deleted a comment', time: '10 minutes ago' },
                { user: 'Sarah Wilson', action: 'published an article', time: '15 minutes ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      {' '}{activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
