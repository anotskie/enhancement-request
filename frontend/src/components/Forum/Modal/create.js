import React, { useState } from 'react';
import axios from 'axios';

function ModalComponent({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = {
      title: title,
      description: description,
      author: localStorage.getItem('userId'), // Replace with your logic to get the user ID
    };
  
    try {
      // Make a POST request to create the article
      const response = await axios.post('/api/articles/', data, {
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
      });
  
      // Handle successful response
      console.log('Article created:', response.data);
  
      // Clear the form fields
      setTitle('');
      setDescription('');
  
      // Close the modal
      onClose();
    } catch (error) {
      // Handle error
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Create Article</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />

          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />

          <button type="submit">Create Article</button>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ModalComponent;
