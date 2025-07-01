import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import io from "socket.io-client";

const AdminDash = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const socket = io("https://qurioans.onrender.com");

  const handleEditClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://qurioans.onrender.com/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    socket.on("connect", () => {
      // console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      // console.log("Socket disconnected");
    });

    socket.on("blogCreated", (newBlog) => {
      setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("blogCreated");
    };
  }, []);

  const toggleExpanded = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (error) {
    return (
      <>
        <div className="min-h-[80vh] max-w-4xl mx-auto px-4 py-8 space-y-6">
          <div className="h-10 bg-red-100 text-red-700 font-semibold px-4 py-2 rounded border border-red-300 shadow">
            ⚠️ Error loading blog: {error}
          </div>

          {/* Fake skeleton UI for fallback */}
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-8 w-20 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="w-24 h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className="min-h-[80vh] max-w-4xl mx-auto px-4 py-8 animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div> {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-1/2"></div> {/* Subtitle */}
          <div className="h-64 bg-gray-200 rounded"></div> {/* Editor body */}
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>{" "}
          {/* Categories title */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-8 w-20 bg-gray-200 rounded-full"
              ></div>
            ))}
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>{" "}
          {/* Media label */}
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="w-24 h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <CreateBlog />
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>
          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border rounded p-4 bg-white shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold">{blog.title}</h3>

                  {blog.image && blog.image.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {blog.image.map((media, idx) => {
                        const url = media.image;
                        const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                        return isVideo ? (
                          <video
                            key={idx}
                            src={url}
                            controls
                            className="w-32 h-32 object-cover rounded border"
                          />
                        ) : (
                          <img
                            key={idx}
                            src={url}
                            alt={`media-${idx}`}
                            className="w-64 h-64 object-cover rounded border"
                          />
                        );
                      })}
                    </div>
                  )}

                  {blog.subtitle && (
                    <p className="italic text-gray-600 mb-2">{blog.subtitle}</p>
                  )}

                  {/* Render HTML from Quill content */}
                  {/* Render HTML from Quill content with See more/less */}
                  {blog.body ? (
                    <div className="mt-2">
                      {expandedPosts[blog._id] ? (
                        <>
                          <div
                            className="prose max-w-none [&_img]:w-64 [&_img]:h-auto [&_img]:rounded"
                            dangerouslySetInnerHTML={{ __html: blog.body }}
                          />
                          <button
                            onClick={() => toggleExpanded(blog._id)}
                            className="text-pink-500 hover:underline text-sm mt-2 mb-2"
                          >
                            See less
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-700">
                            {stripHtml(blog.body).slice(0, 200)}...
                          </div>
                          <button
                            onClick={() => toggleExpanded(blog._id)}
                            className="text-red-500 mb-2 hover:underline text-sm mt-2"
                          >
                            See more
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-400 mt-2">
                      No content available.
                    </p>
                  )}

                  {blog.categories && blog.categories.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {blog.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {blog.createdBy && (
                    <div className="mt-3 flex items-center space-x-3 text-sm text-gray-500">
                      {blog.createdBy.avatarUrl && (
                        <img
                          src={blog.createdBy.avatarUrl}
                          alt={blog.createdBy.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span>{blog.createdBy.userName}</span>
                    </div>
                  )}

                  <button
                    onClick={() => handleEditClick(blog._id)}
                    className="mt-3 py-2 text-sm w-20 rounded-lg bg-pink-500 hover:bg-pink-400 text-white hover:underline"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default AdminDash;
