import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalAuthContext } from "../context/authContext";

function UpdateUserModal({ showUpdateUserModal, handleCloseUpdateUserModal }) {
  const { dispatchForAuthState } = useGlobalAuthContext();

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const notify = () => toast("TM updated successfully!");

  const formik = useFormik({
    initialValues: {
      tmId: "",
      full_name: "",
      username: "",
      email: "",
    },
    validationSchema: Yup.object({
      tmId: Yup.string().required("Mentor ID required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Updated TM", values);

      // fetch API
      fetch(`https://moringapair-tx15.onrender.com/api/users/${values.tmId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
          if (data) {
            notify();
            dispatchForAuthState({ type: "FETCH_SUCCESS", payload: data });
          }
        })
        .catch((err) => {
          console.log("Error in updating TM", err);
        });
    },
  });

  return (
    <>
      <Modal show={showUpdateUserModal} onHide={handleCloseUpdateUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Mentor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mentor ID</Form.Label>
              <Form.Control
                type="input"
                placeholder="Mentor ID"
                autoFocus
                name="tmId"
                value={formik.values.tmId}
                onChange={formik.handleChange}
              />
            </Form.Group>
            {formik.touched && formik.errors.tmId ? (
              <div className="error">{formik.errors.tmId}</div>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="John Doe"
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="input"
                placeholder="johndoe"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="john.doe@moringaschool.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Button
              className="edit-btn"
              disabled={!formik.isValid}
              type="submit"
            >
              Save Changes
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateUserModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUserModal;
