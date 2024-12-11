import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BorrowBookPage.css";

const BorrowBookPage = () => {
  const { id } = useParams(); // Get resource ID from the URL
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [borrowForm, setBorrowForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    borrowPeriod: "7", // Default to 7 days
    purpose: "",
  });
  const [borrowDeadline, setBorrowDeadline] = useState("");
  const [formMessage, setFormMessage] = useState({ type: "", message: "" });

  useEffect(() => {
    // Fetch resource details
    fetch(`http://localhost:8080/api/resources/${id}`)
      .then((response) => response.json())
      .then((data) => setResource(data))
      .catch((error) =>
        setFormMessage({
          type: "error",
          message: "Failed to load resource details.",
        })
      );
  }, [id]);

  const generateDeadline = (days) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt(days));
    return currentDate.toISOString().split("T")[0]; // Return only the date part
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBorrowForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "borrowPeriod") {
      setBorrowDeadline(generateDeadline(value));
    }
  };

  const handleBorrowSubmit = (e) => {
    e.preventDefault();

    if (!borrowForm.username || !borrowForm.email || !borrowForm.phoneNumber) {
      setFormMessage({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    fetch(`http://localhost:8080/api/resources/${id}/borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...borrowForm,
        resourceId: id,
        resourceTitle: resource.title,
        borrowDate: new Date().toISOString(),
        deadline: borrowDeadline,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setFormMessage({
            type: "success",
            message: "Book borrowed successfully!",
          });
          setTimeout(() => {
            navigate(`/resource/${id}`);
          }, 2000); // Redirect after 2 seconds
        } else {
          throw new Error("Failed to borrow the book");
        }
      })
      .catch((error) => {
        setFormMessage({
          type: "error",
          message: "Failed to borrow the book. Please try again.",
        });
      });
  };

  if (!resource) {
    return <p>Loading...</p>;
  }

  return (
    <div className="borrow-book-page">
      <h2>Borrow {resource.title}</h2>
      <form onSubmit={handleBorrowSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={borrowForm.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={borrowForm.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={borrowForm.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="borrowPeriod">Borrow Period (Days):</label>
          <select
            id="borrowPeriod"
            name="borrowPeriod"
            value={borrowForm.borrowPeriod}
            onChange={handleInputChange}
          >
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="21">21 Days</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose of Borrowing:</label>
          <textarea
            id="purpose"
            name="purpose"
            value={borrowForm.purpose}
            onChange={handleInputChange}
            placeholder="Optional: Briefly describe your purpose"
          />
        </div>

        <p>
          You can borrow this book until{" "}
          <strong>{borrowDeadline || generateDeadline(borrowForm.borrowPeriod)}</strong>.
        </p>

        {formMessage.message && (
          <p
            className={`form-message ${
              formMessage.type === "success" ? "success" : "error"
            }`}
          >
            {formMessage.message}
          </p>
        )}

        <div className="form-buttons">
          <button type="submit">Borrow</button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BorrowBookPage;
