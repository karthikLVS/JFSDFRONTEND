import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './MyBooks.css';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve the username from local storage

  useEffect(() => {
    fetch(`http://localhost:8080/api/purchases/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Purchased Books:', data); // Log the fetched purchased books
        setBooks(data);
      })
      .catch((error) => console.error('Error fetching purchased books:', error));
  }, [username]);

  if (!books.length) {
    return <p>No books purchased yet.</p>;
  }

  return (
    <div className="my-books-container">
      <div className="home-button">
        <FaHome onClick={() => navigate('/user-home')} className="home-icon" />
      </div>
      <h2>My Books</h2>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            {book.coverPhotoBase64 ? (
              <img 
                src={`data:image/jpeg;base64,${book.coverPhotoBase64}`} 
                alt="Cover" 
                className="book-cover" 
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src="/path/to/default-image.jpg"; // Fallback image
                }}
              />
            ) : (
              <img 
                src="/path/to/default-image.jpg" 
                alt="Default Cover" 
                className="book-cover" 
              />
            )}
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <button onClick={() => navigate(`/buy-read-book/${book.id}`)}>Read</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
