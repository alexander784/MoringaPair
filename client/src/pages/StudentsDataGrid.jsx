import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "user_id", headerName: "Technical Mentor", width: 130 },
  { field: "pair_id", headerName: "Pair", width: 130 },
  { field: "created_at", headerName: "Created At", width: 130 },
  { field: "updated_at", headerName: "Updated At", width: 130 },
];

export default function StudentsDataGrid() {
  const [rows, setRows] = useState([]);

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
          setRows(data);
        }
      })
      .catch((err) => {
        console.log("Error in fetching students", err);
      });
  }, []);

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
    </div>
  );
}
