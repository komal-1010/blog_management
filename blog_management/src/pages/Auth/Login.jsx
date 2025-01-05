import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../components/redux/actions/authActions';
import styles from './Login.module.css'; // Import the CSS module

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        const email = 'admin@admin.com'; 
        const password = 'admin';
        
        if (email === 'admin@admin.com' && password === 'admin') {
            const user = {
                email,
                role: 'admin',
            };
        
            dispatch(login(user));
        
            console.log("Admin logged in", user);
            window.location.href = '/admin-dashboard'; 
        } else {
            const user = {
                email,
                role: 'user',
            };
        
            // Dispatch the login action for regular user
            dispatch(login(user));
        
            // Redirect to user homepage or default user page
            console.log("User logged in", user);
            window.location.href = '/user-dashboard';  // Redirect to the user page
        }
        
    };

    return (
        <div className={styles.container}>
            <h1>LOGIN</h1>
            <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <br />
            <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            <button className={styles.button} onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
