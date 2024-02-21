import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import '../styles.css';

const Login = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4" style={{ backgroundColor: '#f2f2f2' }}>
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
            <div className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link> {/* Link to Forgot Password page */}
            </div>
            <div className="text-center mt-3">
              <Link to="/signup">Sign Up</Link> {/* Link to Sign Up page */}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>                  
  );
};

export default Login;





