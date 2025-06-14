import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const [blogItems, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = localStorage.getItem("QurioUser");

  const handleNavigate = (route) => {
    if (user) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

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

  if (loading) {
    return (
      <section className="z-20 sm:px-0 min-h-screen px-6 py-20 bg-gradient-to-br from-[rgb(5,4,48)] to-[#202566] text-white font-sans">
        <div className="max-w-9xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-xl md:text-4xl text-pink-500 font-bold mb-4">
              Explore Our Latest Blog Posts
            </h1>
            <p className="text-white/70 text-orange-400 text-md max-w-2xl mx-auto">
              Tips, trends, and insights curated for your growth, creativity,
              and clarity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-pulse"
              >
                <div className="w-full h-40 bg-white/10 rounded-lg mb-4"></div>
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded mb-4"></div>
                <div className="h-8 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  }

  return (
    <section className="z-20 sm:px-20 min-h-screen px-6 sm:py-20 py-5 bg-gradient-to-br from-[rgb(5,4,48)] to-[#202566] text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-xl md:text-4xl text-pink-500 font-bold mb-4">
            Explore Our Latest Blog Posts
          </h1>
          <p className="text-white/70 text-orange-400 text-md max-w-2xl mx-auto">
            Tips, trends, and insights curated for your growth, creativity, and
            clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {blogItems.slice(0, 6).map((item, i) => {
            let imageUrl = "https://via.placeholder.com/400x240?text=No+Image";
            if (Array.isArray(item.image) && item.image.length > 0) {
              imageUrl = item.image[0]?.image || imageUrl;
            } else if (
              item.image &&
              typeof item.image === "object" &&
              item.image.image
            ) {
              imageUrl = item.image.image;
            }

            // Truncate title to a maximum of 40 characters
            const truncatedTitle =
              item.title.length > 60
                ? `${item.title.substring(0, 60)}...`
                : item.title;

            return (
              <motion.div
                key={item._id}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-44 bg-white/10 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">{truncatedTitle}</h3>
                <p className="text-sm text-white/80 mb-3">{item.subtitle}</p>
                <button
                  onClick={() =>
                    handleNavigate(`/blog/${item.title}/${item._id}/${user}`)
                  }
                  className="bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2 rounded-full text-sm font-medium hover:opacity-45 transition"
                >
                  Read more
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
