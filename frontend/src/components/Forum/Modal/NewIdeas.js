import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

function ModalComponent({
  show,
  handleClose,
  editArticle,
  setArticles,
  articles,
}) {
  const handleSubmit = (event) => {
    // Handle form submission logic here
    event.preventDefault();
    // Update the article or add a new one
    // Update the articles state or make API calls
    handleClose();
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
              value={editArticle ? editArticle.title : ""}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter content"
              value={editArticle ? editArticle.content : ""}
            />
          </Form.Group>
        </Form>
        <Button className="mt-2 d-flex justify-content-end" type="submit">
          {editArticle ? "Save Changes" : "Add Article"}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
