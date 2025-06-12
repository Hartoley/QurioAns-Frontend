import React from "react";
import fblogo from "../../Images/1d3db940e03e1b44e795aad98ab747b1-removebg-preview.png";
import ytLogo from "../../Images/ytLogo.png";
import xLogo from "../../Images/xlogo.png";
import instaLogo from "../../Images/insta.png";
import logo from "../../Images/cover-removebg-preview.png";

export default function Footer() {
  return (
    <footer className="p-1 w-full h-auto md:h-[80vh] bg-[#0a0a23] text-white flex justify-center items-center">
      <div className="w-[85%] h-[99%] flex flex-col items-center">
        {/* Top Section */}
        <div className="w-full h-[15vh] md:h-[25%] flex items-center justify-between">
          <div className="w-1/3 h-10 flex gap-2 items-center cursor-pointer text-purple-400">
            <img src={logo} className="w-10 h-10 rounded-full" alt="logo" />
          </div>

          {/* Social Icons */}
          <div className="w-100 h-10 flex items-center justify-end gap-3">
            <SocialIcon src={fblogo} alt="Facebook" />
            <SocialIcon src={instaLogo} alt="Instagram" />
            <SocialIcon src={xLogo} alt="X (Twitter)" />
            <SocialIcon src={ytLogo} alt="YouTube" />
          </div>
        </div>

        {/* Middle Section */}
        <div className="w-full h-[60%] pt-4 border-t-[1.5px] border-b-[1.5px] flex justify-between items-center border-white/10">
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {/* Column 1 */}
            <FooterColumn
              title="BlogSphere"
              links={["About Us", "Home", "Articles", "Newsletter"]}
            />

            {/* Column 2 */}
            <FooterColumn
              title="Categories"
              links={["Tech", "Lifestyle", "Fitness", "Finance"]}
            />

            {/* Column 3 */}
            <FooterColumn
              title="Resources"
              links={["FAQs", "Start Writing", "Terms", "Privacy Policy"]}
            />

            {/* Column 4 + 5 */}
            <div className="h-full py-3 flex flex-col gap-3 md:col-span-2">
              <p className="text-white font-bold hover:text-purple-400 cursor-pointer">
                Subscribe to Newsletter
              </p>
              <div className="w-full h-3/5 bg-[#1a1a3c] rounded-4xl flex flex-col gap-2 p-5">
                <p className="text-gray-400 text-sm font-light">Email</p>
                <div className="w-full flex items-center h-[15vh] sm:h-3/4 gap-1">
                  <input
                    className="w-4/5 h-8 rounded-4xl px-4 text-sm border-2 outline-none border-gray-600 focus:border-purple-500 bg-transparent text-gray-300 placeholder-gray-400"
                    type="email"
                    placeholder="your@email.com"
                  />
                  <div className="w-20 h-8 bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-45 text-white flex justify-center items-center rounded-md cursor-pointer">
                    Send
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full h-[10vh] sm:h-[15%] flex items-center justify-end pt-4">
          <p className="text-gray-500 text-sm font-light cursor-pointer hover:text-purple-400">
            © BlogSphere, 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Reusable Link Component
function FooterLink({ label }) {
  return (
    <p className="text-gray-400 text-sm font-light cursor-pointer hover:text-purple-400">
      {label}
    </p>
  );
}

// Reusable Column
function FooterColumn({ title, links }) {
  return (
    <div className="h-full py-3 flex flex-col gap-3">
      <p className="text-white font-bold hover:text-purple-400 cursor-pointer">
        {title}
      </p>
      {links.map((link, i) => (
        <FooterLink key={i} label={link} />
      ))}
    </div>
  );
}

// Reusable Social Icon
function SocialIcon({ src, alt }) {
  return (
    <div className="w-8 h-8 bg-white hover:bg-purple-500 flex items-center justify-center rounded-full">
      <img src={src} alt={alt} className="w-5 h-5 object-contain" />
    </div>
  );
}
