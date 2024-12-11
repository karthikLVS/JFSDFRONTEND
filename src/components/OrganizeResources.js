import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrganizeResources.css';

function OrganizeResources() {
    const [resources, setResources] = useState([]);
    const [editResourceId, setEditResourceId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        tags: '',
        author: '',
        coverPhoto: null, // File input for cover photo
        pdf: null, // File input for PDF
    });

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/resources');
            setResources(response.data);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    const handleEdit = (resource) => {
        setEditResourceId(resource.id);
        setFormData({
            title: resource.title,
            description: resource.description,
            category: resource.category,
            tags: resource.tags,
            author: resource.author,
            coverPhoto: null, // Files are not prefilled
            pdf: null,
        });
    };

    const handleDelete = async (id) => {
        try {
            console.log('Deleting resource ID:', id);
            await axios.delete(`http://localhost:8080/api/resources/${id}`);
            alert('Resource deleted successfully');
            fetchResources();
        } catch (error) {
            console.error('Error deleting resource:', error.response?.data || error.message);
            alert('Failed to delete resource: ' + (error.response?.data?.message || error.message));
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUpdate = async () => {
        if (!editResourceId) return;
    
        const updatedFormData = new FormData();
        updatedFormData.append('title', formData.title);
        updatedFormData.append('description', formData.description);
        updatedFormData.append('category', formData.category);
        updatedFormData.append('tags', formData.tags);
        updatedFormData.append('author', formData.author);
    
        if (formData.coverPhoto) updatedFormData.append('coverPhoto', formData.coverPhoto);
        if (formData.pdf) updatedFormData.append('pdf', formData.pdf);
    
        try {
            console.log('Sending update request:', editResourceId, formData);
            await axios.put(`http://localhost:8080/api/resources/${editResourceId}`, updatedFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Resource updated successfully');
            setEditResourceId(null);
            fetchResources();
        } catch (error) {
            console.error('Error updating resource:', error.response?.data || error.message);
            alert('Failed to update resource: ' + (error.response?.data?.message || error.message));
        }
    };
    
    

    const handleCancelEdit = () => {
        setEditResourceId(null);
        setFormData({
            title: '',
            description: '',
            category: '',
            tags: '',
            author: '',
            coverPhoto: null,
            pdf: null,
        });
    };

    return (
        <div className="organize-resources">
            <h2>Organize Resources</h2>
            {resources.length > 0 ? (
                resources.map((resource) => (
                    <div key={resource.id} className="resource-item">
                        {editResourceId === resource.id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                ></textarea>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    placeholder="Category"
                                />
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Tags"
                                />
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    placeholder="Author"
                                />
                                <input
                                    type="file"
                                    name="coverPhoto"
                                    onChange={handleInputChange}
                                    accept="image/*"
                                />
                                <input
                                    type="file"
                                    name="pdf"
                                    onChange={handleInputChange}
                                    accept="application/pdf"
                                />
                                <div className="action-buttons">
                                    <button onClick={handleUpdate}>Save</button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3>{resource.title}</h3>
                                <p>{resource.description}</p>
                                <p><strong>Category:</strong> {resource.category}</p>
                                <p><strong>Tags:</strong> {resource.tags}</p>
                                <p><strong>Author:</strong> {resource.author}</p>
                                {resource.coverPhotoUrl && (
                                    <img
                                        src={resource.coverPhotoUrl}
                                        alt="Cover"
                                        className="resource-cover"
                                    />
                                )}
                                {resource.pdfUrl && (
                                    <a href={resource.pdfUrl} target="_blank" rel="noopener noreferrer">
                                        Download PDF
                                    </a>
                                )}
                                <div className="action-buttons">
                                    <button onClick={() => handleEdit(resource)}>Edit</button>
                                    <button onClick={() => handleDelete(resource.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No resources found.</p>
            )}
        </div>
    );
}

export default OrganizeResources;
