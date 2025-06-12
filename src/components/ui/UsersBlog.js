import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersBlog = ({ selectedTopic, onClearTopic }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("QurioUser");

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
    <div className="sm:w-2/3 w-full sm:min-h-screen h-auto p-4 sm:pb-8 sm:overflow-y-auto scrollbar-hide">
      {/* Intro Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-1">
          Welcome to QurioAns
        </h2>
        <p className="text-gray-900 text-sm mb-3">
          Explore insightful and thought-provoking blogs from our ever-growing
          community of curious minds. From deep dives into AI breakthroughs to
          personal reflections, tutorials, and curated opinions QurioAns brings
          together the voices shaping tomorrow’s ideas. Discover, learn, and get
          inspired all in one place.
        </p>

        <div className="flex flex-wrap gap-3 items-center p-3">
          <button
            onClick={onClearTopic}
            className="text-sm px-4 py-2 bg-[rgb(6,4,52)] text-white rounded hover:bg-[rgba(6,4,52,0.9)] transition"
          >
            🔥 Top Reads
          </button>
          {/* 
          <select
            onChange={(e) => {
              const sortBy = e.target.value;
              // Handle sort logic with setSortOption
            }}
            className="text-sm px-3 py-2 border border-gray-600 rounded bg-transparent text-black"
          >
            <option className="text-black" value="">
              Sort by
            </option>
            <option className="text-black" value="latest">
              Newest
            </option>
            <option className="text-black" value="likes">
              Most Liked
            </option>
            <option className="text-black" value="comments">
              Most Commented
            </option>
          </select> */}
        </div>
      </div>

      {/* Main Heading */}
      <p className="text-2xl font-medium text-black mb-4">
        {selectedTopic
          ? `${selectedTopic} Contents`
          : "Trending selections for you"}
      </p>

      {/* Conditional Rendering */}
      {loading ? (
        <p className="text-gray-400">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-300 mt-12 text-lg">
          No blogs found under <strong>{selectedTopic}</strong>
          <div className="mt-6">
            <button
              onClick={onClearTopic}
              className="bg-[rgb(6,4,52)] hover:bg-[rgba(6,4,52,0.84)] text-black text-sm px-4 py-2 rounded"
            >
              Go Back to All Blogs
            </button>
          </div>
        </div>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col sm:flex-row gap-4 bg-blatext-black rounded-lg p-4 shadow mb-6"
            onClick={() =>
              navigate(`/blog/${blog.title}/${blog._id}/${userId}`)
            }
          >
            {/* LEFT: Textual content */}
            <div className="flex-1">
              <p className="text-sm flex items-center gap-1 text-gray-600 mb-1">
                <img
                  src={
                    blog?.createdBy?.avatarUrl ||
                    `https://i.pinimg.com/736x/ec/dd/5a/ecdd5aacabb70ecca9bfdaeec9ef2ba4.jpg`
                  }
                  alt="avatar"
                  className="w-5 h-5 rounded-full object-cover"
                />
                By {blog.createdBy?.userName || "Anonymous"} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {blog.title}
              </h2>

              <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                <span
                  dangerouslySetInnerHTML={{
                    __html: blog.body,
                  }}
                />
              </p>

              <div className="text-sm text-gray-600 flex gap-4 mt-auto">
                <span>❤️ {blog.likesCount} Likes</span>
                <span>💬 {blog.commentsCount} Comments</span>
              </div>
            </div>

            {/* RIGHT: Image or video preview */}
            {blog.image && blog.image.length > 0 && (
              <div className="w-full sm:w-48 flex-shrink-0">
                {blog.image[0].image.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={blog.image[0].image}
                    controls
                    className="w-full aspect-video object-cover rounded"
                  />
                ) : (
                  <img
                    src={blog.image[0].image}
                    alt="thumbnail"
                    className="w-full aspect-[4/3] object-cover object-top rounded"
                  />
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UsersBlog;
