import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/resources')
      .then(response => {
        setResources(response.data); // Set fetched data to the state
      })
      .catch(error => {
        console.error("There was an error fetching resources!", error);
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div>
      <h2>Resources</h2>
      <div>
        {resources.map(resource => (
          <div key={resource.id}>
            <Link to={`/resource/${resource.id}`}>
              {resource.coverPhotoUrl && (
                // Corrected the template literal for the image source URL
                <img 
                  src={`http://localhost:8080/${resource.coverPhotoUrl}`} 
                  alt="Cover Photo" 
                  style={{ maxWidth: '150px', cursor: 'pointer' }} 
                />
              )}
              <h3>{resource.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
