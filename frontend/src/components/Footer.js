import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar
      bg="light"
      variant="light"
      style={{
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: 'auto', 
        
      }}
    >
      
      <Navbar.Text><p>
              <a href="https://github.com/anotskie">
                &copy; {new Date().getFullYear()} Github/anotskie
              </a>
            </p></Navbar.Text>
      
    </Navbar>
  );
};

export default Footer;
