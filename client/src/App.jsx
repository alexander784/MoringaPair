import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import StudentsDataGrid from "./pages/StudentsDataGrid";
import Pairs from "./pages/Pairs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Account from "./pages/Account";
import Test from "./components/Test";

const App = () => {
  return (
    <>
      {/* appears on all pages */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/students" element={<StudentsDataGrid />} />
        <Route path="/pairs" element={<Pairs />} />
        <Route path="/*" element={<Error />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
