import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import StudentsDataGrid from "./pages/StudentsDataGrid";
import ContactUs from "./pages/Contact";
import Pairs from "./pages/Pairs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";

const App = () => {
  return (
    <>
      {/* appears on all pages */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/students" element={<StudentsDataGrid />} />
        <Route path="/pairs" element={<Pairs />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
