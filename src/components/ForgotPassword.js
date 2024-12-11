// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Forgot Password error:", error);
            alert("An error occurred during password reset.");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleForgotPassword} className="auth-form">
                <h2>Reset Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
