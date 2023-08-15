import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { registerUser } from "./components/APIService";

function Register({ onTogglePage }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#87CEEB" }}
    >
      <Card className="p-3" style={{ width: "30rem" }}>
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
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-primary"
              onClick={() => onTogglePage(false)}
            >
              Back to Login
            </Button>

            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: "10px" }}
            >
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
