'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface EventSliderProps {
  title: string;
  subtitle?: string;
  showViewMore?: boolean;
  events: number[];
}

const EventSlider = ({ title, subtitle, showViewMore = false, events }: EventSliderProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">
          {title} {subtitle && <span className="text-teal-400">{subtitle}</span>}
        </h2>
        {showViewMore && (
          <a
            href="#"
            className="text-teal-500 hover:text-teal-700 text-sm md:text-base flex items-center gap-1 transition-colors duration-300"
          >
            Xem thêm <span>&rarr;</span>
          </a>
        )}
      </div>

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
        {events.map((_, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#0C4762] rounded-lg overflow-hidden shadow-md transition-shadow">
              <div className="flex items-center justify-center aspect-[13/9] overflow-hidden">
                <img
                  src="/images/dashboard/card_pic.png"
                  alt="Event"
                  className="object-cover hover:scale-105 transition-transform duration-300 padding-30"
                />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-left text-base mb-3 line-clamp-2 leading-tight text-white">
                  Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trường
                </h3>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-[14px]">
                  <time className="text-left text-teal-500">
                    <span>20:00 - 23:00</span>
                    <br />
                    <span>25 tháng 10, 2024</span>
                  </time>
                  <span className={`rounded-lg bg-emerald-200 px-2 font-medium text-sky-950 text-center md:text-left`}>
                    {index % 2 === 0 ? "Miễn phí" : "950.000đ"}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <button className="custom-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
          <ChevronLeft className="text-3xl text-white hover:text-gray-900 transition-transform" />
        </button>
        <button className="custom-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
          <ChevronRight className="text-3xl text-white hover:text-gray-900 transition-transform" />
        </button>
      </Swiper>
    </>
  );
};

export default EventSlider;