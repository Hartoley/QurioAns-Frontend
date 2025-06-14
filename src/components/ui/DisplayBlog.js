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

    const handleBlogCreated = (newData) => {
      console.log("📝 Blog created:", newData);
      setBlog(newData);
    };

    const handleBlogLiked = (data) => {
      console.log(
        `❤️ Blog liked | Blog ID: ${data.blogId}, User ID: ${data.userId}`
      );
    };

    const handleCommentAdded = (data) => {
      console.log(`💬 Comment added on Blog ${data.blogId}:`, data.comment);
    };

    const handleCommentLiked = (data) => {
      console.log(`👍 Comment liked: ${data.commentId} on blog ${data.blogId}`);
    };

    const handleReplyAdded = (data) => {
      console.log(`↩️ Reply added to comment ${data.commentId}:`, data.reply);
    };

    const handleReplyLiked = (data) => {
      console.log(
        `🔥 Reply liked at index ${data.replyIndex} on comment ${data.commentId}`
      );
    };

    socket.on("blogCreated", handleBlogCreated);
    socket.on("blogLiked", handleBlogLiked);
    socket.on("commentAdded", handleCommentAdded);
    socket.on("commentLiked", handleCommentLiked);
    socket.on("replyAdded", handleReplyAdded);
    socket.on("replyLiked", handleReplyLiked);

    return () => {
      socket.off("blogCreated", handleBlogCreated);
      socket.off("blogLiked", handleBlogLiked);
      socket.off("commentAdded", handleCommentAdded);
      socket.off("commentLiked", handleCommentLiked);
      socket.off("replyAdded", handleReplyAdded);
      socket.off("replyLiked", handleReplyLiked);
    };
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.put(
        `https://qurioans.onrender.com/likeblog/${userId}/${blog._id}`
      );
      setBlog((prev) => ({ ...prev, likesCount: prev.likesCount + 1 }));
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
          comment: replyInputs[commentId].trim(),
        }
      );
      const updatedComments = blog.comments.map((c) =>
        c._id === commentId
          ? { ...c, replies: [...c.replies, response.data] }
          : c
      );
      setBlog((prev) => ({ ...prev, comments: updatedComments }));
      setReplyInputs({ ...replyInputs, [commentId]: "" });
    } catch (err) {
      console.error("Error adding reply:", err.response?.data || err.message);
    }
  };

  const handleLikeComment = async (commentId) => {
    console.log(userId);

    try {
      const response = await axios.put(
        `https://qurioans.onrender.com/likecomment/${blog._id}/${commentId}`,
        { userId }
      );
      const updatedComments = blog.comments.map((c) =>
        c._id === commentId ? { ...c, ...response.data } : c
      );
      setBlog((prev) => ({ ...prev, comments: updatedComments }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeReply = async (commentId, replyIndex) => {
    try {
      await axios.put(
        `https://qurioans.onrender.com/likereply/${blog._id}/${commentId}/${replyIndex}`,
        {
          userId,
        }
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

  if (!blog) {
    return (
      <>
        <DashNav Home={Home} />
        <div
          className="mt-16 max-w-4xl mx-auto px-6 animate-pulse pb-44"
          role="status"
          aria-label="Loading blog content"
        >
          {/* Title skeleton */}
          <div className="h-10 bg-indigo-300 rounded-lg max-w-3/4 mb-6"></div>

          {/* Subtitle skeleton */}
          <div className="h-6 bg-indigo-200 rounded-lg max-w-1/2 mb-10"></div>

          {/* Paragraph skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-indigo-200 rounded max-w-full"
              ></div>
            ))}
          </div>

          {/* Like and comment section skeleton */}
          <div className="flex items-center space-x-6 mt-10">
            <div className="h-6 w-20 bg-indigo-300 rounded-lg"></div>
            <div className="h-6 w-12 bg-indigo-300 rounded-lg"></div>
          </div>

          {/* Comment input skeleton */}
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
      <div className="mt-16 max-w-4xl mx-auto px-6">
        <p className="pt-10 text-2xl md:text-4xl font-bold leading-snug text-gray-900 mb-2">
          {blog.title}
        </p>

        {blog.subtitle && (
          <p className="text-base text-center italic text-indigo-700 mb-6">
            {blog.subtitle}
          </p>
        )}

        <p className="text-sm flex text-center gap-2 text-gray-600 mb-4">
          <img
            src={
              blog?.createdBy?.avatarUrl ||
              "https://i.pinimg.com/736x/ec/dd/5a/ecdd5aacabb70ecca9bfdaeec9ef2ba4.jpg"
            }
            alt="avatar"
            className="w-5 h-5 rounded-full object-cover"
          />
          By{" "}
          <span className="font-medium text-indigo-700">
            {blog.createdBy?.userName || "Anonymous"}
          </span>
          • {formatDate(blog.createdAt)}
        </p>

        <div
          className="prose prose-indigo prose-base max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />

        <div className="flex items-center space-x-6 mb-8 text-sm text-gray-600">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-red-600 hover:opacity-80"
          >
            {blog.likes.includes(userId) ? <FaHeart /> : <FaRegHeart />}{" "}
            {blog.likesCount}
          </button>
          <span>🗨️ {blog.comments.length} comments</span>
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Write a thoughtful comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleComment}
            className="mt-2 px-4 py-2 bg-[rgb(6,4,52)] text-white rounded-md hover:bg-[rgba(6,4,52,0.83)]"
          >
            Post Comment
          </button>
        </div>

        <div className="space-y-8">
          {blog.comments.map((comment) => {
            const commenter = comment.commenter?.userId;
            return (
              <div key={comment._id} className="border-b pb-4">
                <div className="flex items-center mb-1">
                  <img
                    src={
                      commenter?.avatarUrl ||
                      "https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
                    }
                    className="w-6 h-6 rounded-full object-cover mr-2"
                    alt="avatar"
                  />
                  <a
                    href={`/profile/${commenter?._id}`}
                    className="text-sm font-medium text-indigo-800"
                  >
                    {commenter?.userName || "Unknown"}
                  </a>
                </div>
                <p className="text-sm text-gray-700 mb-1">{comment.comment}</p>
                <button
                  onClick={() => handleLikeComment(comment._id)}
                  className={`text-sm mt-1 ${
                    comment.likedBy?.includes(userId)
                      ? "text-red-600"
                      : "text-gray-500"
                  } hover:underline`}
                >
                  {comment.likedBy?.some((liker) => liker._id === userId)
                    ? "❤️ liked"
                    : "🤍 Like"}{" "}
                  ({comment.likesCount || 0}) ({comment.likesCount || 0})
                </button>

                <div className="ml-8 space-y-3 mt-2">
                  {comment.replies?.map((reply, index) => {
                    const replier = reply.commenter?.id;
                    return (
                      <div key={index} className="flex items-start gap-2">
                        <img
                          src={
                            replier?.avatarUrl ||
                            "https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
                          }
                          className="w-5 h-5 rounded-full object-cover mt-1"
                          alt="avatar"
                        />
                        <div>
                          <a
                            href={`/profile/${replier?._id}`}
                            className="text-xs font-semibold text-indigo-700"
                          >
                            {replier?.userName || "Unknown"}
                          </a>
                          <p className="text-sm text-gray-700">
                            {reply.comment}
                          </p>
                          <button
                            onClick={() => handleLikeReply(comment._id, index)}
                            className={`text-xs ${
                              reply.likedBy?.some(
                                (liker) => liker._id === userId
                              )
                                ? "text-red-600"
                                : "text-gray-500"
                            } hover:underline`}
                          >
                            {reply.likedBy?.some(
                              (liker) => liker._id === userId
                            )
                              ? "❤️ liked"
                              : "🤍 Like"}{" "}
                            ({reply.likesCount || 0})
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <input
                    type="text"
                    placeholder="Reply..."
                    value={replyInputs[comment._id] || ""}
                    onChange={(e) =>
                      setReplyInputs({
                        ...replyInputs,
                        [comment._id]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 px-3 py-1 text-sm rounded-md mt-2"
                  />
                  <button
                    onClick={() => handleReply(comment._id)}
                    className="text-indigo-600 text-sm mt-1 hover:underline"
                  >
                    Reply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Likers Modal */}
      {showLikers && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setShowLikers(null)}
              aria-label="Close likers popup"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Liked by</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {showLikers.likers.map((liker) => (
                <a
                  key={liker._id}
                  href={`/profile/${liker._id}`}
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md"
                >
                  <img
                    src={
                      liker.avatarUrl ||
                      "https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{liker.userName}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <UserDash />
    </>
  );
}
