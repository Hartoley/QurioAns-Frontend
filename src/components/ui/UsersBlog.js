import React, { useEffect, useState } from "react";

const UsersBlog = ({ selectedTopic, onClearTopic }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://qurioans.onrender.com/blogs");
        const data = await res.json();

        const filtered = selectedTopic
          ? data.filter((blog) => blog.categories?.includes(selectedTopic))
          : data;

        const sorted = filtered.sort((a, b) => {
          if (b.likesCount !== a.likesCount) {
            return b.likesCount - a.likesCount;
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setBlogs(sorted);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTopic]);

  return (
    <div className="sm:w-2/3 w-full min-h-screen p-4 overflow-y-auto scrollbar-hide">
      <h1 className="text-2xl font-bold text-white mb-4">
        {selectedTopic ? `${selectedTopic} Blogs` : "User Blogs"}
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-300 mt-12 text-lg">
          No blogs found under <strong>{selectedTopic}</strong>
          <div className="mt-6">
            <button
              onClick={onClearTopic}
              className="bg-[rgb(6,4,52)] hover:bg-[rgba(6,4,52,0.84)] text-white text-sm px-4 py-2 rounded"
            >
              Go Back to All Blogs
            </button>
          </div>
        </div>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="mb-6 bg-white rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {blog.title}
            </h2>
            {blog.image && blog.image.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {blog.image.map((media, idx) => {
                    const url = media.image;
                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                    return isVideo ? (
                      <video
                        key={idx}
                        src={url}
                        controls
                        className="w-full aspect-video object-cover object-top rounded border"
                      />
                    ) : (
                      <img
                        key={idx}
                        src={url}
                        alt={`media-${idx}`}
                        className="w-full aspect-[4/3] object-cover object-top rounded border"
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <p className="text-sm flex gap-1 text-gray-600 mb-2">
              <img
                src={
                  blog?.createdBy?.avatarUrl ||
                  `https://i.pinimg.com/736x/ec/dd/5a/ecdd5aacabb70ecca9bfdaeec9ef2ba4.jpg`
                }
                alt={blog.createdBy.userName}
                className="w-5 h-5 rounded-full object-cover"
              />
              By {blog.createdBy?.userName || "Anonymous"} {"  "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <div
              className="text-gray-800 line-clamp-3 mb-2 prose max-w-none overflow-hidden"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />

            <div className="text-sm text-gray-600 flex items-center justify-between">
              <span>❤️ {blog.likesCount} Likes</span>
              <span>💬 {blog.commentsCount} Comments</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UsersBlog;
