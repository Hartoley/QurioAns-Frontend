import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminDash = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const handleEditClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Error: {error}
      </p>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-lg font-semibold">Loading blogs...</p>
      </div>
    );

  return (
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
                <div
                  className="prose max-w-none [&_img]:w-64 [&_img]:h-auto [&_img]:rounded"
                  dangerouslySetInnerHTML={{ __html: blog.body }}
                ></div>

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
                  className="mt-3 text-sm text-purple-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDash;
