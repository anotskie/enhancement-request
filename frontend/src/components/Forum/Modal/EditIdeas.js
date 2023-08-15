import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updateArticle } from "../../APIService";

function ModalComponentEdit({
  showEdit,
  handleCloseEdit,
  editArticle,
  setArticles,
  articles,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editArticle) {
      setTitle(editArticle.title);
      setDescription(editArticle.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editArticle]);

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      // Update the existing article's title and description
      const updatedArticle = { ...editArticle, title, description };
      await updateArticle(updatedArticle);

      // Update the articles state to reflect the changes
      const updatedArticles = articles.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      );
      setArticles(updatedArticles);

      console.log(updatedArticles);

      // Close the modal
      handleCloseEdit();
    } catch (error) {
      setError("An error occurred while updating the article.");
    }
  };

  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editArticle ? "Edit Article" : "Insert New Idea"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmitEdit}>
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
          onClick={handleSubmitEdit}
        >
          {editArticle ? "Save Changes" : "Add Article"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponentEdit;
