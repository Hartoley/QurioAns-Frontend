import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoginBody = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div className="mt-16 relative flex items-center justify-center sm:h-[90vh] h-[60vh] bg-black overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://v1.pinimg.com/videos/mc/expMp4/33/16/fc/3316fceb96c4ac949ec7d67697e5338b_t1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Form Container */}
      <div className="relative z-10 sm:h-[85vh] h-[55vh] bg-[#0a0a23cc] border border-pink-400 rounded-xl shadow-lg p-10 w-full max-w-md mx-4">
        <p className="text-3xl font-bold text-pink-400 mb-8 text-center tracking-wide">
          {isLogin ? "Welcome Back" : "Create Account"}
        </p>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-45 transition text-black font-semibold py-3 rounded-lg"
              >
                Login
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <input
                type="text"
                placeholder="Username"
                className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="password"
                placeholder="Password"
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
  );
};

export default LoginBody;
