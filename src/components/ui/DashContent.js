import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import UsersBlog from "./UsersBlog";

const DashContent = () => {
  const navigate = useNavigate();
  const { QurioUser } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);

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
      <div className="flex w-full sm:max-h-[200vh] h-auto items-center overflow-y-scroll scrollbar-hide sm:px-10 pt-20 py-8 sm:flex-row flex-col">
        <UsersBlog
          selectedTopic={selectedTopic}
          onClearTopic={() => setSelectedTopic(null)}
        />
        <SideNav onTopicClick={setSelectedTopic} />
      </div>
    </>
  );
};

export default DashContent;
