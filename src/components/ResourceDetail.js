
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ResourceDetail.css";

// const ResourceDetail = () => {
//   const { id } = useParams(); // Get resource ID from URL
//   const navigate = useNavigate();
//   const [resource, setResource] = useState(null);
//   const [isPdfOpen, setPdfOpen] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/resources/${id}`)
//       .then((response) => response.json())
//       .then((data) => setResource(data))
//       .catch((error) => console.error("Error fetching resource details:", error));
//   }, [id]);

//   if (!resource) {
//     return <p>Loading...</p>;
//   }

//   const handlePurchase = () => {
//     navigate('/buy-books', { state: { bookId: resource.id } }); // Navigate to BuyBooks and pass resource ID
//   };

//   return (
//     <div className="resource-detail-container">
//       <button onClick={() => navigate(-1)} className="back-button">
//         Back
//       </button>
//       <h2 className="resource-title">{resource.title}</h2>
//       {resource.coverPhotoUrl && (
//         <img
//           src={`http://localhost:8080${resource.coverPhotoUrl}`}
//           alt={resource.title}
//           className="detail-cover"
//         />
//       )}
//       <p>
//         <strong>Author:</strong> {resource.author}
//       </p>
//       <p>
//         <strong>Category:</strong> {resource.category}
//       </p>
//       <p>
//         <strong>Publication Date:</strong> {resource.publicationDate}
//       </p>
//       <p>
//         <strong>Description:</strong> {resource.description}
//       </p>

//       <div className="action-buttons">
//         <button onClick={() => setPdfOpen(true)} className="read-button">
//           Read
//         </button>
//         <button onClick={handlePurchase} className="buy-button">
//           Buy
//         </button>
//         <button className="borrow-button">Borrow</button>
//         <button className="return-button">Return</button>
//       </div>

//       {/* PDF Viewer */}
//       {isPdfOpen && resource.pdfFileUrl && (
//         <div className="pdf-viewer">
//           <button
//             onClick={() => setPdfOpen(false)}
//             className="close-pdf-button"
//           >
//             X
//           </button>
//           <iframe
//             src={`http://localhost:8080${resource.pdfFileUrl}`}
//             title="PDF Viewer"
//             className="pdf-frame"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResourceDetail;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResourceDetail.css";

const ResourceDetail = () => {
  const { id } = useParams(); // Get resource ID from URL
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [isPdfOpen, setPdfOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/resources/${id}`)
      .then((response) => response.json())
      .then((data) => setResource(data))
      .catch((error) => console.error("Error fetching resource details:", error));
  }, [id]);

  if (!resource) {
    return <p>Loading...</p>;
  }

  const handlePurchase = () => {
    navigate('/buy-books', { state: { bookId: resource.id } }); // Navigate to BuyBooks and pass resource ID
  };

  return (
    <div className="resource-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <h2 className="resource-title">{resource.title}</h2>
      {resource.coverPhotoUrl && (
        <img
          src={`http://localhost:8080${resource.coverPhotoUrl}`}
          alt={resource.title}
          className="detail-cover"
        />
      )}
      <p>
        <strong>Author:</strong> {resource.author}
      </p>
      <p>
        <strong>Category:</strong> {resource.category}
      </p>
      <p>
        <strong>Publication Date:</strong> {resource.publicationDate}
      </p>
      <p>
        <strong>Description:</strong> {resource.description}
      </p>

      <div className="action-buttons">
        <button onClick={() => setPdfOpen(true)} className="read-button">
          Read
        </button>
        <button onClick={handlePurchase} className="buy-button">
          Buy
        </button>
        <button
          onClick={() => navigate(`/borrow/${id}`)} // Navigate to the borrow page
          className="borrow-button"
        >
          Borrow
        </button>
        <button className="return-button">Return</button>
      </div>

      {/* PDF Viewer */}
      {isPdfOpen && resource.pdfFileUrl && (
        <div className="pdf-viewer">
          <button
            onClick={() => setPdfOpen(false)}
            className="close-pdf-button"
          >
            X
          </button>
          <iframe
            src={`http://localhost:8080${resource.pdfFileUrl}`}
            title="PDF Viewer"
            className="pdf-frame"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
