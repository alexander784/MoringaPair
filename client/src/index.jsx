import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { StudentsProvider } from "./context/studentsContext";
import { PairsProvider } from "./context/pairsContext";
import { AuthProvider } from "./context/authContext";
import "./styles.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <PairsProvider>
          <StudentsProvider>
            <App />
          </StudentsProvider>
        </PairsProvider>
      </BrowserRouter>
    </AuthProvider>
  </>
);
