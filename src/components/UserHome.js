import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBook, FaShoppingCart, FaHistory, FaUndoAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';
import bookGif from './gif/book.gif';       // Example GIF for hover effect on Textbooks
import notesGif from './gif/notes.gif';     // GIF for Lecture Notes
import researchGif from './gif/research.gif'; // GIF for Research Papers
import './UserHome.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isHovered, setIsHovered] = useState({});  // State to manage hover for each module
  const [resources, setResources] = useState([]);

  // Fetch resources from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/resources")
      .then((response) => response.json())
      .then((data) => setResources(data))
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Close sidebar
  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  // Handle clicks for different modules
  const handleModuleClick = (path) => {
    navigate(path); // Redirect to respective page
  };

  // Manage mouse enter/leave events for hover effects on modules
  const handleMouseEnter = (module) => {
    setIsHovered((prev) => ({ ...prev, [module]: true }));
  };

  const handleMouseLeave = (module) => {
    setIsHovered((prev) => ({ ...prev, [module]: false }));
  };

  return (
    <div className="home-container">
      {/* Sidebar toggle button */}
      {!isSidebarVisible && (
        <button onClick={toggleSidebar} className="menu-toggle">
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      {isSidebarVisible && (
        <aside className="sidebar">
          <h2 className="sidebar-title" onClick={closeSidebar}>EduConnect</h2>
          <nav className="sidebar-menu">
            <a className="menu-item" onClick={() => { navigate('/user-profile'); closeSidebar(); }}>
              <FaUser className="menu-icon" /> User Profile
            </a>
            <a className="menu-item" onClick={() => { navigate('/borrow-books'); closeSidebar(); }}>
              <FaBook className="menu-icon" /> Borrow Books
            </a>
            <a className="menu-item" onClick={() => { navigate('/my-books'); closeSidebar(); }}>
              <FaShoppingCart className="menu-icon" /> My Books
            </a>
            <a className="menu-item" onClick={() => { navigate('/history'); closeSidebar(); }}>
              <FaHistory className="menu-icon" /> History
            </a>
            {/* <a className="menu-item" onClick={() => { navigate('/return-books'); closeSidebar(); }}>
              <FaUndoAlt className="menu-icon" /> Return Books
            </a> */}
            <a className="menu-item" onClick={() => { navigate('/provide-feedback'); closeSidebar(); }}>
              <FaUndoAlt className="menu-icon" /> Provide Feedback
            </a>
          </nav>
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt className="menu-icon" /> Logout
          </button>
        </aside>
      )}

      {/* Main content */}
      <div className={`content-wrapper ${isSidebarVisible ? 'shifted-content' : ''}`}>
        <header className="header">
          <h1 className="header-title">Welcome to EduConnect</h1>
        </header>

        <div className="main-content">
          {/* Module Cards */}
          <div className="modules">
            <div className="module-card" onClick={() => handleModuleClick('/textbooks')}>
              <div
                className="module-background"
                onMouseEnter={() => handleMouseEnter('textbooks')}
                onMouseLeave={() => handleMouseLeave('textbooks')}
              >
                <FaBook className="module-icon" />
                <p className="module-text">Textbooks</p>
                {isHovered['textbooks'] && (
                  <img src={bookGif} alt="Textbook GIF" className="gif-hover" />
                )}
              </div>
            </div>
            <div className="module-card" onClick={() => handleModuleClick('/research-papers')}>
              <div
                className="module-background"
                onMouseEnter={() => handleMouseEnter('research')}
                onMouseLeave={() => handleMouseLeave('research')}
              >
                <FaBook className="module-icon" />
                <p className="module-text">Research Papers</p>
                {isHovered['research'] && (
                  <img src={researchGif} alt="Research Papers GIF" className="gif-hover" />
                )}
              </div>
            </div>
            <div className="module-card" onClick={() => handleModuleClick('/study-guides')}>
              <div
                className="module-background"
                onMouseEnter={() => handleMouseEnter('studyGuides')}
                onMouseLeave={() => handleMouseLeave('studyGuides')}
              >
                <FaBook className="module-icon" />
                <p className="module-text">Study Guides</p>
                {isHovered['studyGuides'] && (
                  <img src={bookGif} alt="Study Guides GIF" className="gif-hover" />
                )}
              </div>
            </div>
            <div className="module-card" onClick={() => handleModuleClick('/lecture-notes')}>
              <div
                className="module-background"
                onMouseEnter={() => handleMouseEnter('lectureNotes')}
                onMouseLeave={() => handleMouseLeave('lectureNotes')}
              >
                <FaBook className="module-icon" />
                <p className="module-text">Lecture Notes</p>
                {isHovered['lectureNotes'] && (
                  <img src={notesGif} alt="Lecture Notes GIF" className="gif-hover" />
                )}
              </div>
            </div>
          </div>

          {/* Resource Grid */}
          <h2>Available Resources</h2>
          <div className="resource-grid">
            {resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                {resource.coverPhotoUrl && (
                  <img 
                    src={`http://localhost:8080${resource.coverPhotoUrl}`} 
                    alt="Cover" 
                    className="resource-cover" 
                  />
                )}
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <button onClick={() => navigate(`/resource/${resource.id}`)}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
