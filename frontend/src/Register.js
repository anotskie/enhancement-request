import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';

function Register({ onTogglePage }) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh',  }}>
    <Card className="p-3" style={{backgroundColor:'#87CEEB', width: '30rem'  }}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Register
        </Button>
        
        <Button variant="link" onClick={() => onTogglePage(false)}>
          Back to Login
        </Button>
      </Form>
      </Card>
    </div>
  );
}

export default Register;
