import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
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

const SideNav = ({ onTopicClick }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("QurioUser");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `https://qurioans.onrender.com/qurioans/recommendations/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch blogs!");
        const data = await res.json();
        setBlogs(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="sm:w-1/3 w-[95%] sm:h-[150vh] sm:max-h-full h-auto rounded-md border border-[rgb(6,4,52)] bg-white px-6 py-8 sm:overflow-y-auto scrollbar-hide text-black text-[15px] font-sans scrollbar-hide">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Top Picks</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading &&
        !error &&
        blogs.slice(0, 6).map((blog) => (
          <div key={blog._id} className="mb-8">
            {/* Author */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <div className="w-5 h-5 rounded-full bg-gray-300">
                <img
                  src={
                    blog?.createdBy?.avatarUrl ||
                    `https://i.pinimg.com/736x/ec/dd/5a/ecdd5aacabb70ecca9bfdaeec9ef2ba4.jpg`
                  }
                  alt="avatar"
                  className="w-5 h-5 rounded-full object-cover"
                />
              </div>
              <span>{blog.createdBy.userName || "Anonymous"}</span>
            </div>

            {/* Title */}
            <h3
              onClick={() =>
                navigate(`/blog/${blog.title}/${blog._id}/${userId}`)
              }
              className="text-[16px] font-bold leading-tight text-gray-900 hover:underline cursor-pointer"
            >
              {blog.title}
            </h3>

            {/* Date */}
            <p className="text-sm text-gray-500 mt-1">
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}

      {!loading && blogs.length > 6 && (
        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
          See the full list
        </p>
      )}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Recommended topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => onTopicClick(topic)}
              className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
