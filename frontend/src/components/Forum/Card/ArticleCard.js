import React, { useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import BadgeMUI from "@mui/material/Badge";
import "../../../App.css";

const ArticleCardComponent = ({ article }) => {
  const [votes, setVotes] = useState(article.votes);
  const [voted, setVoted] = useState(false);
  const commentCount = 5;

  const handleVote = () => {
    if (voted) {
      setVotes(votes - 1);
    } else {
      setVotes(votes + 1);
    }
    setVoted(!voted);
  };

  return (
    <Row className="article-card">
      <Col sm={2}>
        <div className={`vote-button ${voted ? "voted" : ""}`}>
          <Button
            variant={voted ? "danger" : "outline-success"}
            size="sm"
            onClick={handleVote}
            className="vote-button-inner"
          >
            {voted ? (
              <CloseIcon className="vote-icon" />
            ) : (
              <CheckIcon className="vote-icon" />
            )}
            <Badge pill variant="light" className="vote-count">
              {votes}
            </Badge>
          </Button>
        </div>
      </Col>
      <Col sm={10}>
        <Card className="article-content" style={{ border: "none" }}>
          <Card.Body>
            <div>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
            </div>
            <div className="comments-section d-flex justify-content-end">
              <BadgeMUI badgeContent={commentCount} color="primary">
                <ForumOutlinedIcon fontSize="small" />
              </BadgeMUI>

              {/* Render comments here */}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ArticleCardComponent;
