import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearColor from "../components/LinearProgress";
import Button from "react-bootstrap/Button";
import AddNewStudentModal from "../components/AddNewStudentModal";
import UpdateStudentModal from "../components/UpdateStudentModal";
import { useGlobalStudentsContext } from "../context/studentsContext";
import DeleteStudentModal from "../components/DeleteStudent";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "user_id", headerName: "Technical Mentor", width: 130 },
  { field: "pair_id", headerName: "Pair", width: 130 },
  { field: "created_at", headerName: "Created At", width: 130 },
  { field: "updated_at", headerName: "Updated At", width: 130 },
  { field: "actions", headerName: "Actions", width: 130 },
];

export default function StudentsDataGrid() {
  // provide StudentsContext
  const { studentsState, dispatchForStudents } = useGlobalStudentsContext();

  // state for handling AddNewStudentModal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // state for handling UpdateStudentModal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  
  // state for handling DeleteStudentModal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  useEffect(() => {
    // loading
    dispatchForStudents({ type: "FETCH_REQUEST" });

    // fetch API
    fetch("/api/students", {
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
        if (data) {
          setTimeout(() => {
            // data
            dispatchForStudents({ type: "FETCH_SUCCESS", payload: data });
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Error in fetching students", err);
        // error
        dispatchForStudents({ type: "FETCH_FAILURE", payload: err });
      });
  }, []);

  // Loading
  if (studentsState.loading) {
    return <LinearColor />;
  }

  // AddNewStudentModal
  if (show) {
    return (
      <AddNewStudentModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    );
  }

  // UpdateStudentModal
  if (showUpdateModal) {
    return (
      <UpdateStudentModal
        showUpdateModal={showUpdateModal}
        handleCloseUpdateModal={handleCloseUpdateModal}
        handleShowUpdateModal={handleShowUpdateModal}
      />
    );
  }

  // DeleteStudentModal
  if (showDeleteModal) {
    return (
      <DeleteStudentModal
        showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    );
  }

  return (
    <div style={{ height: 400, width: "100%", marginTop: "3rem" }}>
      <DataGrid
        rows={studentsState.students}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <div className="student-btns">
        <Button className="add-btn" onClick={handleShow}>
          Add Student
        </Button>
        <Button className="edit-btn" onClick={handleShowUpdateModal}>
          Edit Student
        </Button>
        <Button className="delete-btn" onClick={handleShowDeleteModal}>
          Delete Student
        </Button>
      </div>
    </div>
  );
}
