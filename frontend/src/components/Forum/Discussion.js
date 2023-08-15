import "../../App.css";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Button,
  Card,
  Form,
  FormControl,
  Navbar,
} from "react-bootstrap";
import ModalComponent from "./Modal/NewIdeas";

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditArticle(null);
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Row className="align-items-center">
            <Col xs="auto" style={{ marginBottom: "2px", display: "flex" }}>
              <h1>
                <b>Chadix.</b>
              </h1>
            </Col>
            <Col
              className="ml-auto"
              style={{ marginTop: "30px", display: "flex" }}
            >
              <h3>Chadix ideas</h3>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Row>
          <Col md={2}>
            <Button onClick={handleShowModal}>Add a new idea</Button>
            <ModalComponent
              show={showModal}
              handleClose={handleCloseModal}
              editArticle={editArticle}
              setEditArticle={setEditArticle}
              setArticles={setArticles}
              articles={articles}
            />
          </Col>
          <Col md={{ span: 8, offset: 0 }}>
            <Tabs
              defaultActiveKey="trending"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="recent" title="Recent"></Tab>
              <Tab eventKey="trending" title="Trending"></Tab>
              <Tab eventKey="popular" title="Popular"></Tab>
            </Tabs>
          </Col>
          <Col md={{ span: 2, offset: 8 }} style={{ marginTop: "-55px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Forums;
