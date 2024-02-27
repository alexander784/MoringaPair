import React, { useContext, useReducer } from "react";

// AuthContext
const AuthContext = React.createContext();

// AuthProvider
const AuthProvider = ({ children }) => {
  // initialAuthState
  const initialAuthState = {
    loading: false,
    currentUser: [],
    error: "",
  };

  //   authReducer
  const authReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return {
          ...state,
          loading: true,
          currentUser: [],
          error: "",
        };

      case "FETCH_SUCCESS":
        return {
          ...state,
          loading: false,
          currentUser: action.payload,
          error: "",
        };

      case "FETCH_FAILURE":
        return {
          ...state,
          loading: false,
          currentUser: [],
          error: action.payload,
        };

      default:
        return state;
    }
  };

  //   useReducer
  const [authState, dispatchForAuthState] = useReducer(
    authReducer,
    initialAuthState
  );

  return (
    <AuthContext.Provider
      value={{
        authState,
        dispatchForAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useGlobalAuthContext => can be accessed globally
const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useGlobalAuthContext };
