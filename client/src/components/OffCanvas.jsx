import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";

// inline props destructuring
export default function OffCanvas({ name, show, handleClose, ...props }) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
      color: isActive ? "#f77f00" : "#333",
    };
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button> */}
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink to="/about" style={navLinkStyles}>
            About
          </NavLink>
          <NavLink to="/contacts" style={navLinkStyles}>
            Contact
          </NavLink>
          <NavLink to="/students" style={navLinkStyles}>
            Student
          </NavLink>
          <NavLink to="/pairs" style={navLinkStyles}>
            Pairs
          </NavLink>
          <NavLink to="/signup" style={navLinkStyles}>
            Sign up
          </NavLink>
          <NavLink to="/login" style={navLinkStyles}>
            Login
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
