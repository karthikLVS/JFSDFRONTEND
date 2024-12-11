// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import "./BorrowBooksPage.css";

// const BorrowBooksPage = () => {
//   const navigate = useNavigate();
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/resources/borrowed/${username}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.length > 0) {
//           setBorrowedBooks(data);
//         } else {
//           setBorrowedBooks([]);
//         }
//       })
//       .catch((error) => console.error("Error fetching borrowed books:", error));
//   }, [username]);

//   if (!borrowedBooks.length) {
//     return <p>No borrowed books found.</p>;
//   }

//   return (
//     <div className="borrow-books-page">
//       <div className="home-button">
//         <FaHome onClick={() => navigate('/user-home')} className="home-icon" />
//       </div>
//       <h2>Borrowed Books</h2>
//       <div className="borrowed-books-grid">
//         {borrowedBooks.map((book) => (
//           <div key={book.id} className="borrowed-book-card">
//             <h3>{book.resourceTitle}</h3>
//             <p>Borrowed Date: {new Date(book.borrowDate).toLocaleDateString()}</p>
//             <p>Deadline: {new Date(book.deadline).toLocaleDateString()}</p>
//             <button onClick={() => navigate(`/read-book/${book.resource.id}`)}>View Details</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BorrowBooksPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./BorrowBooksPage.css";

const BorrowBooksPage = () => {
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:8080/api/resources/borrowed/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setBorrowedBooks(data);
      })
      .catch((error) => console.error("Error fetching borrowed books:", error));
  }, [username]);

  const refreshBooks = () => {
    fetch(`http://localhost:8080/api/resources/borrowed/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setBorrowedBooks(data);
      })
      .catch((error) => console.error("Error fetching borrowed books:", error));
  };

  if (!borrowedBooks.length) {
    return <p>No borrowed books found.</p>;
  }

  return (
    <div className="borrow-books-page">
      <div className="home-button">
        <FaHome onClick={() => navigate('/user-home')} className="home-icon" />
      </div>
      <h2>Borrowed Books</h2>
      <div className="borrowed-books-grid">
        {borrowedBooks.map((book) => (
          <div key={book.id} className="borrowed-book-card">
            <h3>{book.resourceTitle}</h3>
            <p>Borrowed Date: {new Date(book.borrowDate).toLocaleDateString()}</p>
            <p>Deadline: {new Date(book.deadline).toLocaleDateString()}</p>
            <button onClick={() => navigate(`/read-book/${book.resource.id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowBooksPage;
