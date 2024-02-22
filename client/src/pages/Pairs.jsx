import React, { useState } from "react";
import Pair from "../components/Pair";

const Pairs = () => {
  // state for generated pairs
  const [pairs, setPairs] = useState([]);

  const generateRandomPairs = () => {
    // fetch API
    fetch("http://127.0.0.1:5000/api/create_pairs", {
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
        if (data.pairs) {
          setPairs(data.pairs);
        }
      })
      .catch((err) => {
        console.log("Error in generating random pairs", err);
      });
  };

  return (
    <div className="pairs-container">
      <button className="btn-gen-pair" onClick={generateRandomPairs}>
        Generate Pairs
      </button>

      <div className="pair-cards">
        {pairs &&
          pairs.map((pair) => {
            return <Pair key={pair.id} {...pair} />;
          })}
      </div>
    </div>
  );
};

export default Pairs;
