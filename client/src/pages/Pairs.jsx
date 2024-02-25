import React from "react";
import Pair from "../components/Pair";
import LinearColor from "../components/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalPairsContext } from "../context/pairsContext";

const Pairs = () => {
  // provide PairsContext
  const { pairsState, dispatchForPairs } = useGlobalPairsContext();

  const notify = () => toast("Generating Pairs 👨‍🎓👩‍🎓");

  const generateRandomPairs = () => {
    // loading
    dispatchForPairs({ type: "FETCH_REQUEST" });

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
          setTimeout(() => {
            // data
            dispatchForPairs({ type: "FETCH_SUCCESS", payload: data.pairs });
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Error in generating random pairs", err);
        // error
        dispatchForPairs({ type: "FETCH_FAILURE", payload: err });
      });
  };

  if (pairsState.loading) {
    return <LinearColor />;
  }

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
        {pairsState.pairs &&
          pairsState.pairs.map((pair) => {
            return <Pair key={pair.id} {...pair} />;
          })}
      </div>
    </div>
  );
};

export default Pairs;
