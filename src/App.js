import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import QurioAns from "./Users/QurioAns";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QurioAns />} />
      </Routes>
    </>
  );
}

export default App;
