import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../Images/cover-removebg-preview.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="fixed w-full top-0 z-10 bg-transparent text-white px-7">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <img src={logo} alt="Logo" className="h-14 w-20" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 items-center text-md font-bold">
          <li className="hover:text-purple-400 cursor-pointer">Our Story</li>
          <li className="hover:text-purple-400 cursor-pointer">Membership</li>
          <li className="hover:text-purple-400 cursor-pointer">Roadmaps</li>
          <li
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            className="relative cursor-pointer"
          >
            <span className="flex items-center hover:text-purple-400">
              Hotstar <ChevronDown size={16} className="ml-1" />
            </span>
            {dropdown && (
              <ul className="absolute top-6 bg-white text-black p-2 shadow rounded w-40 z-50">
                <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">
                  Series
                </li>
                <li className="hover:bg-gray-100 px-3 py-1 cursor-pointer">
                  Movies
                </li>
              </ul>
            )}
          </li>
          <li className="hover:text-purple-400 cursor-pointer">Fitness</li>
          <li className="hover:text-purple-400 cursor-pointer">Blog</li>
          <li className="hover:text-purple-400 cursor-pointer">Sign in</li>
        </ul>

        {/* CTA Button */}
        <button className="hidden md:block bg-gradient-to-r from-pink-500 to-orange-400  hover:opacity-45 text-white px-4 py-2 rounded-full text-sm font-semibold">
          Get Started
        </button>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a23]/90 text-white px-4 pb-6 space-y-2">
          {[
            "Home",
            "Space",
            "Roadmaps",
            "Hotstar",
            "Fitness",
            "Blog",
            "Uncover",
          ].map((item, i) => (
            <div key={i} className="py-2 border-b border-white/10">
              {item}
            </div>
          ))}
          <button className="w-full mt-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-full text-sm font-semibold">
            Online Earn
          </button>
        </div>
      )}
    </header>
  );
}
