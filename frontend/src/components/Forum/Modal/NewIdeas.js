import React, { useState, useEffect } from "react";
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createArticle(title, description);
      console.log("Article created:", response); // Log the response for testing
      // You can handle the response and update your UI accordingly
      // For example, you can fetch the updated list of articles after creating
      // and update your articles state.
    } catch (error) {
      console.error("Error creating article:", error);
      // Handle error here, show a message to the user, etc.
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
