
import React, { useState, useEffect } from 'react';
import './AdminHome.css';
import ManageUsers from './ManageUsers';
import { FaHome, FaUpload, FaFolder, FaUsers, FaSignOutAlt, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import UploadForm from './UploadResource'; // Import Upload Form
import OrganizeResources from './OrganizeResources';

function AdminHome() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [feedbacks, setFeedbacks] = useState([]); // State to store feedbacks
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const feedbacksPerPage = 5; // Feedbacks per page
    const navigate = useNavigate(); // Initialize navigate function

    // Fetch feedbacks from the backend
    useEffect(() => {
        if (activeTab === "FeedbackReviews") {
            fetch('http://localhost:8080/api/feedback')
                .then((response) => response.json())
                .then((data) => setFeedbacks(data))
                .catch((error) => console.error('Error fetching feedbacks:', error));
        }
    }, [activeTab]);

    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        feedback.feedback?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current feedbacks for pagination
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderContent = () => {
        switch (activeTab) {
            case "Upload":
                return <UploadForm />;
            case "Organize":
                return <OrganizeResources />;
            case "Manage":
                return <ManageUsers />;
            case "FeedbackReviews":
                return (
                    <div style={{ color: '#fff' }}> {/* Add inline style for debugging */}
                        <h2>Feedback Reviews</h2>
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ color: '#000', backgroundColor: '#fff' }} // Ensure search input is visible
                        />
                        <ul>
                            {currentFeedbacks.map((feedback) => (
                                <li key={feedback.id} style={{ color: '#fff' }}> {/* Add inline style for debugging */}
                                    <p><strong>User:</strong> {feedback.userName ?? 'Anonymous'}</p>
                                    <p><strong>Feedback:</strong> {feedback.feedback ?? 'No feedback provided'}</p>
                                    <p><strong>Submitted At:</strong> {feedback.submittedAt ?? 'Unknown'}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(filteredFeedbacks.length / feedbacksPerPage) }, (_, index) => (
                                <button key={index + 1} onClick={() => paginate(index + 1)} className="pagination-button">
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <h2>Welcome to the Admin Dashboard</h2>;
        }
    };

    const handleLogout = () => {
        // Optional: Add logic to clear session tokens, etc.
        console.log("Logged out");
        
        // Redirect to Login page
        navigate('/login'); // Redirects to the Login page
    };

    return (
        <div className="admin-home">
            <div className="sidebar">
                <h1 className="logo">EduConnect</h1>
                <ul>
                    <li onClick={() => setActiveTab("Dashboard")} className={activeTab === "Dashboard" ? "active" : ""}>
                        <FaHome className="menu-icon" /> Dashboard
                    </li>
                    <li onClick={() => setActiveTab("Upload")} className={activeTab === "Upload" ? "active" : ""}>
                        <FaUpload className="menu-icon" /> Upload Resources
                    </li>
                    <li onClick={() => setActiveTab("Organize")} className={activeTab === "Organize" ? "active" : ""}>
                        <FaFolder className="menu-icon" /> Organize Resources
                    </li>
                    <li onClick={() => setActiveTab("Manage")} className={activeTab === "Manage" ? "active" : ""}>
                        <FaUsers className="menu-icon" /> Manage User Access
                    </li>
                    <li onClick={() => setActiveTab("FeedbackReviews")} className={activeTab === "FeedbackReviews" ? "active" : ""}>
                        <FaComments className="menu-icon" /> Feedback Reviews
                    </li>
                </ul>
                <button className="logout-button" onClick={handleLogout}>
                    <FaSignOutAlt className="menu-icon" /> Logout
                </button>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminHome;
