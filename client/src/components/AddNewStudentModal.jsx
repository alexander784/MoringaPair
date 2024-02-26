import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalStudentsContext } from "../context/studentsContext";

function AddNewStudentModal({ show, handleClose, handleShow }) {
  const { studentsState, dispatchForStudents } = useGlobalStudentsContext();

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const notify = () => toast("New student added successfully!");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      user_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
      user_id: Yup.string().required("TM ID is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("New student", values);

      // fetch API
      fetch("/api/students", {
        method: "POST",
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
            dispatchForStudents({ type: "ADD_STUDENT", payload: data });
          }
        })
        .catch((err) => {
          console.log("Error in adding student", err);
        });
    },
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="John Doe"
                autoFocus
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Form.Group>
            {formik.touched && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="john.doe@student.moringapair.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Form.Group>
            {formik.touched && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label>Technical Mentor Id</Form.Label>
              <Form.Control
                type="number"
                name="user_id"
                value={formik.values.user_id}
                onChange={formik.handleChange}
              />
            </Form.Group>
            {formik.touched && formik.errors.user_id ? (
              <div className="error">{formik.errors.user_id}</div>
            ) : null}

            <Button
              className="add-btn"
              onClick={notify}
              disabled={!formik.isValid}
              type="submit"
            >
              Add Student
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewStudentModal;
