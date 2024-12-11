import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
    return (
        <div className="contact-wrapper">
            {/* Navbar */}
            <div className="navbar">
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/about" className="nav-button">About</Link>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>
            
            <div className="contact-container glassy">
                <h1>Contact Us</h1>
                <p>If you have any questions or need assistance, feel free to reach out to us!</p>
                <div className="contact-details">
                    <p><strong>Email:</strong> support@educonnect.com</p>
                    <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                    <p><strong>Follow Us:</strong></p>
                    <div className="social-links">
                        {/* Facebook with colored icon */}
                        <a href="https://www.facebook.com/educonnect" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/ios-filled/50/3b5998/facebook.png" alt="Facebook" />
                        </a>
                        {/* Twitter with colored icon */}
                        <a href="https://www.twitter.com/educonnect" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/ios-filled/50/1da1f2/twitter.png" alt="Twitter" />
                        </a>
                        {/* LinkedIn with colored icon */}
                        <a href="https://www.linkedin.com/company/educonnect" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/ios-filled/50/0e76a8/linkedin.png" alt="LinkedIn" />
                        </a>
                        {/* Instagram with colored icon */}
                        <a href="https://www.instagram.com/educonnect" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/ios-filled/50/e4405f/instagram-new.png" alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
