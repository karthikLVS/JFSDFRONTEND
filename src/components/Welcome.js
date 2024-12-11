import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            navigate('/login'); // Redirection after the animation
        }, 1000); // Delay to allow animation to finish
    };

    return (
        <div className={`welcome-container ${isClicked ? 'clicked' : ''}`}>
            {/* Left side for the image */}
            <div className="left-side"></div>
            
            {/* Right side content */}
            <div className="right-box">
                <div className="navbar">
                    <Link to="/" className="nav-button">Home</Link>
                    <Link to="/about" className="nav-button">About</Link>
                    <Link to="/contact" className="nav-button">Contact</Link>
                </div>
                <div className="right-box-content">
                    <h1 className="company-name">EduConnect</h1>
                    <p className="quote">
                        "Empowering Education through an extensive online resource library."
                    </p>
                    <button onClick={handleClick} className="get-started-button">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
