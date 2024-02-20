import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles.css';

const Home = () => {
  return (
    <Container className="welcome-container">
      <Row>
        <Col>
          <h2>Welcome to Moringa Pair!</h2>
          <p>
            Fed up with manually pairing students and tracking pairs?<br></br>
            Say farewell to the hassle with MoringaPair  the game-changer for effortless student pairing!
          </p>
        </Col>
        <Col>
          <img src="https://plus.unsplash.com/premium_photo-1661277695409-0cc85f3b8a00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Welcome" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
