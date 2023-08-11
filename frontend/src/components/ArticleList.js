import React, { useState } from 'react';
import APIService from './APIService';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';

function ArticleList(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null); 
  const [votes, setVotes] = useState({}); 

  const editBtn = (article) => {
    setSelectedArticle(article); 
    setShowModal(true); 
  }

  const deleteBtn = (article) => {
    APIService.DeleteArticle(article.id)
      .then(() => {
       
        const updatedArticles = props.article.filter((a) => a.id !== article.id);
        props.setArticles(updatedArticles); 
      })
      .catch((error) => console.log(error));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  }

  const handleVote = (articleId) => {
   
    setVotes((prevVotes) => ({
      ...prevVotes,
      [articleId]: (prevVotes[articleId] || 0) + 1,
    }));
  }

  return (
    <div>
      {props.article && props.article.map(article => (
        <div key={article.id} className="d-flex">
         
          <Card
            style={{ width: '8rem', marginRight: '1rem', cursor: 'pointer' }}
            className="mt-1"
            onClick={() => handleVote(article.id)} 
          >
            <Card.Body>
              <Card.Title> Votes: {votes[article.id] || 0} </Card.Title>
            </Card.Body>
          </Card>

         
          <Card
            onClick={() => editBtn(article)}
            style={{ width: '18rem', cursor: 'pointer' }}
            className='mt-1'
          >
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{article.subtitle}</Card.Subtitle>
              <Card.Text>
                {article.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}

      
        <Container>
          <Modal show={showModal} onHide={closeModal}>
          <Card style={{border:"none", outline:"none"}}>
            <Modal.Header closeButton>
            <Card style={{ border: "none", outline: "none" }}>
              <Modal.Title>{selectedArticle?.title}</Modal.Title>
              </Card>

            </Modal.Header>
            <Modal.Body style={{ padding: '20px' }}>
              <div>
                <h5 style={{ marginBottom: '10px' }}>Article Description:</h5>
                
                <p style={{ whiteSpace: 'pre-line' }}>{selectedArticle?.description}</p>
                
              </div>
            </Modal.Body>
            
            <Modal.Footer>
              
            </Modal.Footer>
            </Card>
          </Modal>

        </Container>
    </div>
  )
}

export default ArticleList;
