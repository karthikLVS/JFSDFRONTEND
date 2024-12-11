import React, { useState } from 'react';
import './LoginSignup.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        retypePassword: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.retypePassword) {
            setErrorMessage("Passwords do not match!"); // Set error message
            setSuccessMessage(''); // Clear success message if there's an error
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    password: formData.password,
                    role: "USER"
                })
            });

            if (response.ok) {
                setSuccessMessage("Registration successful!"); // Set success message
                setErrorMessage(''); // Clear error message if registration is successful
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Registration failed!"); // Set error message from server
                setSuccessMessage(''); // Clear success message if there's an error
            }
        } catch (error) {
            setErrorMessage("An error occurred during registration."); // Set error message
            setSuccessMessage(''); // Clear success message on error
        }
    };

    return (
        <div className="page-container">
            <div className="navbar">
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/about" className="nav-button">About</Link>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>
            <div className="auth-container signup-container">
                <div className="auth-form">
                    <h2>EduConnect</h2>
                    <h2>Signup</h2>
                    <p className="auth-subtitle">Please fill in your details</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="retypePassword"
                            placeholder="Confirm Password"
                            value={formData.retypePassword}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="auth-button">Sign Up</button>
                    </form>

                    {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

                    <p className="auth-redirect">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
