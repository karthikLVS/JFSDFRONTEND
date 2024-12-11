import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './ProvideFeedback.css'; // Optional: for styling

const ProvideFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    // Fetch the username from localStorage or another source
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      console.log('Stored username:', storedUsername); // Debugging
    } else {
      console.log('No username found in localStorage'); // Debugging
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Log the username before submission
    console.log('Username before submission:', username); // Debugging

    const payload = {
      feedback,
      anonymous: isAnonymous,
      username, // Include username in the payload
    };

    console.log('Submitting payload:', JSON.stringify(payload)); // Debugging

    fetch('http://localhost:8080/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response data:', data); // Debugging
        if (data.message) {
          setMessage(data.message);
          setFeedback('');
          setIsAnonymous(false);
        } else {
          setMessage('Failed to send feedback. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
        setMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div className="feedback-container">
      <div className="home-button">
        <FaHome onClick={() => navigate('/user-home')} className="home-icon" />
      </div>
      <h1>Provide Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          rows="5"
          required
        ></textarea>
        <div className="feedback-options">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span>Submit anonymously</span>
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default ProvideFeedback;
