import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </>
  );
};

export default App;
