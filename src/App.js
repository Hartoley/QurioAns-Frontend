import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import QurioAns from "./Users/QurioAns";
import Login from "./Users/Login";
import VerifyOtp from "./components/ui/VerifyOtp";
import Verify from "./Users/Verify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QurioAns />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyotp/:userId" element={<Verify />} />
      </Routes>
    </>
  );
}

export default App;
