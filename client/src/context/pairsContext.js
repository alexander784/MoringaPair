import React, { useContext, useReducer } from "react";

// PairsContext
const PairsContext = React.createContext();

// PairsProvider
const PairsProvider = ({ children }) => {
  // initialPairsState
  const initialPairsState = {
    loading: true,
    pairs: [],
    error: "",
  };

  //   pairsReducer
  const pairsReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return {
          ...state,
          loading: true,
          pairs: [],
          error: "",
        };

      case "FETCH_SUCCESS":
        return {
          ...state,
          loading: false,
          pairs: action.payload,
          error: "",
        };

      case "FETCH_FAILURE":
        return {
          ...state,
          loading: false,
          pairs: [],
          error: action.payload,
        };

      default:
        return state;
    }
  };

  //   useReducer
  const [pairsState, dispatchForpairs] = useReducer(
    pairsReducer,
    initialPairsState
  );

  return (
    <PairsContext.Provider
      values={{
        pairsState,
        dispatchForpairs,
      }}
    >
      {children}
    </PairsContext.Provider>
  );
};

// useGloablPairsContext => can be accessed globally
const useGlobalPairsContext = () => {
  return useContext(PairsContext);
};

export { PairsProvider, useGlobalPairsContext };
