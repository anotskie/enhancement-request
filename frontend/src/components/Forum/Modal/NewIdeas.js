import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createArticle } from "../../APIService";

function ModalComponent({
  show,
  handleClose,
  editArticle,
  setArticles,
  articles,
}) {
  const [title, setTitle] = useState(editArticle ? editArticle.title : "");
  const [description, setDescription] = useState(
    editArticle ? editArticle.description : ""
  );
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId);
  
      const newArticle = await createArticle(title, description, userId);
  
      // Update the articles state to include the new article
      setArticles([...articles, newArticle]);
  
      // Close the modal
      handleClose();
    } catch (error) {
      setError("An error occurred while creating the article.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editArticle ? "Edit Article" : "Insert New Article"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="content">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="mt-2 d-flex justify-content-end"
          type="submit"
          onClick={handleSubmit}
        >
          {editArticle ? "Save Changes" : "Add Article"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
