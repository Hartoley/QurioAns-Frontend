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

    fetchBlog();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("commentAdded", (comment) => {
      setBlog((prev) => {
        if (prev.comments.some((c) => c._id === comment._id)) return prev;
        return { ...prev, comments: [...prev.comments, comment] };
      });
    });

    socket.on("commentLiked", (updatedComment) => {
      setBlog((prev) => {
        const updatedComments = prev.comments.map((c) =>
          c._id === updatedComment._id ? updatedComment : c
        );
        return { ...prev, comments: updatedComments };
      });
    });

    socket.on("replyAdded", ({ commentId, reply }) => {
      setBlog((prev) => {
        const updatedComments = prev.comments.map((comment) => {
          if (comment._id === commentId) {
            if (comment.replies.some((r) => r._id === reply._id))
              return comment;
            return { ...comment, replies: [...comment.replies, reply] };
          }
          return comment;
        });

        return { ...prev, comments: updatedComments };
      });
    });

    socket.on("replyLiked", ({ commentId, reply }) => {
      setBlog((prev) => {
        const updatedComments = prev.comments.map((comment) => {
          if (comment._id === commentId) {
            const newReplies = comment.replies.map((r) =>
              r._id === reply._id ? reply : r
            );
            return { ...comment, replies: newReplies };
          }
          return comment;
        });
        return { ...prev, comments: updatedComments };
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("commentAdded");
      socket.off("commentLiked");
      socket.off("replyAdded");
      socket.off("replyLiked");
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

      setBlog((prev) => ({
        ...prev,
        comments: [...prev.comments, response.data],
      }));

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
          comment: replyInputs[commentId]?.trim(),
        }
      );

      setBlog((prev) => {
        const updatedComments = prev.comments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, response.data],
            };
          }
          return comment;
        });
        return { ...prev, comments: updatedComments };
      });

      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
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
      <BlogDetails
        handleLike={handleLike}
        blog={blog}
        formatDate={formatDate}
        userId={userId}
      />
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
