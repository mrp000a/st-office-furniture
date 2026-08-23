"use client";

import { Button } from "@/components/ui/button";
// import VideoPlayer from "@/components/ui/youtubePlayer";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  DeleteIcon,
  Trash2,
} from "lucide-react";
import { coreInfo } from "@/components/data/core";
import { useState } from "react";
import styles from "./home.module.css";

const Home = () => {
  const session = useSession();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const uploadImages = [
    "r2upload/products/images/9d3ee168-12d5-486f-bff7-80b4656fe464.jpg",
    "r2upload/products/images/fde30768-846b-4aae-a6e8-9bc2c3625c13.jpg",
    "r2upload/products/images/7c32816c-51a6-48b7-b92e-ecb255a13f43.jpeg",
    "r2upload/products/images/0d9e246f-c9a2-421b-aab1-f33a4c000560.jpg",
  ];

  const handleThumbnailClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index); // Moves the main slider to the target index
    }
  };

  return (
    <div>
      {/* hero section  */}
      <section className="py-2">
        <div className=" rounded-md  overflow-hidden w-full max-w-384 max-[600]:max-h-full    mx-auto aspect-[640/256] bg-background shadow-2xl relative flex-center">
          {/* <Swiper
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setActiveIndex(() => swiper.realIndex);
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="h-full rounded-lg"
          >
            {coreInfo.images.map((item, index) => (
              <SwiperSlide
                key={index}
                className={`flex w-full h-full items-center justify-center text-2xl font-bold `}
              >
                <div
                  className={` relative  h-full w-full  overflow-hidden text-shadow-2xs text-shadow-blue-primary `}
                >
                  <Image
                    fill
                    className={`object-contain object-center overflow-hidden  relative w-200 h-300 `}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={
                      typeof item === "string"
                        ? item.startsWith("r2upload/")
                          ? `${process.env.NEXT_PUBLIC_URL_R2}/${item}`
                          : item
                        : item
                    }
                    alt={typeof item === "string" ? item : "image of product"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}
          
          {/* change button  */}
          {/* <div className="text-4xl font-bold flex-center">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="showPrevSlide absolute left-0 z-20  bg-gray-secondary/50 rounded-md px-3 py-5 backdrop-blur-md"
            >
              <ChevronLeft className="" />
            </button>
            <button
              onClick={() => {
                swiperInstance?.slideNext();
              }}
              className="showPrevSlide absolute right-0 z-20  bg-gray-secondary/50 rounded-md px-3 py-5 backdrop-blur-md"
            >
              <ChevronRight />
            </button>
          </div> */}

          {/* <div className="absolute flex-center flex-col gap-2 h-full w-full ">
            <h2
              className={`absolute bottom-20 left-3 z-30 font-bold text-3xl text-foreground/80 bg-background/40 backdrop-blur-md px-3 py-2 rounded-md ${styles.slideTrack}`}
            >
              {coreInfo.name.toUpperCase()}
            </h2>
            <p className="absolute bottom-3 left-3 z-30 font-semibold text-gray-primary bg-background/40 backdrop-blur-md px-3 py-2 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              aliquam, provident iste aut obcaecati esse nobis ipsum, a enim,
              blanditiis voluptatem maxime magni.
            </p>
          </div> */}
        </div>
      </section>

      {/* next section  */}
      <section></section>

      <div className="w-full max-w-300">
        {/* <VideoPlayer  url="https://youtu.be/ozrwrDpYkuk?si=HpOWaoNWdikQxa2Y" /> */}
        {/* <VideoPlayer url="https://www.pexels.com/download/video/6672457/" /> */}
      </div>
    </div>
  );
};

export default Home;
