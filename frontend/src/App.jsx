import { React } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Stocks from "./components/Stocks";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
