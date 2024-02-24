import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles.css";
import Button from "react-bootstrap/Button";
import OffCanvase from "./OffCanvas";
import MenuIcon from "@mui/icons-material/Menu";


const NavBar = () => {
  // state for handling OffCanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for programmatic navigation
  const navigate = useNavigate();

  // setting styles based on isActive boolean flag
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
      color: isActive ? "#f77f00" : "#333",
    };
  };

  if (show) {
    return <OffCanvase show={show} handleClose={handleClose} />;
  }
  return (
    <Navbar
      className="navbar Container-fluid sticky-top"
      bg="light"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            // src="https://plus.unsplash.com/premium_photo-1661277695409-0cc85f3b8a00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            src="https://logowik.com/content/uploads/images/pair7968.jpg"
            height="35"
            width="35px"
            style={{
              borderRadius: "50%",
              marginRight: "0.5rem",
              border: "1px solid #333",
            }}
            className="d-inline-block align-top"
            alt=""
          />
          <span
            style={{
              fontWeight: "bold",
              color: "#333",
              fontSize: "1.2rem",
            }}
          >
            Moringa Pair
          </span>
          {/* Navigation links */}
        </Navbar.Brand>
        <Row className="nav-links">
          <Col>
            <NavLink style={navLinkStyles} to="/about" className="nav-link">
              About
            </NavLink>
          </Col>
          <Col>
            <NavLink style={navLinkStyles} to="/contacts" className="nav-link">
              Contact
            </NavLink>
          </Col>
          <Col>
            <NavLink style={navLinkStyles} to="/students" className="nav-link">
              Students
            </NavLink>
          </Col>
          <Col>
            <NavLink style={navLinkStyles} to="/pairs" className="nav-link">
              Pairs
            </NavLink>
          </Col>
          <Col>
            <NavLink style={navLinkStyles} to="/login" className="nav-link">
              Login
            </NavLink>
          </Col>
          <Col>
            <NavLink style={navLinkStyles} to="/signup" className="nav-link">
              Signup
            </NavLink>
          </Col>
        </Row>
        <Button
          style={{ backgroundColor: "#003049" }}
          onClick={handleShow}
          className="me-2 hamburger"
        >
          <MenuIcon />
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
