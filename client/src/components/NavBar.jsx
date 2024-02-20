import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Logo from './logo.png'; // Import your logo image

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light" className='Container-fluid'>
      <Container>
        <Navbar.Brand href="#home">
          <img
            src='https://plus.unsplash.com/premium_photo-1661277695409-0cc85f3b8a00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            height="30"
            className="d-inline-block align-top"
          />
          {' Moringa Pair'}
        </Navbar.Brand>
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
