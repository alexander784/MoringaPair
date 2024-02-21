import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import ContactUs from "../src/pages/Contact Us";
import AboutUs from "./pages/About";
const App = () => {
  return (
    <>
      <NavBar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />

      </Routes>
    </>
  );
};

export default App;
