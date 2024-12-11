// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './UserProfile.css';

// const UserProfile = () => {
//   const [userDetails, setUserDetails] = useState({});
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch user details when the component loads
//   useEffect(() => {
//     fetch("http://localhost:8080/api/users/profile", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include", // Include cookies for session handling if required
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to fetch user details");
//         }
//       })
//       .then((data) => {
//         setUserDetails(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleBack = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   if (loading) {
//     return <div className="profile-loading">Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <h2 className="profile-title">User Profile</h2>
//       <div className="profile-card">
//         <div className="profile-field">
//           <strong>Name:</strong> <span>{userDetails.username}</span>
//         </div>
//         <div className="profile-field">
//           <strong>Email:</strong> <span>{userDetails.email}</span>
//         </div>
//         <div className="profile-field">
//           <strong>Phone Number:</strong> <span>{userDetails.phoneNumber}</span>
//         </div>
//       </div>
//       <button className="back-button" onClick={handleBack}>
//         Back
//       </button>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user details when the component loads
  useEffect(() => {
    fetch("http://localhost:8080/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for session handling if required
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user details");
        }
      })
      .then((data) => {
        console.log("Fetched user data:", data); // Add this line for debugging
        setUserDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error); // Modify this line for clarity
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-card">
        <div className="profile-field">
          <strong>Name:</strong> <span>{userDetails.username}</span>
        </div>
        <div className="profile-field">
          <strong>Email:</strong> <span>{userDetails.email}</span>
        </div>
        <div className="profile-field">
          <strong>Phone Number:</strong> <span>{userDetails.phoneNumber}</span>
        </div>
      </div>
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default UserProfile;
