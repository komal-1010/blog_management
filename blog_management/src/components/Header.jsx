import React from 'react';
import { Bell, Search, ChevronDown, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  userRole: string;
}

const Header = ({ onLogout, userRole }: HeaderProps) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs..."
            className="search-input"
          />
          <Search className="search-icon" size={20} />
        </div>

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
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="profile-image"
              />
              <div className="profile-info">
                <p className="profile-name">John Doe</p>
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