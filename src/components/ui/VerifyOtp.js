import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const VerifyOtp = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await axios.post(
        `https://qurioans.onrender.com/qurioans/verifyotp/${userId}`,
        { otp },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(res.data.message);
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "OTP verification failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://v1.pinimg.com/videos/mc/expMp4/33/16/fc/3316fceb96c4ac949ec7d67697e5338b_t1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-[#0a0a23cc] border border-pink-400 rounded-xl shadow-lg p-10 w-full max-w-md mx-4"
      >
        <h2 className="text-3xl font-bold text-pink-400 mb-6 text-center tracking-wide">
          Verify OTP
        </h2>
        <p className="text-pink-300 mb-6 text-center text-sm select-none">
          Please enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-transparent border border-pink-400 placeholder-pink-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 text-center text-lg tracking-widest"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-75 transition text-black font-semibold py-3 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-green-400 font-semibold select-none">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-6 text-center text-red-500 font-semibold select-none">
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
