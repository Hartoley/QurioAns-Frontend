import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../Images/cover-removebg-preview.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [user, setuser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("QurioUser");
    if (user) {
      setuser(user);
      setIsLoggedIn(true);
    }
  }, []);

  const signin = async () => {
    navigate("/login");
    setIsOpen(false);
  };

  const handleGetStarted = () => {
    navigate("/signup");
    setIsOpen(false);
  };

  // Prepare routing for other menu items - placeholders
  const handleNavigate = (route) => {
    navigate(route);
    setIsOpen(false);
  };

  // Check if QurioUser is in localStorage

  // Mobile menu items with their routes prepared for future use
  const mobileMenuItems = [
    { label: "Home", route: "/" },
    { label: "Space", route: "/space" },
    { label: "Roadmaps", route: "/roadmaps" },
    { label: "Hotstar", route: "/hotstar" },
    { label: "Fitness", route: "/fitness" },
    { label: "Blog", route: `/dashboard/${user}` },
    { label: "Uncover", route: "/uncover" },
  ];

  return (
    <header className="fixed w-full top-0 z-30 bg-transparent text-white bg-[rgb(6,4,52)] bg-opacity-95">
      <nav className="flex items-center justify-between px-4 py-4 w-full h-16 bg-[rgb(6,4,52)] bg-opacity-95">
        {/* Logo */}
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
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

          {!isLoggedIn && pathname !== "/login" && (
            <li
              onClick={signin}
              className="hover:text-purple-400 cursor-pointer"
            >
              Sign in
            </li>
          )}
        </ul>

        {/* Conditionally render the button */}
        {isLoggedIn ? (
          <button
            onClick={signin}
            className="hidden md:block bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-45 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Stories
          </button>
        ) : pathname === "/signup" ? (
          <button
            onClick={signin}
            className="hidden md:block bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-45 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Already Signed Up? Login
          </button>
        ) : (
          <button
            onClick={handleGetStarted}
            className="hidden md:block bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-45 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Get Started
          </button>
        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a23]/90 text-white px-4 pb-6 space-y-2 select-none">
          {mobileMenuItems.map(({ label, route }, i) => (
            <div
              key={i}
              onClick={() => handleNavigate(route)}
              className="py-2 cursor-pointer hover:text-purple-400 border-b border-white/10 transition-colors duration-200"
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate(route)}
            >
              {label}
            </div>
          ))}

          {!isLoggedIn ? (
            <>
              <div
                onClick={signin}
                className="py-2 cursor-pointer hover:text-purple-400 border-b border-white/10 transition-colors duration-200"
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && signin()}
              >
                Log In
              </div>
              <div
                onClick={handleGetStarted}
                className="py-2 cursor-pointer hover:text-purple-400 border-b border-white/10 transition-colors duration-200"
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleGetStarted()}
              >
                Get Started
              </div>

              {/* Styled Online Earn button */}
              <button
                onClick={() => {
                  // example action - can customize as needed
                  alert("Online Earn clicked");
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Online Earn
              </button>
            </>
          ) : (
            <div
              onClick={signin} // Change this if you create a separate stories page later
              className="py-2 cursor-pointer hover:text-purple-400 border-b border-white/10 transition-colors duration-200"
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && signin()}
            >
              Stories
            </div>
          )}
        </div>
      )}
    </header>
  );
}
