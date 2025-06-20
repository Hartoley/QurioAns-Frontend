// DisplayBlog.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashNav from "./DashNav";
import Footer from "./Footer";
import UserDash from "../../Users/UserDash";
import BlogDetails from "./BlogDetails";
import Comments from "./Comments";
import Likes from "./Likes";
import io from "socket.io-client";

const socket = io("https://qurioans.onrender.com");

export default function DisplayBlog({ Home }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [showLikers, setShowLikers] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const userId = localStorage.getItem("QurioUser");

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

    setIsConnected(socket.connected);

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    // Avoid duplicates when adding new comment
    socket.on("commentAdded", (data) => {
      setBlog((prev) => {
        if (prev.comments.some((c) => c._id === data._id)) return prev;
        return { ...prev, comments: [...prev.comments, data] };
      });
    });

    // Avoid duplicates when adding reply
    socket.on("replyAdded", (data) => {
      setBlog((prev) => {
        const updatedComments = prev.comments.map((comment) => {
          if (comment._id === data.commentId) {
            if (comment.replies?.some((r) => r._id === data._id)) {
              return comment; // Already added
            }
            return {
              ...comment,
              replies: [...comment.replies, data],
            };
          }
          return comment;
        });
        return { ...prev, comments: updatedComments };
      });
    });

    fetchBlog();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("commentAdded");
      socket.off("replyAdded");
    };
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.put(
        `https://qurioans.onrender.com/likeblog/${userId}/${blog._id}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    try {
      const response = await axios.put(
        `https://qurioans.onrender.com/comment/${userId}/${blog._id}`,
        {
          comment: commentInput,
          model: "User",
        }
      );

      setBlog((prev) => {
        if (prev.comments.some((c) => c._id === response.data._id)) return prev;
        return {
          ...prev,
          comments: [...prev.comments, response.data],
        };
      });

      setCommentInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReply = async (commentId) => {
    try {
      const response = await axios.put(
        `https://qurioans.onrender.com/replycomment/${blog._id}/${commentId}`,
        {
          commenter: {
            id: userId,
            model: "User",
          },
          comment: replyInputs[commentId].trim(),
        }
      );

      const updatedComments = blog.comments.map((c) =>
        c._id === commentId
          ? {
              ...c,
              replies: c.replies.some((r) => r._id === response.data._id)
                ? c.replies
                : [...c.replies, response.data],
            }
          : c
      );

      setBlog((prev) => ({ ...prev, comments: updatedComments }));
      setReplyInputs({ ...replyInputs, [commentId]: "" });
    } catch (err) {
      console.error("Error adding reply:", err.response?.data || err.message);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axios.put(
        `https://qurioans.onrender.com/likecomment/${blog._id}/${commentId}`,
        { userId }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeReply = async (commentId, replyIndex) => {
    try {
      await axios.put(
        `https://qurioans.onrender.com/likereply/${blog._id}/${commentId}/${replyIndex}`,
        { userId }
      );
      alert("Reply liked successfully");
    } catch (err) {
      alert(
        "Error liking reply: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (blog === null) {
    return (
      <>
        <DashNav Home={Home} />
        <div
          className="mt-20 max-w-4xl mx-auto px-6 animate-pulse pb-44"
          role="status"
          aria-label="Loading blog content"
        >
          <div className="h-10 bg-indigo-300 rounded-lg max-w-3/4 mb-6"></div>
          <div className="h-6 bg-indigo-200 rounded-lg max-w-1/2 mb-10"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-indigo-200 rounded max-w-full"
              ></div>
            ))}
          </div>
          <div className="flex items-center space-x-6 mt-10">
            <div className="h-6 w-20 bg-indigo-300 rounded-lg"></div>
            <div className="h-6 w-12 bg-indigo-300 rounded-lg"></div>
          </div>
          <div className="mt-10">
            <div className="h-10 bg-indigo-200 rounded-full w-full"></div>
            <div className="h-8 w-24 bg-indigo-300 rounded-full mt-4"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <DashNav />
      <BlogDetails blog={blog} formatDate={formatDate} />
      <Comments
        blog={blog}
        handleComment={handleComment}
        handleLikeComment={handleLikeComment}
        handleReply={handleReply}
        replyInputs={replyInputs}
        setReplyInputs={setReplyInputs}
        userId={userId}
        handleLikeReply={handleLikeReply}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
      />
      <Likes showLikers={showLikers} setShowLikers={setShowLikers} />
      <UserDash />
    </>
  );
}
