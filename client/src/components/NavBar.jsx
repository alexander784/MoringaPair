import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light" className='Container-fluid'>
      <Container>
        <Navbar.Brand href="#home">Moringa Pair</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">About US</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
          <Nav.Link href="#services">Services</Nav.Link>
          </Nav>

          <Row>
          <Col>
          <Nav.Link href="#students">Students</Nav.Link>
          </Col>
          <Col>
          <Nav.Link href="#pairgroup">Pair Group</Nav.Link>
          </Col>
          <Col>
        
            <Nav.Link href="#login">Login</Nav.Link>
          </Col>
          <Col>
            <Nav.Link href="#signup">SignUp</Nav.Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavBar;
