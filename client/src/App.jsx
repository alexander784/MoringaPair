import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./components/Login";
import Test from "./pages/Test";
import StudentsDataGrid from "./pages/StudentsDataGrid";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact Us" element={<Contact />} />
        <Route path="/about Us" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/students" element={<StudentsDataGrid />} />
      </Routes>
    </>
  );
};

export default App;
