import React from "react";
import fblogo from "../../Images/1d3db940e03e1b44e795aad98ab747b1-removebg-preview.png";
import ytLogo from "../../Images/ytLogo.png";
import xLogo from "../../Images/xlogo.png";
import instaLogo from "../../Images/insta.png";
import logo from "../../Images/cover-removebg-preview.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a23] text-white py-6 flex flex-col items-center gap-6">
      {/* Logo & Social Icons */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-[90%] max-w-5xl gap-4">
        <img src={logo} className="w-20 h-20 rounded-full" alt="logo" />
        <div className="flex gap-3">
          <SocialIcon src={fblogo} alt="Facebook" />
          <SocialIcon src={instaLogo} alt="Instagram" />
          <SocialIcon src={xLogo} alt="Twitter" />
          <SocialIcon src={ytLogo} alt="YouTube" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        {["Home", "Articles", "About", "Contact"].map((link, i) => (
          <p
            key={i}
            className="cursor-pointer hover:text-purple-400 transition-colors"
          >
            {link}
          </p>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-xs text-gray-500">
        © QurioAns, 2025. All rights reserved.
      </p>
    </footer>
  );
}

function SocialIcon({ src, alt }) {
  return (
    <div className="w-8 h-8 bg-white hover:bg-purple-500 flex items-center justify-center rounded-full transition-colors">
      <img src={src} alt={alt} className="w-4 h-4 object-contain" />
    </div>
  );
}
