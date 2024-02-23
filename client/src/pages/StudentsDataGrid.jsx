import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearColor from "../components/LinearProgress";
import Button from "react-bootstrap/Button";
import AddNewStudentModal from "../components/AddNewStudentModal";

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
  // state for handling AddNewStudentModal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // state for handling students
  const [rows, setRows] = useState([]);

  // state for handling loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setRows(data);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Error in fetching students", err);
      });
  }, []);

  // Loading
  if (loading) {
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

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <Button onClick={handleShow}>Add Student</Button>
    </div>
  );
}
