import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import BadgeMUI from "@mui/material/Badge";
import "../../../App.css";
import { voteForArticle } from "../../APIService";
import { getUserDetails } from "../../APIService"; // Import the new API function
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

const ArticleCardComponent = ({ article }) => {
  const [votes, setVotes] = useState(article.vote || 0);
  const [voted, setVoted] = useState(false);
  const [authorUsername, setAuthorUsername] = useState(""); // State to hold author's username

  const handleVote = async () => {
    try {
      const updatedVotes = voted ? votes - 1 : votes + 1;
      setVotes(updatedVotes);
      setVoted(!voted);

      const updatedArticle = await voteForArticle(article.id);
      setVotes(updatedArticle.vote); // Update votes based on API response
    } catch (error) {
      console.error("Error voting for article:", error);
    }
  };

  useEffect(() => {
    async function fetchAuthorUsername() {
      try {
        const username = await getUserDetails(article.author); // Fetch username based on ID
        setAuthorUsername(username);
      } catch (error) {
        console.error("Error fetching author username:", error);
      }
    }
    fetchAuthorUsername();
  }, [article.author]);

  const statusColor = "#6ec5b8"; // Replace with your actual color
  const displayStatus = "Active"; // Replace with your actual status
  const commentCount = 1000;

  const handleShowModal = () => {
    setShowModal(true);
  };

    const handleCloseModal = () => {
    setShowModal(false);
    setEditArticle(null);
  };

  const handleEditClick = () => {
    setEditArticle(article);
    setShowModal(true);
  }; // Added closing bracket here
  
  const handleForumIconClick = () => {
    const url = `/Comments/?articleId=${article.id}`;
    // Change the URL to trigger the redirection
  
    window.location.href = url;
  };

  return (
    <Row className="article-card">
      <Col sm={2}>
        <div className={`vote-button ${voted ? "voted" : ""}`}>
          <Button
            variant={voted ? "secondary" : "outline-success"}
            size="sm"
            onClick={() => handleVote(article.id)}
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
        <Button size="sm" variant="outline-primary" onClick={() => handleEditClick(article)}>Edit</Button>
            <ModalComponentEdit
              showEdit={showModal}
              handleCloseEdit={handleCloseModal}
              editArticle={editArticle} 
              
            
            />
            <Card.Body>
              <div>
                
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  {article.description && article.description.length > 250
                    ? article.description.substring(0, 250) + "..."
                    : article.description}
                </Card.Text>
              
            </div>
          </Card.Body>
        </Card>


       

        <div className="comments-section d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <b>Created by:</b>
            {authorUsername}
          </div>
          <div className="d-flex align-items-center">
            <div
              className="status mr-3"
              style={{
                backgroundColor: statusColor || "#999",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              {displayStatus}
            </div>

            <div className="comment-info d-flex align-items-center">
              <div className="comment-count mr-1">
                <BadgeMUI badgeContent={commentCount} color="primary">
                  <ForumOutlinedIcon
                    onClick={handleForumIconClick}
                    style={{ cursor: "pointer" }}
                  />
                </BadgeMUI>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};



export default ArticleCardComponent;
