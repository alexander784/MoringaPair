import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const notify = () => toast("Signed up successfully!");

  // formik => 3 args
  const formik = useFormik({
    // initialValue
    initialValues: {
      full_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },

    // validationSchema
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full name required"),
      username: Yup.string().required("Username required"),
      email: Yup.string()
        .required("Email required")
        .email("Invalid email format"),
      password: Yup.string()
        .required("Password required")
        .min(8, "Password must be atleast 8 characters")
        .max(16, "Password must not exceed 16 characters"),
      confirm_password: Yup.string()
        .required("Confirm Password required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),

    // onSubmit
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      // fetch API
      fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            resetForm();
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          navigate("/Login");
        })
        .catch((err) => {
          console.log("Error in registering user", err);
        });
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card
            className="signup-form p-4"
            style={{ backgroundColor: "#f2f2f2" }}
          >
            <h1 className="text-center mb-4">Sign Up</h1>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  size="lg"
                  name="full_name"
                  id="full_name"
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
              </Form.Group>
              {formik.touched && formik.errors.full_name ? (
                <div className="error">{formik.errors.full_name}</div>
              ) : null}

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
                  autoComplete="off"
                />
              </Form.Group>
              {formik.touched && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}

              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  size="lg"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
              </Form.Group>
              {formik.touched && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
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
                  autoComplete="off"
                />
              </Form.Group>
              {formik.touched && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}

              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  size="lg"
                  name="confirm_password"
                  id="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
              </Form.Group>
              {formik.touched && formik.errors.confirm_password ? (
                <div className="error">{formik.errors.confirm_password}</div>
              ) : null}

              <Button
                variant="primary"
                type="submit"
                block
                className="mt-4 signup-btn"
                onClick={notify}
              >
                Sign Up Now
              </Button>
              <ToastContainer />
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
