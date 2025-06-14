import { React, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";

const slides = [
  {
    img: "https://i.pinimg.com/736x/2d/92/a7/2d92a7b405b63cf2d1335a74918149c6.jpg",
    title: "Mindset",
    subtitle: "Daily focus & personal growth",
  },
  {
    img: "https://i.pinimg.com/736x/18/4d/86/184d86bc9b8e7a11071eedd29c7d1247.jpg",
    title: "Planet",
    subtitle: "Eco living & sustainability",
  },
  {
    img: "https://i.pinimg.com/736x/b2/60/31/b2603141251d7682aefbe218972d6097.jpg",
    title: "Lifestyle",
    subtitle: "Bold moves & energy",
  },
  {
    img: "https://i.pinimg.com/736x/23/ef/6c/23ef6c7446508de2e83292f020bfea10.jpg",
    title: "Explorer",
    subtitle: "Adventure & wild escapes",
  },
  {
    img: "https://i.pinimg.com/736x/0b/0f/a6/0b0fa6a186b3ad31acc69c3298ada50e.jpg",
    title: "Dreamspace",
    subtitle: "Vision, goals & big ideas",
  },
  {
    img: "https://i.pinimg.com/736x/a2/b5/4d/a2b54d3416a7e3039a11a59275ef6645.jpg",
    title: "Design",
    subtitle: "Style, shapes & function",
  },
  {
    img: "https://i.pinimg.com/736x/96/0e/ee/960eeedd828ecc48fb6d9b45351d4e88.jpg",
    title: "Motion",
    subtitle: "Speed, power & fluidity",
  },
  {
    img: "https://i.pinimg.com/736x/e5/12/ef/e512efeb5c054a08860b3d7f1e333fcd.jpg",
    title: "Vibes",
    subtitle: "Night feel & ambiance",
  },
  {
    img: "https://i.pinimg.com/736x/75/39/38/7539380ec36371aa885c39ccc82190f0.jpg",
    title: "Calm",
    subtitle: "Balance & mental space",
  },
  {
    img: "https://i.pinimg.com/736x/53/d7/46/53d74649874ea6f29c1cacc7ba4f91be.jpg",
    title: "Minimal",
    subtitle: "Clean visuals, clear mind",
  },
];

export default function HeroCarousel() {
  const [user, setuser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("QurioUser");
    if (user) {
      setuser(user);
    }
  }, []);

  const handleNavigate = () => {
    if (user) {
      navigate(`/dashboard/${user}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="bg-[rgb(13,10,52)]"
      style={{
        width: "100%",
        padding: "2rem 1rem",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={"auto"}
        centeredSlides={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1500}
        loop={true}
        style={{
          height: "55vh",
          padding: "0 3vw",
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
            className="slide-item"
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
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button onClick={() => handleNavigate()}>Explore now</button>
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
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          top: 50%;
          transform: translateY(-50%);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px;
          font-weight: bold;
        }

        .slide-content {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          color: #fff;
        }
        .slide-content h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .slide-content p {
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .slide-content button {
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          background-color: #fff;
          color: #000;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }
      
        /* Mobile Styles */
        @media (max-width: 768px) {
          .swiper-slide {
            width: 100vw !important; /* full viewport width */
          }
          .slide-content h2 {
            font-size: 1.2rem !important;
          }
          .slide-content p {
            font-size: 0.8rem !important;
          }
          .slide-content button {
            padding: 0.4rem 1rem !important;
            font-size: 0.8rem !important;
          }
          /* Optional: reduce swiper container horizontal padding */
          .swiper {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
