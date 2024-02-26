import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalStudentsContext } from "../context/studentsContext";

function DeleteStudentModal({ showUpdateModal, handleCloseUpdateModal }) {
  const { studentsState, dispatchForStudents } = useGlobalStudentsContext();

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const notify = () => toast("Student updated successfully!");

  const formik = useFormik({
    initialValues: {
      studentId: "",
    },
    validationSchema: Yup.object({
      studentId: Yup.string().required("Student ID required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Deleted Student", values);

      // fetch API
      fetch(`/api/students/${values.studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
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
            dispatchForStudents({ type: "DELETE_STUDENT"});
          }
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
          <Modal.Title>Delete Existing Student</Modal.Title>
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

            <Button
              className="delete-btn"
              onClick={notify}
              disabled={!formik.isValid}
              type="submit"
            >
              Delete Student
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

export default DeleteStudentModal;
