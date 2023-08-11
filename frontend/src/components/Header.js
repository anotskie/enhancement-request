import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar  bg="light"
    variant="light"
    style={{
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
      <Navbar.Brand >
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>My Website</span>
      </Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#services">Services</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
