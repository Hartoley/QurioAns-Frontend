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
    <form
      onSubmit={handleSubmit}
      className="mt-20 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      {/* Title */}
      <div>
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="title"
        >
          Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Enter your blog title"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="subtitle"
        >
          Subtitle
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleInputChange}
          placeholder="Optional subtitle"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
        />
      </div>

      {/* Body with ReactQuill */}
      <div>
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="body"
        >
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
          placeholder="Write your blog content here..."
          style={{
            minHeight: "500px",
            maxHeight: "800px",
            overflowY: "auto",
            borderRadius: "0.375rem",
          }}
          className="mb-2"
        />
      </div>

      {/* Categories checkboxes */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Categories
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50">
          {categoriesList.map((cat) => (
            <label
              key={cat}
              className="flex items-center space-x-2 text-sm cursor-pointer hover:text-purple-700 transition"
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
        <label className="block text-gray-700 font-semibold mb-2">
          Upload Media
        </label>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleMediaChange}
          className="block border border-gray-300 rounded-md p-2 w-full text-gray-600"
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
                  className="w-12 h-12 object-cover rounded border"
                />
              ) : (
                <img
                  key={idx}
                  src={url}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded border"
                />
              );
            })}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-md font-semibold transition hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {submitting ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
};

export default CreateBlog;
