import React, { useState } from 'react';
import { Nav, Button, Col, Card} from 'react-bootstrap';

const SidebarMenu = () => {
  
  const getRandomMenuItems = () => {
    const itemCount = Math.floor(Math.random() * 10) + 1; 
    const menuItems = [];

    for (let i = 1; i <= itemCount; i++) {
      menuItems.push(
        <Nav.Link key={i} href={`#item${i}`}>
          Item {i}
        </Nav.Link>
      );
    }

    return menuItems;
  };

  const [menuItems, setMenuItems] = useState(getRandomMenuItems());

  
  const regenerateMenu = () => {
    setMenuItems(getRandomMenuItems());
  };

  return (
    <Card style={{ width: '8rem', marginRight: '1rem'}} className="text-center">
    <Col>
    <Button variant="primary" onClick={regenerateMenu} className="mt-3">
        Generate
      </Button>
      <Nav className="flex-column">
        {menuItems}
      </Nav>
      
    </Col>
    </Card>
  );
};

export default SidebarMenu;
