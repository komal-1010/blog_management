import { Eye, EyeOff, Lock, Mail, UserCircle } from "lucide-react";
import React, { useState } from "react";

const LoginComponent = ({onLogin}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    console.log("onLogin",onLogin)
    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(loginData.email, loginData.password);
    };
  
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <UserCircle size={48} />
            <h1>Login</h1>
            <p className="login-tip">Use email with 'admin' for admin access</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <Mail size={20} />
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <Lock size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginComponent;