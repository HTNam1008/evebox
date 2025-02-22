'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import Image from "next/image";


interface Event {
  id: number;
  title: string;
  startDate: string;
  status: string;
  Images_Events_imgLogoIdToImages?: { imageUrl: string };
  Images_Events_imgPosterIdToImages?: { imageUrl: string };
}

interface EventSliderProps {
  title: string;
  subtitle?: string;
  showViewMore?: boolean;
  events: Event[];
}

const EventSlider = ({ title, subtitle, events }: EventSliderProps) => {
  return (
    <div className="relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">
          {title} {subtitle && <span className="text-teal-400">{subtitle}</span>}
        </h2>
        {/* {showViewMore && (
          <a href="#" className="text-teal-500 hover:text-teal-700 text-sm md:text-base flex items-center gap-1 transition-colors duration-300">
            Xem thêm <span>&rarr;</span>
          </a>
        )} */}
      </div>

      {/* Swiper Slider */}
      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        className="mySwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <Link href={`/event/${event.id}`}>
              <div className="bg-[#0C4762] rounded-lg overflow-hidden shadow-md transition-shadow">
                <div className="flex items-center justify-center aspect-[13/9] overflow-hidden">
                  <Image
                    src={event.Images_Events_imgPosterIdToImages?.imageUrl || '/images/dashboard/card_pic.png'}
                    alt={event.title}
                    className="w-full object-cover hover:scale-105 transition-transform duration-300 padding-30"
                    width={160}
                    height={120}
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-left text-base mb-3 line-clamp-2 leading-tight text-white">
                    {event.title}
                  </h3>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-[14px]">
                    <time className="text-left text-teal-500">
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </time>
                    <span className={`rounded-lg bg-emerald-200 px-2 font-medium text-sky-950 text-center md:text-left`}>
                      {event.status === 'free' ? "Miễn phí" : "950.000đ"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <button className="custom-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
          <ChevronLeft className="text-3xl text-white hover:text-gray-900 transition-transform" />
        </button>
        <button className="custom-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
          <ChevronRight className="text-3xl text-white hover:text-gray-900 transition-transform" />
        </button>
      </Swiper>
    </div>
  );
};

export default EventSlider;
