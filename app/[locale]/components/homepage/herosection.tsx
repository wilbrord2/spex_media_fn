"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState } from "react";
import { BusinesReviewData } from "@/app/constants";
import Image from "next/image";
import { motion } from "motion/react";

export function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [current, setCurrent] = useState(0);
  const totalSlides = BusinesReviewData.length;

  return (
    <div className="relative bg-primary w-full overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-full"
        setApi={(api) => {
          api?.on("select", () => setCurrent(api.selectedScrollSnap()));
        }}
      >
        <CarouselContent className="flex w-full max-w-full">
          {BusinesReviewData.map((data, index) => (
            <CarouselItem  key={index} className="w-full">
              <div className="relative flex h-[80vh] w-full items-center justify-center rounded-xl">
                <Image
                  src={data.img}
                  alt={data.title}
                  className="w-full h-full object-cover"
                  fill
                />
                <div className="absolute inset-0 bg-black/60 text-center flex flex-col items-center justify-center p-8 space-y-4">
                  <h2 className="text-3xl md:text-5xl max-w-2xl font-bold text-white drop-shadow-lg">
                    {data.title}
                  </h2>
                  <p className="hidden md:block text-lg md:text-xl max-w-3xl font-medium text-white drop-shadow-lg">
                    {data.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-10 max-sm:mx-4 sm:bottom-24 sm:left-1/2 sm:-translate-x-1/2 z-20 flex gap-4 max-sm:flex-wrap justify-center items-center">
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="cursor-pointer w-full px-6 py-3 bg-white text-primary font-semibold rounded-md shadow-md hover:bg-primary hover:text-white transition"
          >
            Explore Business Weekly Review
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="cursor-pointer w-full px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md shadow-md hover:bg-white hover:text-primary transition"
          >
            Our Advisory Services
          </motion.button>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4">
          <CarouselPrevious className="absolute left-2 sm:left-4 bg-white/60 hover:bg-white rounded-full shadow-md transition-all" />
          <CarouselNext className="absolute right-2 sm:right-4 bg-white/60 hover:bg-white rounded-full shadow-md transition-all" />
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
