import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const categoriesList = [
  "Technology",
  "Business",
  "Health",
  "Science",
  "Lifestyle",
  "Education",
  "Entertainment",
  "Politics",
  "Travel",
  "Food",
  "Fashion",
  "Sports",
  "Finance",
  "DIY",
  "Parenting",
  "Art",
  "History",
  "Spirituality",
  "Marketing",
  "Coding",
  "Career",
  "Relationships",
  "Mental Health",
  "News",
  "Startups",
  "Photography",
  "Books",
  "Culture",
  "Automotive",
  "Gaming",
];

const AdminDash = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();

  const handleEditClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    body: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch blogs
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

  // Handle input changes for title, subtitle, body
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category checkbox toggle
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Handle media file selection
  const handleMediaChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  // Submit new blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("body", formData.body);
      data.append("categories", JSON.stringify(selectedCategories));

      mediaFiles.forEach((file) => {
        data.append("media", file);
      });

      const res = await fetch(
        `https://qurioans.onrender.com/createblog/${adminId}`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create blog");
      }

      const newBlog = await res.json();

      // Add new blog to the list
      setBlogs((prev) => [newBlog, ...prev]);

      // Reset form
      setFormData({ title: "", subtitle: "", body: "" });
      setSelectedCategories([]);
      setMediaFiles([]);
      alert("Blog created successfully!");
    } catch (err) {
      alert("Error creating blog: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Error: {error}
      </p>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center mt-0 text-lg font-semibold">
          Loading blogs...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Create Blog Form */}
      <section className="mb-12 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1" htmlFor="title">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="subtitle">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="body">
              Body <span className="text-red-600">*</span>
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Categories Checkboxes */}
          <div>
            <label className="block font-medium mb-2">Categories</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto border rounded p-3 bg-gray-50">
              {categoriesList.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="form-checkbox h-4 w-4 text-purple-600"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="block font-medium mb-2">Upload Media</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="block"
            />
            {mediaFiles.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {mediaFiles.map((file, idx) => {
                  const url = URL.createObjectURL(file);
                  return file.type.startsWith("video/") ? (
                    <video
                      key={idx}
                      src={url}
                      controls
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ) : (
                    <img
                      key={idx}
                      src={url}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded border"
                    />
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-30 px-3 bg-purple-600 text-white py-3 rounded font-semibold ${
              submitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-purple-700"
            }`}
          >
            {submitting ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </section>

      {/* Blogs List */}
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
                {blog.subtitle && (
                  <p className="italic text-gray-600 mb-2">{blog.subtitle}</p>
                )}
                <p className="mb-2 whitespace-pre-line">{blog.body}</p>

                {/* Categories */}
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

                {/* Media */}
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
                          className="w-32 h-32 object-cover rounded border"
                        />
                      );
                    })}
                  </div>
                )}

                {/* Created by info */}
                {blog.createdBy && (
                  <div className="mt-3 flex items-center space-x-3 text-sm text-gray-500">
                    {blog.createdBy.avatarUrl && (
                      <img
                        src={blog.createdBy.avatarUrl}
                        alt={blog.createdBy.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <button
                      onClick={() => handleEditClick(blog._id)}
                      className="bg-purple-600 hover:bg-purple-900 p-3 font-medium text-white rounded-xl"
                    >
                      Edit Blog
                    </button>
                    <span>By {blog.createdBy.userName || "Unknown"}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDash;
