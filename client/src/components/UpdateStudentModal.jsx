import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateStudentModal({ showUpdateModal, handleCloseUpdateModal }) {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const notify = () => toast("Student updated successfully!");

  const formik = useFormik({
    initialValues: {
      studentId: "",
      name: "",
      email: "",
      user_id: "",
    },
    validationSchema: Yup.object({
      studentId: Yup.string().required("Student ID required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
      user_id: Yup.string().required("TM ID is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Updated Student", values);

      // fetch API
      fetch(`/api/students/${values.studentId}`, {
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
        })
        .catch((err) => {
          console.log("Error in adding student", err);
        });
    },
  });

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Existing Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="input"
                placeholder="Student ID"
                autoFocus
                name="studentId"
                value={formik.values.studentId}
                onChange={formik.handleChange}
              />
            </Form.Group>
            {formik.touched && formik.errors.studentId ? (
              <div className="error">{formik.errors.studentId}</div>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="John Doe"
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
              className="edit-btn"
              onClick={notify}
              disabled={!formik.isValid}
              type="submit"
            >
              Save Changes
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateStudentModal;
