
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PurchaseConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookTitle, quantity } = location.state || {};

  const handleBack = () => {
    if (window.confirm('Are you sure you want to go back to the home page?')) {
      navigate('/user-home'); // Ensure this route matches the one defined in your routes
    }
  };

  return (
    <div>
      <h2>Purchase Confirmation</h2>
      <p>Thank you for your purchase!</p>
      <p>Book Title: {bookTitle}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={handleBack}>Back to Home</button>
    </div>
  );
};

export default PurchaseConfirmation;
