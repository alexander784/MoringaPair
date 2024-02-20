import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import ContactUs from "../src/pages/Contact Us";

const App = () => {
  return (
    <>
      <NavBar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        
      </Routes>
    </>
  );
};

export default App;
