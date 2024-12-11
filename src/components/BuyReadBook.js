import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BuyReadBook.css";

const BuyReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/resources/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  const openPDF = () => {
    if (book.pdfFileUrl) {
      window.open(`http://localhost:8080${book.pdfFileUrl}`, "_blank");
    } else {
      alert("No PDF file available for this book.");
    }
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="buy-read-book-page">
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
        <button onClick={() => navigate(`/my-books`)}>Back</button>
        <button onClick={openPDF}>Read</button>
      </div>
    </div>
  );
};

export default BuyReadBook;
