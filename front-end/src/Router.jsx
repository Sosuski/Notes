import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Manage from "./components/Manage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Add" element={<Add />}></Route>
        <Route path="/Manage" element={<Manage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
