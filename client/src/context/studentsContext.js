import React, { useContext } from "react";

// StudentsContext
const StudentsContext = React.createContext();

// StudentsProvider
const StudentsProvider = ({ children }) => {
  return <StudentsContext.Provider>{children}</StudentsContext.Provider>;
};

// useGloablStudentsContext => can be accessed globally
const useGlobalStudentsContext = () => {
  return useContext(StudentsContext);
};

export { StudentsProvider, useGlobalStudentsContext };
