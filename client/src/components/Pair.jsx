import React from "react";

// single Pair card
const Pair = ({ id, student1, student2, user_id, week_number, created_at }) => {
  return (
    <div className="pair-card">
      <h5 className="pair-id">Pair: {id}</h5>
      <p className="student">
        <span>Student 1</span>: <span>{student1}</span>
      </p>
      <p className="student">
        <span>Student 2</span>: <span>{student2}</span>
      </p>
      <p className="tm">
        <span>Mentor</span>: <span>{user_id}</span>
      </p>
      <p className="week-number">
        <span>Pair for week</span>: <span>{week_number}</span>
      </p>
      <p className="created-at">
        <span>Created at</span>: <span>{created_at}</span>
        <span></span>
      </p>
    </div>
  );
};

export default Pair;
