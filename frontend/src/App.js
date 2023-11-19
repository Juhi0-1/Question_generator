import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Questions from "./components/Questions";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paper" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
