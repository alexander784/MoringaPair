import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp"; // Import SignUp component
import Test from "./pages/Test";
import StudentsDataGrid from "./pages/StudentsDataGrid";


const App = () => {
  return (
    <>
      <NavBar />

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact Us" element={<ContactUs />} />
        <Route path="/About Us" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} /> {/* Added SignUp route */}

        <Route path="/test" element={<Test />} />
        <Route path="/students" element={<StudentsDataGrid />} />

      </Routes>
    </>
  );
};

export default App;

