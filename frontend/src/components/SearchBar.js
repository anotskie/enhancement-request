import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SearchBar() {
  return (
    <Navbar className="">
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2 ml-2"
            />
          </Col>
          
        </Row>
        
           
          
      </Form>
      <Button inline type="submit" className="mr-2">Submit</Button>
    </Navbar>
        
    
  );
}

export default SearchBar;