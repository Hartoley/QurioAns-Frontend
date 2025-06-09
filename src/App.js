import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import QurioAns from "./Users/QurioAns";
import Login from "./Users/Login";
import VerifyOtp from "./components/ui/VerifyOtp";
import Verify from "./Users/Verify";
import UserDash from "./Users/UserDash";
import AdminDash from "./components/ui/AdminDash";
import Admin from "./Admin/Admin";
import BlogEditor from "./Admin/Blog";
import AdminLogin from "./Admin/AdminLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QurioAns />} />
        <Route path="/login" element={<Login />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="/dashboard/:userId" element={<UserDash />} />
        <Route path="/blog/:blogId" element={<BlogEditor />} />
        <Route path="/admin/dashboard/:adminId" element={<Admin />} />
        <Route path="/verifyotp/:userId" element={<Verify />} />
      </Routes>
    </>
  );
}

export default App;
