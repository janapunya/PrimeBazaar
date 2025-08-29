import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// modules
import { EffectCoverflow, Pagination,Autoplay } from "swiper/modules";

export default function App() {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/076c4f2ee87225d7.jpg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/076c4f2ee87225d7.jpg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/076c4f2ee87225d7.jpg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/076c4f2ee87225d7.jpg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/076c4f2ee87225d7.jpg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/076c4f2ee87225d7.jpg?q=60",
  ];

  return (
    <div className="h-[40vh] flex items-center justify-center ">
      {/* Swiper container should be wide enough (use w-full and a max-width) */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 10,
          stretch: 2,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 2000, // 2 sec per slide
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full h-full py-12 "
      >
        {images.map((img, i) => (
          <SwiperSlide
            key={i}
            style={{

              width: "min(100vw, 90vw)",
              height: "min(80vh,40vh)",
            }}
            className="rounded-xl overflow-hidden  flex items-center justify-center object-cover "
          >
            <img
              src={`${img}`}
              alt={`Nature ${i + 1}`}
              className="w-full h-full object-cover block"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
