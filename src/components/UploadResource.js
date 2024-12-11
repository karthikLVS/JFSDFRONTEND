import React, { useState } from 'react';
import './UploadResource.css';

function UploadResource() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        tags: '',
        author: '',
        publicationDate: '',
    });
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'coverPhoto') {
            setCoverPhoto(files[0]);
        } else if (name === 'pdfFile') {
            setPdfFile(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('tags', formData.tags);
        data.append('author', formData.author);
        data.append('publicationDate', formData.publicationDate);
        
        if (coverPhoto) data.append('coverPhoto', coverPhoto);
        if (pdfFile) data.append('pdfFile', pdfFile);

        try {
            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: data,
            });

            const responseData = await response.json();

            if (response.ok) {
                setMessage(responseData.message || 'Resource uploaded successfully!');
            } else {
                setMessage('Error: Could not upload the resource');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessage('Error: An error occurred during upload');
        }
    };

    return (
        <div className="form-container">
            <h2>Upload New Resource</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" placeholder="Description" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" placeholder="Category" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" id="tags" name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" name="author" placeholder="Author" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="publicationDate">Publication Date</label>
                    <input type="date" id="publicationDate" name="publicationDate" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="coverPhoto">Cover Photo</label>
                    <input type="file" id="coverPhoto" name="coverPhoto" onChange={handleFileChange} accept="image/*" />
                </div>
                <div className="form-group">
                    <label htmlFor="pdfFile">PDF File</label>
                    <input type="file" id="pdfFile" name="pdfFile" onChange={handleFileChange} accept=".pdf" />
                </div>
                <button type="submit" className="form-submit-btn">Upload Resource</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default UploadResource;
