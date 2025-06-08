import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import QurioAns from "./Users/QurioAns";
import Login from "./Users/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QurioAns />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
