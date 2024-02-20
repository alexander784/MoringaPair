import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Test from "./components/Test"

const App = () => {
  return (
    <>
      <NavBar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/test" element={<Test />} /> */}
        
      </Routes>
    </>
  );
};

export default App;
