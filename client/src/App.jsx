import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./components/Login";
import Students from "./pages/Students";
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact Us" element={<Contact />} />
        <Route path="/about Us" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </>
  );
};

export default App;
