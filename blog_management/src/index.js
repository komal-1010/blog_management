import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const rootElement = document.getElementById('root');

// Create a root with `createRoot` (new in React 18)
const root = ReactDOM.createRoot(rootElement);

// Render your App wrapped in the Provider component
root.render(
    <App />
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
