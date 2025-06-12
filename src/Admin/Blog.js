import React, { useState, useEffect } from "react";
import Footer from "../components/ui/Footer";
import DashNav from "../components/ui/DashNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CATEGORY_OPTIONS = [
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

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

const BlogEditor = () => {
  const { blogId } = useParams();
  const adminId = localStorage.getItem("adminId");
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    body: "",
    categories: [],
  });

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [existingMedia, setExistingMedia] = useState([]);
  const [mediaToKeep, setMediaToKeep] = useState([]);
  const [newMedia, setNewMedia] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://qurioans.onrender.com/getblog/${blogId}`
        );
        if (!res.ok) throw new Error("Failed to fetch blog data");
        const data = await res.json();

        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          body: data.body || "",
          categories: Array.isArray(data.categories)
            ? data.categories
            : typeof data.categories === "string"
            ? data.categories.split(",").map((c) => c.trim())
            : [],
        });

        setExistingMedia(data.image || []);
        setMediaToKeep((data.image || []).map((item) => item.image));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e) => {
    setNewMedia((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleRemoveExistingMedia = (url) => {
    setMediaToKeep((prev) => prev.filter((m) => m !== url));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("Updating blog...");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("body", formData.body);
    data.append("imagesToKeep", JSON.stringify(mediaToKeep));
    data.append("categories", JSON.stringify(formData.categories));
    console.log("Fetched categories:", formData.categories);

    newMedia.forEach((file) => {
      data.append("files", file);
    });

    try {
      const res = await fetch(
        `https://qurioans.onrender.com/updateblog/${adminId}/${blogId}`,
        { method: "PUT", body: data }
      );

      if (!res.ok) throw new Error("Failed to update blog");

      const result = await res.json(); // If the API returns JSON
      setMessage("Blog updated successfully!");
      alert("✅ Blog updated successfully!");
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setMessage(`Update failed: ${errorMessage}`);
      alert(`❌ Update failed: ${errorMessage}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://qurioans.onrender.com/delete/${adminId}/${blogId}`
      );
      setMessage("Blog deleted successfully!");
      setTimeout(() => {
        window.location.href = `/admin/dashboard/${adminId}`;
      }, 1500);
    } catch (err) {
      setMessage(
        `Delete failed: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <>
        <DashNav />
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
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashNav />
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <DashNav />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Edit Blog Post</h2>

        {message && (
          <div className="mb-4 text-center text-sm font-medium text-blue-600">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Body</label>
            <ReactQuill
              theme="snow"
              value={formData.body}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, body: value }))
              }
              modules={quillModules}
              formats={quillFormats}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Category *</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const selected = formData.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        categories: selected
                          ? prev.categories.filter((c) => c !== cat)
                          : [...prev.categories, cat],
                      }))
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                      selected
                        ? "bg-purple-600 text-white border-purple-700"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Click categories to select or unselect. Multiple can be selected.
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-1">Existing Media</label>
            <div className="flex flex-wrap gap-4">
              {existingMedia.map((item, index) =>
                mediaToKeep.includes(item.image) ? (
                  <div key={index} className="relative w-24 h-24">
                    {item.image.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        src={item.image}
                        controls
                        className="w-full h-full object-cover rounded-md border"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt="media"
                        className="w-full h-full object-cover rounded-md border"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingMedia(item.image)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ) : null
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Upload New Images or Videos
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="w-full"
            />
            {newMedia.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {newMedia.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <div key={index} className="w-24 h-24">
                      {file.type.startsWith("video/") ? (
                        <video
                          src={url}
                          controls
                          className="w-full h-full object-cover rounded-md border"
                        />
                      ) : (
                        <img
                          src={url}
                          alt="new"
                          className="w-full h-full object-cover rounded-md border"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`${
              updating
                ? "bg-purple-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white px-5 py-2 rounded-md shadow flex items-center justify-center gap-2`}
          >
            {updating && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {updating ? "Updating..." : "Update Blog"}
          </button>

          <p
            onClick={handleDelete}
            className={`mt-3 ml-4 text-sm ${
              deleting
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-600 hover:underline"
            }`}
            style={{ pointerEvents: deleting ? "none" : "auto" }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BlogEditor;
