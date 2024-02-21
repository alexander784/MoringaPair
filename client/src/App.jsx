import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import ContactUs from "../src/pages/Contact Us";
import AboutUs from "./pages/About Us";
import Login from "./components/Login";
import SignUp from "./components/SignUp"; // Import SignUp component

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
      </Routes>
    </>
  );
};

export default App;

