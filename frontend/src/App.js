import "./App.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Tabs, Tab, Button, Card, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ArticleList from "./components/ArticleList";
import Forms from "./components/Forms";
import Header from "./components/Header";
import SidebarMenu from "./components/Sidebar";
import Footer from "./components/Footer";
import Pagination from 'react-bootstrap/Pagination';
import SearchBar from "./components/SearchBar";
import { logoutUser } from "./components/APIService";
import Login from "./Login";



export const MyContext = React.createContext();

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 5c567d10dfba02ecd6a26904732c78bb33a76808'
      }
    })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  };


  const editBtn = (article) => {
    setEditArticle(article)
    handleShowModal();
  }

  const artilceForm = () => {
    setEditArticle({ title: '', description: '' })
    handleShowModal();
  }

  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      return myarticle.id !== article.id;
    });
    setArticles(new_articles);
  }

  const handleLogout = () => {
    setLoggedOut(true);
    logoutUser();
    
  };

  if (loggedOut) {
    return <Login/>;
  }


  const handleShowModal = () => {
    setEditArticle({ title: "", description: "" });
    setShowModal(true);
    fetchArticles();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <Container fluid>
        <Row className="mt-2 d-flex justify-content-center">
          <Col xs={2} md={2} lg={2}>
            <div><SidebarMenu /></div>
          </Col>
          <Col xs={2} md={2} lg={3}>
            
            <div className="mb-5" style={{height:"100vh"}}>
              <h2 className="">Enhancement Request App</h2>
              
              <Button onClick={artilceForm} variant="primary" className="mb-3">
                Insert Article
              </Button>
              
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Recent">
                  Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Trending">
                  <ArticleList article={articles} editBtn={editBtn} deleteBtn={deleteBtn} />
                </Tab>
                <Tab eventKey="contact" title="New">
                  Tab content for Contact
                </Tab>
              </Tabs>
            </div>
            
            
           

            
            
          </Col>

          <Col xs={2} md={2} lg={2}>
            <div><SearchBar /></div>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Col>

          
        </Row>
        


        <Footer></Footer>
      </Container>

     

      

      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Insert New Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          {editArticle ? <Forms article={editArticle} setArticles={setArticles} articles={articles} /> : null}
        </Modal.Body>
        
      </Modal>


    </div>
  );
}

export default App;