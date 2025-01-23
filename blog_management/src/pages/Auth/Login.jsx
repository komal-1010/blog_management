import React, { useState } from 'react';
import "./Login.css"
import LoginComponent from './LoginComponent';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    if (email.includes('admin') && password === 'admin') {
      sessionStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      navigate('/admin-dashboard');
    } else {
      sessionStorage.setItem('user', JSON.stringify({ email, role: 'user' }));
      navigate('/blogs');
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};

export default Login;
