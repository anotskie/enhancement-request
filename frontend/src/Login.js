import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Register from "./Register"; // Import the Register component
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { loginUser } from "./components/APIService";
import App from "./App";
import Forums from "./components/Forum/Discussion";

function Login() {
  const [showRegister, setShowRegister] = useState(false); // State to track which page to show
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const togglePage = () => {
    setShowRegister(!showRegister);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      console.log(response);
      if (response.token) {
        // Successful login, set login status to true
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (loggedIn) {
    return <Forums />;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#87CEEB" }}
    >
      {showRegister ? (
        <Register onTogglePage={togglePage} />
      ) : (
        <Card
          className="p-3"
          style={{ backgroundColor: "#FFF", width: "30rem" }}
        >
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <EmailIcon style={{ marginRight: "10px" }} />
                Email address
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <PasswordIcon style={{ marginRight: "10px" }} />
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="outline-primary" onClick={togglePage}>
                {showRegister ? "Back to Login" : "Register"}
              </Button>

              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "10px" }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </div>
  );
}

export default Login;
