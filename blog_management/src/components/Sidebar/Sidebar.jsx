import React from 'react';
import { 
  LayoutDashboard, 
  PenSquare,
  BookOpen,
  FileText, 
  Settings,
  X,
  Menu
} from 'lucide-react';
import "./Sidebar.css"

const Sidebar = ({isOpen, onToggle, userRole, activeMenu, onMenuSelect} ) => {
  console.log("userrole",userRole)
  const menuItems = userRole === 'admin' 
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'write', label: 'Write Blog', icon: <PenSquare size={20} /> },
        { id: 'manage', label: 'Manage Blogs', icon: <FileText size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
      ]
    : [
        { id: 'blogs', label: 'Read Blogs', icon: <BookOpen size={20} /> },
      ];

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isOpen && <h1 className="sidebar-title">Blog Platform</h1>}
        <button className="toggle-button" onClick={onToggle}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuSelect(item.id)}
            className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
          >
            <span className="nav-item-icon">{item.icon}</span>
            {isOpen && <span className="nav-item-text">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;