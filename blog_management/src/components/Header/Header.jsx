import React, { useState } from 'react';
import { Bell, Search, ChevronDown, LogOut } from 'lucide-react';
import "./Header.css"

const Header = ({ onLogout, userRole }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-actions">
          <button className="notification-button">
            <Bell size={20} />
            <span className="notification-indicator"></span>
          </button>

          <div className="profile-dropdown">
            <button
              className="profile-button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="profile-info">
                <p className="profile-name">{user?.email}</p>
                <p className="profile-role">
                  {userRole === 'admin' ? 'Administrator' : 'User'}
                </p>
              </div>
              <ChevronDown size={16} />
            </button>

            {isProfileDropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={onLogout}>
                  <LogOut size={16} style={{ marginRight: '0.5rem' }} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;