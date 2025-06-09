import React, { useState, useEffect } from "react";
import Footer from "../components/ui/Footer";
import DashNav from "../components/ui/DashNav";
import { useParams, useNavigate } from "react-router-dom";

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
          categories: data.categories || [],
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
    setMessage("Updating blog...");

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
        { method: "PUT", body: data }
      );

      if (!res.ok) throw new Error("Failed to update blog");

      setMessage("Blog updated successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage(`Update failed: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5003/delete/${adminId}/${blogId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete blog");
      }

      // Remove the deleted blog from state
      alert("Blog deleted successfully!");
    } catch (err) {
      alert("Error deleting blog: " + err.message);
    }
  };

  if (loading) {
    return (
      <>
        <DashNav />
        <div className="mt-20 text-center py-10 text-xl text-gray-700 animate-pulse">
          Loading blog editor...
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashNav />
        <div className="mt-20 text-center py-10 text-red-600 font-semibold">
          Error: {error}
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
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md h-40"
              required
            ></textarea>
          </div>

          {/* Category selection allowing multiple selection */}
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
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md shadow"
          >
            Update Blog
          </button>
          <button
            onClick={() => handleDelete()}
            className="mt-3 ml-4 text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BlogEditor;
