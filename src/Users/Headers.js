import React from "react";
import Navbar from "../components/ui/Nav";
import { motion } from "framer-motion";

const Headers = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden overflow-y-auto">
      <div className="absolute bottom-0 left-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://i.pinimg.com/736x/04/1f/ba/041fbadb467da97fec8049ad56c908f2.jpg"
          alt="background"
        />
      </div>

      <div className="relative w-full h-full bg-[rgb(6,4,52)] bg-opacity-95">
        <Navbar />
        <section className="h-[90%] w-full pt-20 sm:px-20 bg-gradient-to-br from-[rgb(5,4,48)] to-[#202566] text-white font-sans flex items-center justify-center">
          <div className="sm:w-3/4 w-full bg-white/5 backdrop-blur-lg h-full p-3 rounded-lg flex sm:flex-row justify-center sm:justify-between items-center shadow-lg flex-col gap-5 sm:gap-0">
            <motion.div
              className="bg-white/10 sm:w-2/6 p-4 sm:h-full h-2/3 rounded-lg shadow-lg w-full flex flex-col items-center justify-center gap-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg font-semibold mb-1">Latest Insights</p>
              <p className="text-sm text-white/80">
                Discover quick reads on digital trends, groundbreaking AI
                innovations, and the evolving landscape of smart, connected
                living that’s redefining how we experience the world.
              </p>

              <button className="mt-4 bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2 rounded-full text-sm font-medium hover:opacity-45 transition">
                Browse Blog
              </button>
            </motion.div>

            {/* Main Featured Blog */}
            <motion.div
              className="bg-white/10 sm:w-4/6 p-6 sm:h-full h-1/2 rounded-lg shadow-lg w-full flex flex-col justify-between"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xl sm:text-2xl text-center font-bold mb-1">
                  How Technology is Reshaping Our Lives
                </p>
              </motion.div>
              <motion.div
                className="w-full h-70 rounded-md overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <img
                  src="https://i.pinimg.com/736x/90/56/d3/9056d37cff0fcead7492b2a4fb4b01cf.jpg"
                  alt="Tech Future"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Headers;
