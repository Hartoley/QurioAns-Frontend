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
import CreateBlog from "./components/ui/CreateBlog";
import DisplayBlog from "./components/ui/DisplayBlog";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<QurioAns />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/signup" element={<Login showSignup={true} />} />
        <Route
          path="/admin/signup"
          element={<AdminLogin showSignup={true} />}
        />
        <Route path="/dashboard/:userId" element={<UserDash />} />
        <Route path="/blog/:blogId" element={<BlogEditor />} />
        <Route path="/admin/dashboard/:adminId" element={<Admin />} />
        <Route path="/verifyotp/:userId" element={<Verify />} />
        <Route path="/blog/:title/:id/:userId" element={<DisplayBlog />} />
      </Routes>
    </>
  );
}

export default App;
