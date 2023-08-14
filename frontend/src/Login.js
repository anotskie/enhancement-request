import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Register from './Register'; // Import the Register component
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

function Login() {
  const [showRegister, setShowRegister] = useState(false); // State to track which page to show

  const togglePage = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor:'#87CEEB' }}>
      {showRegister ? <Register onTogglePage={togglePage} /> : (
        <Card className="p-3" style={{backgroundColor:'#87CEEB', width: '30rem'}}>
        <Form >
            
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><EmailIcon style={{marginRight:'10'}}/>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><PasswordIcon style={{marginRight:'10'}}/>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Login
          </Button>
          
          <Button variant="link" onClick={togglePage}>
            {showRegister ? 'Back to Login' : 'Register'}
          </Button>
        </Form>
        </Card>
      )}
    </div>
  );
}

export default Login;
