import React, { useState } from "react";
import Pair from "../components/Pair";
import LinearColor from "../components/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pairs = () => {
  const notify = () => toast("Generating Pairs 👨‍🎓👩‍🎓");

  // state for generated pairs
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LinearColor />;
  }

  const generateRandomPairs = () => {
    // fetch API
    fetch("/api/create_pairs", {
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
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setPairs(data.pairs);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Error in generating random pairs", err);
      });
  };

  return (
    <div className="pairs-container">
      <button
        className="btn-gen-pair"
        onClick={() => {
          notify();
          generateRandomPairs();
        }}
      >
        Generate Pairs
      </button>
      <ToastContainer />

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
