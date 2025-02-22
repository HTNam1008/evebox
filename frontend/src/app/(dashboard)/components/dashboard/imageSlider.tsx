"use client"
console.log('image-slider - Rendering on client:', typeof window !== 'undefined');

//Package System
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from "next/image";

//Package App
import { useFetchRecommendedEvents } from '@/app/(dashboard)/libs/hooks/useFetchRecommendedEvents';


const ImageSlider = () => {
  const { events, loading, error } = useFetchRecommendedEvents();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events]);

  if (loading) return <div>Loading recommended events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Image Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {events.map((event) => (
          <div key={event.id} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={event.Images_Events_imgPosterIdToImages?.imageUrl || '/images/default-image.jpg'}
              alt={event.title}
              className="w-full h-full object-cover"
              width={350}
              height={250}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-center">{event.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + events.length) % events.length)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-opacity-30 p-2 md:p-3 rounded-full hover:bg-opacity-50 transition-all"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % events.length)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-opacity-30 p-2 md:p-3 rounded-full hover:bg-opacity-50 transition-all"
      >
        <ChevronRight size={28} className="text-white" />
      </button>
    </div>
  );
};

export default ImageSlider;