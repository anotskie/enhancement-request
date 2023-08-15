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
import ModalComponent from "./Modal/create";

import NavbarComponent from "../Navbar/Navigation";
import ArticleCardComponent from "./Card/ArticleCard"; // Make sure to adjust the import path
import { getArticleList, voteForArticle, createArticle } from "../APIService"; // Make sure to adjust the import path

const Forums = () => {
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditArticle(null);
  };

  const handleVote = async (articleId) => {
    try {
      const updatedArticle = await voteForArticle(articleId);
      const updatedArticles = articles.map((article) =>
        article.id === articleId ? updatedArticle : article
      );
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Error voting for article:", error);
    }
  };

  useEffect(() => {
    const fetchAndSetArticles = async () => {
      try {
        const fetchedArticles = await getArticleList();
        setArticles(fetchedArticles.reverse());
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchAndSetArticles();
  }, []);

  const userId = localStorage.getItem("userId");
  console.log("User ID:", userId);

  return (
    <div>
      <NavbarComponent />
      <div className="d-flex justify-content-center">
        <Container className="mt-3">
          <Row>
            <Col md={3}>
              <Button onClick={openModal}>Create Article</Button>
              <ModalComponent isOpen={isModalOpen} onClose={closeModal} />
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
              <Row>
                <Col md={{ span: 12 }}>
                  {articles.map((article) => (
                    <ArticleCardComponent
                      key={article.id}
                      article={article}
                      onVote={() => handleVote(article.id)}
                    />
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Forums;
