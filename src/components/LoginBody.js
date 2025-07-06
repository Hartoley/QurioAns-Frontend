// AdminLogin.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashNav from "../components/ui/DashNav";
import Footer from "../components/ui/Footer";
import Navbar from "./ui/Nav";

const LoginBody = ({ showSignup = false }) => {
  // Added showSignup prop with default value
  const [isLogin, setIsLogin] = useState(!showSignup); // Initialize based on prop
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://qurioans.onrender.com/qurioans/signin",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      alert(res.data.message);
      localStorage.setItem("QurioUser", res.data.id);
      navigate(`/dashboard/${res.data.id}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://qurioans.onrender.com/qurioans/signup",
        formData
      );
      alert(res.data.message);
      const userId = res.data.userId;
      navigate(`/verifyotp/${userId}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ userName: "", email: "", password: "" });
  };

  return (
    <>
      <Navbar />

      <div className="mt-16 relative flex items-center justify-center sm:h-[90vh] h-[75vh] bg-black overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://v1.pinimg.com/videos/mc/expMp4/33/16/fc/3316fceb96c4ac949ec7d67697e5338b_t1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Form Container */}
        <div className="relative z-10 sm:h-[85vh] h-[70vh] bg-[#0a0a23cc] border border-pink-400 rounded-xl shadow-lg p-10 w-full max-w-md mx-4">
          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 rounded-xl">
              <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <p className="text-3xl font-bold text-pink-400 mb-8 text-center tracking-wide">
            {isLogin ? "Welcome Back" : "Create Account"}
          </p>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-45 transition text-white font-semibold py-3 rounded-lg"
                >
                  Login
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                onSubmit={handleSignup}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-45 transition text-white font-semibold py-3 rounded-lg"
                >
                  Sign Up
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-6 text-center text-pink-300 text-sm select-none">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="underline hover:text-pink-500 font-semibold focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginBody;
