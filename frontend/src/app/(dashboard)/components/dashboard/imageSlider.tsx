"use client"
console.log('image-slider - Rendering on client:', typeof window !== 'undefined');

import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageSliderProps } from "../../libs/interface/dashboard.interface";



const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
              <h2 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4 text-center">{slide.title}</h2>
              <p className="text-2xl md:text-4xl text-center">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-opacity-30 p-1 md:p-2 rounded-full hover:bg-opacity-50 transition-all"
      >
        <ChevronLeft size={20} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-opacity-30 p-1 md:p-2 rounded-full hover:bg-opacity-50 transition-all"
      >
        <ChevronRight size={20} className="text-white" />
      </button>
    </div>
  );
};

export default ImageSlider;
