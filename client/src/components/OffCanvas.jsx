import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalAuthContext } from "../context/authContext";

// inline props destructuring
export default function OffCanvas({ name, show, handleClose, ...props }) {
  const { authState, dispatchForAuthState } = useGlobalAuthContext();

  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const notify = () => toast("Logged out successfully!");

  // setting styles based on isActive boolean flag
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: "none",
      color: isActive ? "#f77f00" : "#333",
    };
  };

  // for programmatic navigation
  const navigate = useNavigate();

  // function to log out user
  const handleLogout = () => {
    console.log("Logout");
    // fetch API
    fetch("https://moringapair-tx15.onrender.com/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);

        // clear localStorage upon logout
        if (data.message) {
          notify();
          localStorage.clear();
          dispatchForAuthState({ type: "LOGOUT_USER" });
        }
      })
      .catch((err) => {
        console.log("Error in logging out user", err);
      });
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
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
            </Navbar.Brand>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          {/* navigation links */}
          {localStorage.getItem("access_token") && (
            <NavLink
              className="offcanvas-link"
              to="/students"
              style={navLinkStyles}
            >
              Students
            </NavLink>
          )}
          {localStorage.getItem("access_token") && (
            <NavLink
              className="offcanvas-link"
              to="/pairs"
              style={navLinkStyles}
            >
              Pairs
            </NavLink>
          )}
          {!localStorage.getItem("access_token") && (
            <NavLink
              className="offcanvas-link"
              to="/signup"
              style={navLinkStyles}
            >
              Sign up
            </NavLink>
          )}
          {!localStorage.getItem("access_token") && (
            <NavLink
              className="offcanvas-link"
              to="/login"
              style={navLinkStyles}
            >
              Login
            </NavLink>
          )}
          {/* conditionally render logout == show if logged in */}
          {localStorage.getItem("access_token") && (
            <NavLink
              className="offcanvas-link"
              onClick={() => {
                handleLogout();
              }}
              style={navLinkStyles}
            >
              Logout
            </NavLink>
          )}
          <ToastContainer />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
