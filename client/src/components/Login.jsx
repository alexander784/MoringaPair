import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles.css';

const Login = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="form">
            <h1 className="text-center mb-4">Login Here</h1>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" size="lg" />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" size="lg" />
              </Form.Group>

              <Button variant="primary" type="submit" block className="mt-3"> 
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;




