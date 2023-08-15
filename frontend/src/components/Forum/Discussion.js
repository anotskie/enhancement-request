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
import { fetchArticles, voteForArticle } from "../APIService";
import NavbarComponent from "../Navbar/Navigation";
import ArticleCardComponent from "./Card/ArticleCard";

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
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
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
  );
};

export default Forums;
