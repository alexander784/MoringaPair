import React from "react";
import Table from "react-bootstrap/Table";

function Test() {
  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      user_id: 101,
      pair_id: 201,
      created_at: "2024-02-21T12:00:00Z",
      updated_at: "2024-02-21T12:30:00Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      user_id: 102,
      pair_id: 202,
      created_at: "2024-02-21T13:00:00Z",
      updated_at: "2024-02-21T13:45:00Z",
    },
  ];

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>User ID</th>
          <th>Pair ID</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={student.id}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.user_id}</td>
            <td>{student.pair_id}</td>
            <td>{student.created_at}</td>
            <td>{student.updated_at}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Test;
