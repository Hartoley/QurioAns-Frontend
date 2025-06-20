import React, { useState, useEffect } from "react";

const Comments = ({
  blog,
  handleComment,
  handleLikeComment,
  handleReply,
  replyInputs,
  setReplyInputs,
  userId,
  handleLikeReply,
  commentInput,
  setCommentInput,
}) => {
  const [showReplies, setShowReplies] = useState({});
  const [commentLoading, setCommentLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState({});
  const [visibleCount, setVisibleCount] = useState(2); // Show 2 comments initially

  useEffect(() => {
    if (Array.isArray(blog?.comments)) {
      const initState = {};
      blog.comments.forEach((c) => (initState[c._id] = false));
      setShowReplies(initState);
    }
  }, [blog]);

  const handlePostComment = async () => {
    if (!commentInput.trim()) return;
    setCommentLoading(true);
    await handleComment();
    setCommentLoading(false);
  };

  const handlePostReply = async (commentId) => {
    const reply = replyInputs[commentId];
    if (!reply?.trim()) return;

    setReplyLoading((prev) => ({ ...prev, [commentId]: true }));
    await handleReply(commentId);
    setReplyLoading((prev) => ({ ...prev, [commentId]: false }));
  };

  const commentsToShow = Array.isArray(blog?.comments)
    ? [...blog.comments].reverse().slice(0, visibleCount)
    : [];

  return (
    <div className="space-y-8 px-4 max-w-3xl mx-auto">
      {/* New Comment Box */}
      <div className="mb-10">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a thoughtful comment..."
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(6,4,52)]"
          disabled={commentLoading}
        />
        <button
          onClick={handlePostComment}
          disabled={commentLoading}
          className="mt-2 px-4 py-2 bg-[rgb(6,4,52)] text-white rounded-md hover:bg-[rgba(6,4,52,0.83)] disabled:opacity-60"
        >
          {commentLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Posting...
            </span>
          ) : (
            "Post Comment"
          )}
        </button>
      </div>

      {/* Comments */}
      {commentsToShow.map((comment) => {
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
                className="text-sm font-medium text-[rgb(6,4,52)]"
              >
                {commenter?.userName || "Unknown"}
              </a>
            </div>
            <p className="text-sm text-gray-700 mb-1">{comment.comment}</p>
            <button
              onClick={() => handleLikeComment(comment._id)}
              className={`text-sm mt-1 ${
                comment.likedBy?.some((liker) => liker._id === userId)
                  ? "text-red-600"
                  : "text-gray-500"
              } hover:underline`}
            >
              {comment.likedBy?.some((liker) => liker._id === userId)
                ? "❤️"
                : "🤍"}{" "}
              {comment.likesCount || 0}
            </button>

            {/* Toggle Replies Button */}
            {Array.isArray(comment.replies) && comment.replies.length > 0 && (
              <button
                onClick={() =>
                  setShowReplies((prev) => ({
                    ...prev,
                    [comment._id]: !prev[comment._id],
                  }))
                }
                className="text-xs text-[rgb(6,4,52)] mt-2 hover:underline block"
              >
                {showReplies[comment._id]
                  ? "Hide replies"
                  : `View replies (${comment.replies.length})`}
              </button>
            )}

            {/* Reply Input */}
            <div className="ml-8 mt-2">
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
                className="w-full border border-gray-200 px-3 py-1 text-sm rounded-md"
                disabled={replyLoading[comment._id]}
              />
              <button
                onClick={() => handlePostReply(comment._id)}
                disabled={replyLoading[comment._id]}
                className="text-[rgb(6,4,52)] text-sm mt-1 hover:underline disabled:opacity-60"
              >
                {replyLoading[comment._id] ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-[rgb(6,4,52)] border-t-transparent rounded-full animate-spin"></span>
                    Replying...
                  </span>
                ) : (
                  "Reply"
                )}
              </button>
            </div>

            {/* Replies */}
            {showReplies[comment._id] &&
              Array.isArray(comment.replies) &&
              comment.replies.map((reply, index) => {
                const replier = reply.commenter?.id;
                return (
                  <div key={index} className="ml-8 mt-3 flex gap-2">
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
                        className="text-xs font-semibold text-[rgb(6,4,52)]"
                      >
                        {replier?.userName || "Unknown"}
                      </a>
                      <p className="text-sm text-gray-700">{reply.comment}</p>
                      <button
                        onClick={() => handleLikeReply(comment._id, index)}
                        className={`text-xs ${
                          reply.likedBy?.some((liker) => liker._id === userId)
                            ? "text-red-600"
                            : "text-gray-500"
                        } hover:underline`}
                      >
                        {reply.likedBy?.some((liker) => liker._id === userId)
                          ? "❤️"
                          : "🤍"}{" "}
                        {reply.likesCount || 0}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}

      {/* Show More / Less Buttons */}
      {Array.isArray(blog?.comments) && blog.comments.length > 2 && (
        <div className="text-center mt-6 space-x-4">
          {visibleCount < blog.comments.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 2)}
              className="text-sm text-blue-600 hover:underline"
            >
              Show more comments
            </button>
          )}
          {visibleCount > 2 && (
            <button
              onClick={() => setVisibleCount(2)}
              className="text-sm text-red-600 hover:underline"
            >
              Show less comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
