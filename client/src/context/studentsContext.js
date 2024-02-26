import React, { useContext, useReducer } from "react";

// StudentsContext
const StudentsContext = React.createContext();

// StudentsProvider => distributor
const StudentsProvider = ({ children }) => {
  // initialStudentsState
  const initialStudentsState = {
    loading: false,
    students: [],
    error: "",
  };

  //   studentsReducer
  const studentsReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return {
          ...state,
          loading: true,
          students: [],
          error: "",
        };

      case "FETCH_SUCCESS":
        return {
          ...state,
          loading: false,
          students: action.payload,
          error: "",
        };

      case "FETCH_FAILURE":
        return {
          ...state,
          loading: false,
          students: [],
          error: action.payload,
        };

      case "ADD_STUDENT":
        return {
          ...state,
          loading: false,
          students: [...state.students, action.payload],
          error: "",
        };

      case "UPDATE_STUDENT":
        return {
          ...state,
          loading: false,
          students: [...state.students, action.payload],
          error: "",
        };

      default:
        return state;
    }
  };

  //   useReducer
  const [studentsState, dispatchForStudents] = useReducer(
    studentsReducer,
    initialStudentsState
  );

  return (
    <StudentsContext.Provider
      value={{
        studentsState,
        dispatchForStudents,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

// useGlobalStudentsContext => can be accessed globally
const useGlobalStudentsContext = () => {
  return useContext(StudentsContext);
};

export { StudentsProvider, useGlobalStudentsContext };
