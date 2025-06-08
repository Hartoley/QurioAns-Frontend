import React from "react";
import Navbar from "../components/ui/Nav";

const Headers = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden overflow-y-auto">
      {/* Background Image Positioned at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://i.pinimg.com/736x/04/1f/ba/041fbadb467da97fec8049ad56c908f2.jpg"
          alt="background"
        />
      </div>

      {/* Overlay with content */}
      <div className="relative w-full h-full bg-[rgb(6,4,52)] bg-opacity-95">
        <Navbar />
        <div className="h-[90%] pt-20 px-4">
          <div className="bg-red-400 w-full p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Hello World</h1>
            <h1 className="text-2xl font-bold mb-4">Hello World</h1>
            <h1 className="text-2xl font-bold mb-4">Hello World</h1>
            <h1 className="text-2xl font-bold mb-4">Hello World</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
