import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../styles.css';

const SignUp = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4" style={{ backgroundColor: '#f2f2f2' }}>
            <h1 className="text-center mb-4">Sign Up Here</h1>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" size="lg" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address" size="lg" />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" size="lg" />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm your password" size="lg" />
              </Form.Group>

              <Button variant="primary" type="submit" block className="mt-4"> 
                Sign Up
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;


