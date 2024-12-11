
import React, { useState } from 'react';
import './LoginSignup.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message
    const [successMessage, setSuccessMessage] = useState(''); // State to store success message
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message); // Set success message
                setErrorMessage(''); // Clear any previous error messages
                
                // Store the username in localStorage
                localStorage.setItem('username', username);
                console.log('Username stored in localStorage:', username); // Debugging

                // Ensure correct redirection based on role
                const userRole = data.role;
                if (userRole === "ADMIN") {
                    navigate("/admin-home");
                } else if (userRole === "USER") {
                    navigate("/user-home");
                } else if (userRole === "FACULTY") {
                    navigate("/faculty-home");
                } else {
                    alert("Unknown role.");
                }
            } else {
                setErrorMessage(data.message); // Set error message
                setSuccessMessage(''); // Clear any previous success messages
            }
        } catch (error) {
            setErrorMessage("An error occurred during login."); // Set error message on error
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    return (
        <div className="page-container">
            <div className="navbar">
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/about" className="nav-button">About</Link>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>
            <div className="auth-container login-container">
                <form onSubmit={handleLogin} className="auth-form">
                    <h2>EduConnect</h2>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log In</button>
                    
                    {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                    
                    <div className="remember-forgot">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <p>New user? <Link to="/signup">Register</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
