import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1>Oops, page not found! 😢</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back Home
      </button>
    </div>
  );
};

export default Error;
