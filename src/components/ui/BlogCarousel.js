import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    img: "https://i.pinimg.com/736x/2d/92/a7/2d92a7b405b63cf2d1335a74918149c6.jpg",
    title: "Ted Lasso",
    subtitle: "Comedy · Kindness makes a comeback.",
  },
  {
    img: "https://i.pinimg.com/736x/18/4d/86/184d86bc9b8e7a11071eedd29c7d1247.jpg",
    title: "Planet Earth",
    subtitle: "Documentary · Explore our world.",
  },
  {
    img: "https://i.pinimg.com/736x/b2/60/31/b2603141251d7682aefbe218972d6097.jpg",
    title: "Edge of Tomorrow",
    subtitle: "Action · Live. Die. Repeat.",
  },
  {
    img: "https://i.pinimg.com/736x/23/ef/6c/23ef6c7446508de2e83292f020bfea10.jpg",
    title: "Interstellar",
    subtitle: "Sci-Fi · A journey beyond the stars.",
  },
  ,
  {
    img: "https://i.pinimg.com/736x/0b/0f/a6/0b0fa6a186b3ad31acc69c3298ada50e.jpg",
    title: "Interstellar",
    subtitle: "Sci-Fi · A journey beyond the stars.",
  },
  ,
  {
    img: "https://i.pinimg.com/736x/a2/b5/4d/a2b54d3416a7e3039a11a59275ef6645.jpg",
    title: "Interstellar",
    subtitle: "Sci-Fi · A journey beyond the stars.",
  },
  ,
  {
    img: "https://i.pinimg.com/736x/96/0e/ee/960eeedd828ecc48fb6d9b45351d4e88.jpg",
    title: "Interstellar",
    subtitle: "Sci-Fi · A journey beyond the stars.",
  },
  ,
  {
    img: "https://i.pinimg.com/736x/e5/12/ef/e512efeb5c054a08860b3d7f1e333fcd.jpg",
    title: "Interstellar",
    subtitle: "Sci-Fi · A journey beyond the stars.",
  },
  ,
  {
    img: "https://i.pinimg.com/736x/75/39/38/7539380ec36371aa885c39ccc82190f0.jpg",
    title: "Interstellar",
    subtitle: "Sci-Fi · A journey beyond the stars.",
  },
  ,
  {
    img: "https://i.pinimg.com/736x/53/d7/46/53d74649874ea6f29c1cacc7ba4f91be.jpg",
    title: "Interstellar",
    subtitle: "Sci-Fi · A journey beyond the stars.",
  },
];

export default function HeroCarousel() {
  return (
    <div
      style={{
        width: "100%",
        padding: "2rem 0", // space top and bottom
        boxSizing: "border-box",
        overflow: "hidden", // prevent overflow
      }}
    >
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={"auto"}
        centeredSlides={true}
        pagination={{ clickable: true }}
        loop={true}
        style={{
          height: "55vh",
          padding: "0 3vw", // side padding for peek
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "35vw",
              height: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#000",
              flexShrink: 0,
            }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              style={{
                width: "100%",
                height: "100%",
                filter: "brightness(0.7)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                color: "#fff",
              }}
            >
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {slide.title}
              </h2>
              <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
                {slide.subtitle}
              </p>
              <button
                style={{
                  padding: "0.5rem 1.2rem",
                  borderRadius: "999px",
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Stream now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination {
          bottom: 8px !important;
          text-align: center;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          width: 12px;
          height: 12px;
          margin: 0 6px !important;
          border-radius: 50%;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: white;
          border: 2px solid #fff;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
