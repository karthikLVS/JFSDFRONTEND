// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ReadBook.css";

// const ReadBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/resources/${id}`)
//       .then((response) => response.json())
//       .then((data) => setBook(data))
//       .catch((error) => console.error("Error fetching book details:", error));
//   }, [id]);

//   const openPDF = () => {
//     if (book.pdfFileUrl) {
//       window.open(`http://localhost:8080${book.pdfFileUrl}`, "_blank");
//     } else {
//       alert("No PDF file available for this book.");
//     }
//   };

//   if (!book) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="read-book-page">
//       <h2>{book.title}</h2>
//       {book.coverPhotoUrl && (
//         <img
//           src={`http://localhost:8080${book.coverPhotoUrl}`}
//           alt="Cover"
//           className="book-cover"
//         />
//       )}
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Category:</strong> {book.category}</p>
//       <p><strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
//       <p><strong>Description:</strong> {book.description}</p>
//       <div className="button-group">
//         <button onClick={() => navigate(`/borrow-books`)}>Back</button>
//         <button onClick={() => console.log('Return book logic goes here')}>Return</button>
//         <button onClick={openPDF}>Read</button>
//       </div>
//     </div>
//   );
// };

// export default ReadBook;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ReadBook.css";

// const ReadBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/resources/${id}`)
//       .then((response) => response.json())
//       .then((data) => setBook(data))
//       .catch((error) => console.error("Error fetching book details:", error));
//   }, [id]);

//   const openPDF = () => {
//     if (book.pdfFileUrl) {
//       window.open(`http://localhost:8080${book.pdfFileUrl}`, "_blank");
//     } else {
//       alert("No PDF file available for this book.");
//     }
//   };

//   const returnBook = () => {
//     const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
//     fetch(`http://localhost:8080/api/resources/return/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ id: userId })
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("Book returned successfully.");
//           navigate(`/borrow-books`);
//         } else {
//           alert("Failed to return the book.");
//         }
//       })
//       .catch((error) => console.error("Error returning book:", error));
//   };

//   if (!book) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="read-book-page">
//       <h2>{book.title}</h2>
//       {book.coverPhotoUrl && (
//         <img
//           src={`http://localhost:8080${book.coverPhotoUrl}`}
//           alt="Cover"
//           className="book-cover"
//         />
//       )}
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Category:</strong> {book.category}</p>
//       <p><strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
//       <p><strong>Description:</strong> {book.description}</p>
//       <div className="button-group">
//         <button onClick={() => navigate(`/borrow-books`)}>Back</button>
//         <button onClick={returnBook}>Return</button>
//         <button onClick={openPDF}>Read</button>
//       </div>
//     </div>
//   );
// };

// export default ReadBook;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReadBook.css";

const ReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/resources/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  useEffect(() => {
    const username = localStorage.getItem('username'); // Use username to fetch user details
    fetch(`http://localhost:8080/api/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  const openPDF = () => {
    if (book.pdfFileUrl) {
      window.open(`http://localhost:8080${book.pdfFileUrl}`, "_blank");
    } else {
      alert("No PDF file available for this book.");
    }
  };

  const returnBook = () => {
    if (!user) {
      alert("User details not found.");
      return;
    }
    fetch(`http://localhost:8080/api/resources/return/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: user.username })
    })
      .then((response) => {
        if (response.ok) {
          alert("Book returned successfully.");
          navigate(`/borrow-books`);
        } else {
          alert("Failed to return the book.");
        }
      })
      .catch((error) => console.error("Error returning book:", error));
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="read-book-page">
      <h2>{book.title}</h2>
      {book.coverPhotoUrl && (
        <img
          src={`http://localhost:8080${book.coverPhotoUrl}`}
          alt="Cover"
          className="book-cover"
        />
      )}
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <div className="button-group">
        <button onClick={() => navigate(`/borrow-books`)}>Back</button>
        <button onClick={returnBook}>Return</button>
        <button onClick={openPDF}>Read</button>
      </div>
    </div>
  );
};

export default ReadBook;
