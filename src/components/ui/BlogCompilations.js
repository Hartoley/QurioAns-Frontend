// BlogCompilation.js
import React from "react";
import BlogDetails from "./BlogDetails";
import Comments from "./Comments";
import Likes from "./Likes";

const BlogCompilation = ({
  blog,
  formatDate,
  handleComment,
  handleLikeComment,
  handleReply,
  replyInputs,
  setReplyInputs,
  showLikers,
  setShowLikers,
}) => {
  return (
    <div>
      <BlogDetails blog={blog} formatDate={formatDate} />
      <Comments
        blog={blog}
        handleComment={handleComment}
        handleLikeComment={handleLikeComment}
        handleReply={handleReply}
        replyInputs={replyInputs}
        setReplyInputs={setReplyInputs}
      />
      <Likes showLikers={showLikers} setShowLikers={setShowLikers} />
    </div>
  );
};

export default BlogCompilation;
