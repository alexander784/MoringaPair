import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles.css";
import Button from "react-bootstrap/Button";
import OffCanvas from "./OffCanvas";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";

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
    return <OffCanvas show={show} handleClose={handleClose} />;
  }

  return (
    <Navbar
      className="navbar Container-fluid sticky-top"
      bg="light"
      data-bs-theme="light"
    >
      <Container>
        {/* logo */}
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://logowik.com/content/uploads/images/pair7968.jpg"
            height="35"
            width="35px"
            style={{
              borderRadius: "50%",
              marginRight: "0.5rem",
              border: "1px solid #333",
            }}
            className="d-inline-block align-top"
            alt="Moringa Pair"
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
        </Navbar.Brand>

        {/* navigation links */}
        <Row className="nav-links">
          {localStorage.getItem("access_token") && (
            <Col>
              <NavLink
                style={navLinkStyles}
                to="/students"
                className="nav-link"
              >
                Students
              </NavLink>
            </Col>
          )}
          {localStorage.getItem("access_token") && (
            <Col>
              <NavLink style={navLinkStyles} to="/pairs" className="nav-link">
                Pairs
              </NavLink>
            </Col>
          )}
          {!localStorage.getItem("access_token") && (
            <Col>
              <NavLink style={navLinkStyles} to="/signup" className="nav-link">
                Signup
              </NavLink>
            </Col>
          )}
          {!localStorage.getItem("access_token") && (
            <Col>
              <NavLink style={navLinkStyles} to="/login" className="nav-link">
                Login
              </NavLink>
            </Col>
          )}
          {/* conditionally render profile == show if logged in */}
          {localStorage.getItem("access_token") && (
            <Col>
              <Profile />
            </Col>
          )}
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
