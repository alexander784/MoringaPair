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
      textDecoration: "none",
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
        <Offcanvas.Body className="offcanvas-body">
          <NavLink className="offcanvas-link" to="/about" style={navLinkStyles}>
            About
          </NavLink>
          <NavLink className="offcanvas-link" to="/contacts" style={navLinkStyles}>
            Contact
          </NavLink>
          <NavLink className="offcanvas-link" to="/students" style={navLinkStyles}>
            Student
          </NavLink>
          <NavLink className="offcanvas-link" to="/pairs" style={navLinkStyles}>
            Pairs
          </NavLink>
          <NavLink className="offcanvas-link" to="/signup" style={navLinkStyles}>
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
