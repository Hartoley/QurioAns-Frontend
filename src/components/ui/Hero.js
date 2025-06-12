import React from "react";
import { motion } from "framer-motion";

const blogItems = [
  {
    title: "The Future of Remote Work",
    description:
      "Discover how digital nomads and hybrid workspaces are reshaping careers.",
    button: "Read More",
    image:
      "https://i.pinimg.com/736x/af/40/07/af40078b691801596a68301bbe68eec2.jpg",
  },
  {
    title: "Top 10 Productivity Tools in 2025",
    description:
      "Boost your workflow with these cutting-edge apps and systems.",
    button: "Explore Tools",
    image:
      "https://i.pinimg.com/736x/52/6b/09/526b099537ed5d2e831e4c887283cdef.jpg",
  },
  {
    title: "Building a Mindful Morning Routine",
    description:
      "Start your day intentionally with these science-backed habits.",
    button: "Start Now",
    image:
      "https://i.pinimg.com/736x/80/1d/8a/801d8a11fbd70ed5e520fbfedba97886.jpg",
  },
];

const Hero = () => {
  return (
    <section className="z-20 sm:px-20 min-h-screen px-6 py-20 bg-gradient-to-br from-[rgb(5,4,48)] to-[#202566] text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-2xl md:text-5xl text-pink-500 font-bold mb-4">
            Explore Our Latest Blog Posts
          </h1>
          <p className="text-white/70  text-orange-400 text-lg max-w-2xl mx-auto">
            Tips, trends, and insights curated for your growth, creativity, and
            clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {blogItems.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-40 bg-white/10 rounded-lg mb-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/80 mb-4">{item.description}</p>
              <button className="bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2 rounded-full text-sm font-medium hover:opacity-45 transition">
                {item.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
