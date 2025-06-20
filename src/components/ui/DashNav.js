import React, { useEffect, useState, useRef } from "react";
import {
  FiBell,
  FiEdit2,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMic,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("https://qurioans.onrender.com");

const DashNav = ({ Home }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const dropdownRef = useRef();

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
    setIsConnected(socket.connected);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("userFound", (data) => {
      setUser((prev) => ({ ...prev, userFound: data }));
    });

    return () => {
      socket.off("userFound");
    };
  }, [userId]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAvatarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      try {
        const res = await axios.get(
          `https://qurioans.onrender.com/qurioans/blogs?search=${searchTerm}`
        );
        console.log("Search Results:", res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("QurioUser");
    navigate("/login");
  };

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://qurioans.onrender.com/getblog/${id}`
        );
        setBlog(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Check initial connection status
    setIsConnected(socket.connected);

    // Listen for connection events
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    // Listen for serverStarted event
    socket.on("serverStarted", (data) => {});

    // Listen for userUpdated event
    socket.on("userUpdated", (data) => {});

    // Listen for blogCreated event
    socket.on("blogCreated", (blog) => {
      setBlog((prev) => ({ ...prev, ...blog })); // Update the blog state if necessary
    });

    // Listen for userFound event
    socket.on("userFound", (data) => {
      // console.log("User  found event received:", data);
      setBlog((prev) => ({ ...prev, ...data }));
    });

    // Listen for adminUpdated event
    socket.on("adminUpdated", (data) => {
      setBlog((prev) => ({ ...prev, ...data }));
    });

    // Listen for commentAdded event
    socket.on("commentAdded", (data) => {
      setBlog((prev) => ({ ...prev, ...data }));
    });

    // Listen for blogLiked event
    socket.on("blogLiked", (data) => {
      setBlog((prev) => ({ ...prev, ...data }));
    });

    // Listen for blogUpdated event
    socket.on("blogUpdated", (data) => {
      setBlog((prev) => ({ ...prev, ...data }));
    });

    // Listen for replyAdded event
    socket.on("replyAdded", (data) => {
      setBlog((prev) => ({ ...prev, ...data }));
    });

    // Listen for commentLiked event
    socket.on("commentLiked", (data) => {
      setBlog((prev) => ({ ...prev, ...data }));
    });

    // Listen for replyLiked event
    socket.on("replyLiked", (data) => {
      setBlog((prev) => ({ ...prev, ...data }));
    });
    fetchBlog();

    // Cleanup function
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("serverStarted");
      socket.off("userUpdated");
      socket.off("blogCreated");
      socket.off("userFound");
      socket.off("adminUpdated");
      socket.off("commentAdded");
      socket.off("blogLiked");
      socket.off("blogUpdated");
      socket.off("replyAdded");
      socket.off("commentLiked");
      socket.off("replyLiked");
    };
  }, [id]);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[rgb(6,4,52)] text-white shadow-md">
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 h-16">
        {/* Brand */}
        <div onClick={Home} className="cursor-pointer text-2xl font-bold">
          QurioAns
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 w-full max-w-md">
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
            onKeyDown={handleSearch}
          />
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

          {/* Avatar + Dropdown */}
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

          {/* Mobile Menu Toggle */}
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
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full bg-white/10 px-4 py-2 rounded-full outline-none placeholder:text-white/70 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
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
