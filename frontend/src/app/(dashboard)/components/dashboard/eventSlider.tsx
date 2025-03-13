'use client';

/* Package System */
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import Image from 'next/image';

/* Package Application */
import { Event } from '../../libs/interface/dashboard.interface';
import '@/styles/admin/eventSlider.css';

type NavigationOptionsTyped = {
  prevEl?: HTMLElement | null;
  nextEl?: HTMLElement | null;
};

interface EventSliderProps {
  title: string;
  subtitle?: string;
  showViewMore?: boolean;
  events: Event[];
}

const EventSlider = ({ title, subtitle, events }: EventSliderProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const navigation = swiperInstance?.params.navigation as NavigationOptionsTyped;

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, prevRef, nextRef, navigation]);

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">
          {title}{' '}
          {subtitle && <span className="text-teal-400">{subtitle}</span>}
        </h2>
      </div>

      {/* Swiper Slider */}
      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={10}
        modules={[Navigation]}
        onSwiper={setSwiperInstance}
        // navigation={true}
        style={{
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          display: 'flex',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="mySwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className="h-full">
            <Link href={`/event/${event.id}`}>
              <div className="bg-[#0C4762] rounded-lg overflow-hidden shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center justify-center p-2 w-full h-auto overflow-hidden">
                  <Image
                    src={
                      event.Images_Events_imgPosterIdToImages?.imageUrl ||
                      '/images/dashboard/card_pic.png'
                    }
                    alt={event.title}
                    className="w-full aspect-video object-cover rounded-lg hover:scale-110 transition-transform duration-300 padding-30"
                    width={140}
                    height={100}
                  />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="font-bold text-left text-sm mb-2 text-white line-clamp-2 min-h-[36px] leading-tight">
                    {event.title}
                  </h3>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-[14px]">
                    <time className="text-left text-teal-500">
                      <span>
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                    </time>
                    <span className="rounded-lg bg-emerald-200 px-2 font-medium text-sky-950 text-center md:text-left">
                      {event.status === 'free'
                        ? 'Miễn phí'
                        : 'Từ ' +
                        event.minTicketPrice.toLocaleString('vi-VN') +
                        'đ'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Các nút custom navigation */}
      <button ref={prevRef} className="custom-swiper-button-prev">
        <ChevronLeft />
      </button>
      <button ref={nextRef} className="custom-swiper-button-next">
        <ChevronRight />
      </button>
    </div>
  );
};

export default EventSlider;
