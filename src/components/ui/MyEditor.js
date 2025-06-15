import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashNav from "./DashNav";
import Footer from "./Footer";
import UserDash from "../../Users/UserDash";
import { FaHeart, FaRegHeart, FaCommentDots, FaTimes } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("https://qurioans.onrender.com");

export default function DisplayBlog({ Home }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [showLikers, setShowLikers] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const userId = localStorage.getItem("QurioUser ");

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

    fetchBlog();

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
    socket.on("serverStarted", (data) => {
      console.log(data.message);
    });

    // Listen for userUpdated event
    socket.on("userUpdated", (data) => {
      console.log("User  updated event received:", data);
    });

    // Listen for blogCreated event
    socket.on("blogCreated", (blog) => {
      console.log("📝 Blog created:", blog);
      setBlog(blog); // Update the blog state if necessary
    });

    // Listen for userFound event
    socket.on("userFound", (data) => {
      console.log("User  found event received:", data);
    });

    // Listen for adminUpdated event
    socket.on("adminUpdated", (data) => {
      console.log("Admin update event received:", data);
    });

    // Listen for commentAdded event
    socket.on("commentAdded", (data) => {
      console.log(`💬 Comment added to blog ID: ${data.blogId}`);
    });

    // Listen for blogLiked event
    socket.on("blogLiked", (data) => {
      console.log(
        `❤️ Blog ID: ${data.blogId} liked by user ID: ${data.userId}`
      );
    });

    // Listen for blogUpdated event
    socket.on("blogUpdated", (data) => {
      console.log(`Updated Blog ID: ${data.title}`);
    });

    // Listen for replyAdded event
    socket.on("replyAdded", (data) => {
      console.log(
        `↩️ Reply added to comment ID: ${data.commentId} on blog ID: ${data.blogId}`
      );
    });

    // Listen for commentLiked event
    socket.on("commentLiked", (data) => {
      console.log(
        `👍 Comment ID: ${data.commentId} on blog ID: ${data.blogId} liked by user ID: ${data.userId}`
      );
    });

    // Listen for replyLiked event
    socket.on("replyLiked", (data) => {
      console.log(
        `🔥 Reply at index: ${data.replyIndex} on comment ID: ${data.commentId} liked by user ID: ${data.userId}`
      );
    });

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

  // ... (rest of your component code, including rendering the blog and handling likes/comments)

  return (
    <>
      <DashNav />
      <div className="mt-16 max-w-4xl mx-auto px-6">
        {/* Blog content rendering */}
        {/* Connection status display */}
        <p
          className={`text-sm ${
            isConnected ? "text-green-600" : "text-red-600"
          }`}
        >
          {isConnected
            ? "Connected to the server"
            : "Disconnected from the server"}
        </p>
        {/* ... (rest of your blog display code) */}
      </div>
      <Footer />
    </>
  );
}
