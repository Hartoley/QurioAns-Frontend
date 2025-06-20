import React from "react";

const BlogDetails = ({ blog, formatDate, handleLike, userId }) => {
  const hasUserLikedBlog = blog.likes?.some(
    (likeId) => likeId.toString() === userId
  );

  return (
    <div className="mt-16 max-w-4xl mx-auto px-6">
      <p className="pt-10 text-2xl md:text-4xl font-bold leading-snug text-gray-900 mb-2">
        {blog.title}
      </p>

      {blog.subtitle && (
        <p className="text-base text-center italic text-indigo-700 mb-6">
          {blog.subtitle}
        </p>
      )}

      <p className="text-sm flex items-center gap-2 text-gray-600 mb-4">
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

      <div className="flex items-center justify-between mt-6 mb-14">
        <button
          onClick={handleLike}
          disabled={hasUserLikedBlog}
          className={`${
            hasUserLikedBlog
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white px-4 py-2 rounded-full`}
        >
          {hasUserLikedBlog ? "❤️" : "🤍"}
        </button>

        <p className="text-sm text-gray-600">
          {blog.likesCount ?? blog.likes?.length ?? 0} Likes
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
