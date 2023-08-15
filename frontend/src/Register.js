import React, {useState} from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { registerUser } from "./components/APIService";

function Register({ onTogglePage }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await registerUser(username, password, email);
        // Handle the response as needed, e.g., show a success message or redirect to another page.
      } catch (error) {
        // Handle error, e.g., display an error message.
      }
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="p-3" style={{ backgroundColor: '#87CEEB', width: '30rem' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
