import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

// inline props destructuring
export default function OffCanvas({ name, show, handleClose, ...props }) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: "none",
      color: isActive ? "#f77f00" : "#333",
    };
  };

  // for programmatic navigation
  const navigate = useNavigate();

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button> */}
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
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
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          <NavLink className="offcanvas-link" to="/about" style={navLinkStyles}>
            About
          </NavLink>
          <NavLink
            className="offcanvas-link"
            to="/contacts"
            style={navLinkStyles}
          >
            Contacts
          </NavLink>
          <NavLink
            className="offcanvas-link"
            to="/students"
            style={navLinkStyles}
          >
            Students
          </NavLink>
          <NavLink className="offcanvas-link" to="/pairs" style={navLinkStyles}>
            Pairs
          </NavLink>
          <NavLink
            className="offcanvas-link"
            to="/signup"
            style={navLinkStyles}
          >
            Sign up
          </NavLink>
          <NavLink className="offcanvas-link" to="/login" style={navLinkStyles}>
            Login
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
