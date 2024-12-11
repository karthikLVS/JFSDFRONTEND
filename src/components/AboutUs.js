import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
    return (
        <div className="about-wrapper">
            {/* Navbar */}
            <div className="navbar">
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/about" className="nav-button">About</Link>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>

            <div className="about-container glassy">
                <h1>About Us</h1>
                <p>EduConnect is a platform designed to enhance learning and collaboration among students, faculty, and staff. Our mission is to create a seamless and engaging educational experience through technology.</p>
                
                <h2>EduConnect</h2>
                <p>Our platform provides access to a wide variety of educational materials including:</p>
                <ul>
                    <li>Textbooks</li>
                    <li>Research papers</li>
                    <li>Study guides</li>
                </ul>
                <p>This library is designed for students and educators, enabling them to:</p>
                <ul>
                    <li>Search for resources efficiently</li>
                    <li>Access materials anytime, anywhere</li>
                    <li>Enhance learning and research</li>
                </ul>
                <p>Admin users can manage resources and control access to ensure a valuable and secure experience.</p>
            </div>
        </div>
    );
}

export default AboutUs;
