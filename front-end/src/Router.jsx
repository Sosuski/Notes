import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Add" element={<Add />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
