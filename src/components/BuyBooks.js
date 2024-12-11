
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BuyBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username'); // Retrieve the username from local storage

  useEffect(() => {
    fetch('http://localhost:8080/api/resources')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Books:', data); // Log the fetched books
        setBooks(data);

        // Pre-fill the book selection if passed from previous page
        if (location.state && location.state.bookId) {
          setSelectedBook(location.state.bookId);
        }
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, [location.state]);

  const handlePurchase = () => {
    if (!selectedBook) {
      alert('Please select a book.');
      return;
    }

    const purchaseData = {
      bookId: selectedBook,
      quantity,
      username, // Use the username from local storage
    };

    console.log('Purchase Data:', purchaseData); // Log the purchase data

    fetch('http://localhost:8080/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => {
        if (response.ok) {
          response.text().then((message) => {
            alert(message);
            const selectedBookData = books.find(book => book.id === parseInt(selectedBook, 10));
            
            if (selectedBookData) {
              console.log('Selected Book Data:', selectedBookData); // Log the selected book data
              navigate('/purchase-confirmation', {
                state: { bookTitle: selectedBookData.title, quantity },
              });
            } else {
              console.error('Selected book not found in the books array');
              alert('An error occurred: Selected book not found');
            }
          });
        } else {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }
      })
      .catch((error) => {
        console.error('Error during purchase:', error);
        alert(`An error occurred: ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Buy Books</h2>
      <div>
        <label htmlFor="bookSelect">Select Book:</label>
        <select
          id="bookSelect"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="">--Select a Book--</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handlePurchase}>Buy</button>
    </div>
  );
};

export default BuyBooks;
