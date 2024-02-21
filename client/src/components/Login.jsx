import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "../styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  // formik
  const formik = useFormik({
    // initialValue
    initialValues: {
      username: "",
      password: "",
    },

    // validationSchema
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string()
        .required("Password required")
        .min(8, "Password must be atleast 8 characters")
        .max(16, "Password must not exceed 16 characters"),
    }),

    // onSubmit
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4" style={{ backgroundColor: "#f2f2f2" }}>
            <h1 className="text-center mb-4">Login</h1>
            <Form onSubmit={formik.handleSubmit}>
              
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  size="lg"
                  name="username"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              {formik.touched && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  size="lg"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </Form.Group>
              {formik.touched && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}

              <Button variant="primary" type="submit" block className="mt-3">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>{" "}
              {/* Link to Forgot Password page */}
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
