import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    body: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const quillRef = useRef(null);
  const adminId = localStorage.getItem("adminId") || "yourAdminId";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleMediaChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  // ReactQuill modules for toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("body", formData.body);

      selectedCategories.forEach((cat) => data.append("categories", cat));

      mediaFiles.forEach((file) => data.append("media", file));

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
      alert("Blog created successfully!");
      setFormData({ title: "", subtitle: "", body: "" });
      setSelectedCategories([]);
      setMediaFiles([]);
    } catch (err) {
      alert("Error creating blog: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-full space-y-6">
      {/* Title */}
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

      {/* Subtitle */}
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

      {/* Body with ReactQuill */}
      <div>
        <label className="block font-medium mb-1" htmlFor="body">
          Body <span className="text-red-600">*</span>
        </label>
        <ReactQuill
          theme="snow"
          value={formData.body}
          onChange={(content) =>
            setFormData((prev) => ({ ...prev, body: content }))
          }
          modules={modules}
          ref={quillRef}
          style={{ minHeight: "200px" }}
          placeholder="Write your blog content here..."
        />
      </div>

      {/* Categories checkboxes */}
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
          submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
        }`}
      >
        {submitting ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
};

export default CreateBlog;
