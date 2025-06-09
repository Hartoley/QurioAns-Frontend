import React, { useState, useEffect } from "react";
import Footer from "../components/ui/Footer";
import DashNav from "../components/ui/DashNav";
import { useParams } from "react-router-dom";

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

const BlogEditor = () => {
  const { blogId } = useParams();
  const adminId = localStorage.getItem("adminId");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    body: "",
    categories: [],
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: string }
  const [existingMedia, setExistingMedia] = useState([]);
  const [mediaToKeep, setMediaToKeep] = useState([]);
  const [newMedia, setNewMedia] = useState([]);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setAlert(null);
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
          categories: data.categories || [],
        });
        setExistingMedia(data.image || []);
        setMediaToKeep((data.image || []).map((item) => item.image));
      } catch (err) {
        setAlert({ type: "error", message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (type === "select-multiple") {
      const selectedOptions = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedOptions.push(options[i].value);
        }
      }
      setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMediaChange = (e) => {
    setNewMedia((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleRemoveExistingMedia = (url) => {
    setMediaToKeep((prev) => prev.filter((m) => m !== url));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("body", formData.body);
    data.append("imagesToKeep", JSON.stringify(mediaToKeep));
    data.append("categories", JSON.stringify(formData.categories));
    newMedia.forEach((file) => {
      data.append("files", file);
    });

    try {
      const res = await fetch(
        `https://qurioans.onrender.com/updateblog/${adminId}/${blogId}`,
        {
          method: "PUT",
          body: data,
        }
      );
      if (!res.ok) throw new Error("Failed to update blog");
      await res.json();

      setAlert({ type: "success", message: "Blog updated successfully!" });
      // Optionally reset newMedia or reload the page after some delay
      setNewMedia([]);
      // Reload blog to reflect changes (optional)
      // window.location.reload();
    } catch (err) {
      setAlert({ type: "error", message: `Update failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashNav />
      <main className="mt-20 max-w-4xl mx-auto px-4 py-8 font-sans">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Edit Blog Post
        </h2>

        {loading && (
          <div className="flex justify-center items-center space-x-2 mb-6">
            <svg
              className="animate-spin h-8 w-8 text-purple-600"
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
            <span className="text-gray-700 text-lg">Loading...</span>
          </div>
        )}

        {alert && (
          <div
            className={`mb-6 px-4 py-3 rounded ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
            role="alert"
          >
            {alert.message}
          </div>
        )}

        {!loading && (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block font-semibold mb-1 text-gray-700"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="subtitle"
                className="block font-semibold mb-1 text-gray-700"
              >
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="block font-semibold mb-1 text-gray-700"
              >
                Body <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="categories"
                className="block font-semibold mb-1 text-gray-700"
              >
                Categories
              </label>
              <select
                id="categories"
                name="categories"
                multiple
                value={formData.categories}
                onChange={handleChange}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Hold Ctrl (Cmd on Mac) to select multiple
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Existing Media
              </label>
              <div className="flex flex-wrap gap-4">
                {existingMedia.map(
                  (item, idx) =>
                    mediaToKeep.includes(item.image) && (
                      <div
                        key={idx}
                        className="relative w-24 h-24 rounded overflow-hidden border border-gray-300"
                      >
                        {item.image.match(/\.(mp4|webm|ogg)$/i) ? (
                          <video
                            src={item.image}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={item.image}
                            alt="media"
                            className="w-full h-full object-cover"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingMedia(item.image)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
                          aria-label="Remove media"
                        >
                          &times;
                        </button>
                      </div>
                    )
                )}
                {mediaToKeep.length === 0 && (
                  <p className="text-gray-500 italic">
                    No existing media selected.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="newMedia"
                className="block font-semibold mb-2 text-gray-700"
              >
                Upload New Images or Videos
              </label>
              <input
                type="file"
                id="newMedia"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="block w-full text-gray-700"
              />
              {newMedia.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {newMedia.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div
                        key={index}
                        className="w-24 h-24 rounded overflow-hidden border border-gray-300"
                      >
                        {file.type.startsWith("video/") ? (
                          <video
                            src={url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={url}
                            alt="new media"
                            className="w-full h-full object-cover"
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
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
                loading
                  ? "bg-purple-300 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogEditor;
