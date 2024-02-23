import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
// import Contact from "./pages/Contact";
import About from "./pages/About";
import StudentsDataGrid from "./pages/StudentsDataGrid";
import ContactUs from "./pages/Contact";
import Pairs from "./pages/Pairs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Toast from "./components/Toast";
import Test from "./components/Test";


const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/students" element={<StudentsDataGrid />} />
        <Route path="/pairs" element={<Pairs />} />
        <Route path="/test" element={<Toast />} />
        <Route path="/test2" element={<Test />} />


      </Routes>
    </>
  );
};

export default App;
