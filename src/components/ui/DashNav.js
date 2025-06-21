import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FiBell,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMic,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const DashNav = ({ Home }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);

  const dropdownRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://qurioans.onrender.com/qurioans/getuser/${userId}`
        );
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setLoadingSearch(false);
        return;
      }
      try {
        setLoadingSearch(true);
        const res = await axios.get(
          `https://qurioans.onrender.com/search?search=${query}`
        );
        setSearchResults(res.data || []);
        setLoadingSearch(false);
      } catch (err) {
        console.error("Search failed:", err);
        setLoadingSearch(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    fetchSearchResults(searchTerm);
  }, [searchTerm, fetchSearchResults]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("QurioUser");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[rgb(6,4,52)] text-white shadow-md">
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 h-16">
        <div onClick={Home} className="cursor-pointer text-2xl font-bold">
          QurioAns
        </div>

        {/* Desktop Search */}
        <div
          className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 w-full max-w-md relative"
          ref={searchRef}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 14.15z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search blogs..."
            className="ml-2 bg-transparent outline-none text-white placeholder:text-white/70 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Dropdown Results */}
          {(loadingSearch || searchResults.length > 0 || searchTerm) && (
            <div className="absolute top-full mt-2 left-0 bg-white text-black rounded shadow-lg w-full z-50 max-h-60 overflow-y-auto">
              {loadingSearch ? (
                <p className="p-3 text-sm text-gray-600">Searching...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((blog) => (
                  <div
                    key={blog._id}
                    className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/blog/${blog.title}/${blog._id}/${userId}`);
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                  >
                    <p className="font-semibold">{blog.title}</p>
                    <p className="text-sm text-gray-600">
                      {blog.subtitle?.slice(0, 50) || blog.body?.slice(0, 50)}
                      ...
                    </p>
                  </div>
                ))
              ) : (
                <p className="p-3 text-sm text-gray-600">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-1 text-white hover:text-purple-300 font-semibold">
            <FiMic size={18} />
            <span>Audio</span>
          </button>
          <FiBell
            size={20}
            className="text-white hover:text-purple-300 hidden md:block"
          />

          {/* Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={
                user?.avatarUrl ||
                "https://ui-avatars.com/api/?name=Qurio+User&background=6b21a8&color=fff"
              }
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-white cursor-pointer"
              onClick={() => setAvatarDropdown((prev) => !prev)}
            />
            {avatarDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-48 py-2 z-50">
                <div
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  <FiUser />
                  Profile
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/settings")}
                >
                  <FiSettings />
                  Settings
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FiLogOut />
                  Logout
                </div>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgb(6,4,52)] text-white px-4 pb-4 space-y-3">
          <div ref={searchRef} className="relative">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full bg-white/10 px-4 py-2 rounded-full outline-none placeholder:text-white/70 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {(loadingSearch || searchResults.length > 0 || searchTerm) && (
              <div className="absolute top-full mt-2 left-0 bg-white text-black rounded shadow-lg w-full z-50 max-h-60 overflow-y-auto">
                {loadingSearch ? (
                  <p className="p-3 text-sm text-gray-600">Searching...</p>
                ) : searchResults.length > 0 ? (
                  searchResults.map((blog) => (
                    <div
                      key={blog._id}
                      className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchTerm("");
                        setSearchResults([]);
                        setMenuOpen(false);
                        navigate(`/blog/${blog.title}/${blog._id}/${userId}`);
                      }}
                    >
                      <p className="font-semibold">{blog.title}</p>
                      <p className="text-sm text-gray-600">
                        {blog.subtitle?.slice(0, 50) || blog.body?.slice(0, 50)}
                        ...
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-600">No results found</p>
                )}
              </div>
            )}
          </div>

          <div
            onClick={() => navigate("/write")}
            className="py-2 border-b border-white/10 cursor-pointer"
          >
            Audio
          </div>
          <div
            onClick={() => navigate("/notifications")}
            className="py-2 border-b border-white/10 cursor-pointer"
          >
            Notifications
          </div>
          <div
            onClick={() => navigate(`/profile/${userId}`)}
            className="py-2 border-b border-white/10 cursor-pointer"
          >
            Profile
          </div>
          <div
            onClick={() => navigate("/settings")}
            className="py-2 border-b border-white/10 cursor-pointer"
          >
            Settings
          </div>
          <div
            onClick={handleLogout}
            className="py-2 border-b border-white/10 cursor-pointer"
          >
            Logout
          </div>
        </div>
      )}
    </header>
  );
};

export default DashNav;
