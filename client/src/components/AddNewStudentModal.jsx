import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddNewStudentModal({show, handleClose, handleShow}) {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
      console.log(values);
      resetForm();
    },
  });

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

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
              variant="primary"
              // onClick={handleClose}
              disabled={!formik.isValid}
              type="submit"
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button
            variant="primary"
            // onClick={handleClose}
            disabled={!formik.isValid}
            type="submit"
          >
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewStudentModal;