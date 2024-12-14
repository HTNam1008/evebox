// src/pages/dashboard.tsx
import { useState, useEffect } from 'react';
import '../../../public/styles/admin/pages/Dashboard.css';
import React from 'react';
import 'tailwindcss/tailwind.css';
import NavigationBar from '../../pages/components/layout/NavigationBar';
import Footer from '../../pages/components/layout/Footer';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import DatePicker from '@/components/DatePicker';

const Dashboard = () => {
  //const { user, logout } = useContext(AuthContext);
  const events = [1, 2, 3, 4, 5, 6, 7, 8];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = ["Âm nhạc", "Kịch", "Học thuật", "Thể thao", "Workshop", "Hòa nhạc"];
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const locations = ["Hà Nội", "TP.HCM", "Đà Nẵng"];

  const slides = [
    {
      image: "/images/dashboard/presentation_pic.png",
      title: "MADE FOR THOSE",
      subtitle: "WHO DO"
    },
    {
      image: "/images/dashboard/presentation_pic.png",
      title: "DISCOVER EVENTS",
      subtitle: "NEAR YOU"
    },
    {
      image: "/images/dashboard/presentation_pic.png",
      title: "JOIN THE",
      subtitle: "COMMUNITY"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);



  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="w-full flex justify-center flex-col items-center px-4 md:mt-8">
          <div className="w-full md:w-5/6  relative">
            {/* Slideshow Container */}
            <div className="relative rounded-lg overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out h-[500px]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 relative">
                    <img src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center text-white">
                      <h2 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4  text-center">{slide.title}</h2>
                      <p className="text-2xl md:text-4xl  text-center">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-opacity-30 p-1 md:p-2 rounded-full hover:bg-[#f2f2f2] hover:bg-opacity-20 transition-all"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2  bg-opacity-30 p-1 md:p-2 rounded-full hover:bg-[#f2f2f2] hover:bg-opacity-20 transition-all"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
            {/* Search Controls */}
            <div className="absolute left-0 right-0 -bottom-20 mx-auto w-full md:w-11/12 px-4">
              <div className="bg-sky-900 text-white p-4 md:p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-[1.5] text-left">
                    <label className="text-sm font-medium mb-2">Tên sự kiện, diễn giả, ...</label>
                    <div className="mt-2 relative">
                      <input className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8 small-text" type="text"
                        placeholder="Nhập tên sự kiện, diễn giả...">

                      </input>
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <label className="text-sm font-medium mb-2">Loại sự kiện</label>
                    <div className="mt-2 relative">
                      <button
                        onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                        className="w-full bg-white border border-gray-300 rounded p-2 flex justify-between items-center text-gray-500 small-text"
                      >
                        <span>
                          {selectedOptions.length > 0
                            ? selectedOptions.join(", ")
                            : "Chọn loại sự kiện"}
                        </span>
                        <ChevronDown size={16} className="text-gray-500" />
                      </button>

                      {/* Dropdown menu */}
                      {isEventTypeOpen && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg text-[#0C4762] small-text">
                          {options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center p-2 hover:bg-[#0C4762] hover:bg-opacity-[0.31] cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => toggleOption(option)}
                                className="mr-2"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <label className="text-sm font-medium mb-2">Địa điểm</label>
                    <div className="mt-2 relative">
                      <button
                        onClick={() => setIsLocationOpen(!isLocationOpen)}
                        className="w-full bg-white border border-gray-300 rounded p-2 flex justify-between items-center text-gray-500 small-text"
                      >
                        <span>
                          {selectedLocation ? selectedLocation : "Chọn địa điểm"}
                        </span>
                        <ChevronDown size={16} className="text-gray-500" />
                      </button>

                      {/* Dropdown menu */}
                      {isLocationOpen && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg text-[#0C4762] small-text">
                          {locations.map((location) => (
                            <div
                              key={location}
                              className="p-2 hover:bg-[#0C4762] hover:bg-opacity-[0.31] cursor-pointer"
                              onClick={() => {
                                setSelectedLocation(location);
                                setIsLocationOpen(false);
                              }}
                            >
                              {location}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-[1.5] text-left">
                    <label className="text-sm font-medium mb-2">Thời gian</label>
                    <div className="mt-2 relative">
                      <DatePicker />
                    </div>
                  </div>
                  <div className="flex md:items-end">
                    <button className="w-full md:w-14 h-10 bg-teal-400 hover:bg-teal-300 rounded flex items-center justify-center">
                      <Search size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="mt-36"></div>


        <div className="flex justify-center mt-8 px-4">
          <div className="w-full md:w-5/6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
              <h2 className="text-xl md:text-2xl font-bold">
                Sự kiện <span className="text-teal-400">Đặc biệt</span>
              </h2>
            </div>

            {/* Event Cards Slider */}
            <Swiper
              slidesPerView={4} // Hiển thị 4 thẻ mỗi lần
              slidesPerGroup={4}
              spaceBetween={10} // Khoảng cách giữa các thẻ
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
                        className="w-[90%] h-[90%] object-cover hover:scale-105 transition-transform duration-300 padding-30"
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
                        <span
                          className={`rounded-lg bg-emerald-200 px-2 font-medium text-sky-950 text-center md:text-left`}
                        >
                          {index % 2 === 0 ? "Miễn phí" : "950.000đ"}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Buttons */}
              <button className="custom-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
                <ChevronLeft className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
              <button className="custom-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all ">
                <ChevronRight className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
            </Swiper>

            {/* Type - 2 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 mt-8 gap-4">
              <h2 className="text-xl md:text-2xl font-bold">
                Sự kiện <span className="text-teal-400">Đặc sắc</span>
              </h2>
            </div>

            {/* Event Cards Slider */}
            <Swiper
              slidesPerView={4} // Hiển thị 4 thẻ mỗi lần
              slidesPerGroup={4}
              spaceBetween={10} // Khoảng cách giữa các thẻ
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
                        className="w-[90%] h-[90%] object-cover hover:scale-105 transition-transform duration-300 padding-30"
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
                        <span
                          className={`rounded-lg bg-emerald-200 px-2 font-medium text-sky-950 text-center md:text-left`}
                        >
                          {index % 2 === 0 ? "Miễn phí" : "950.000đ"}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Buttons */}
              <button className="custom-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
                <ChevronLeft className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
              <button className="custom-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all ">
                <ChevronRight className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
            </Swiper>

            {/* Type - 3 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 mt-8 gap-4">
              <h2 className="text-xl md:text-2xl font-bold">
                Sân khấu & Nghệ thuật
              </h2>
              <a
                href="#"
                className="text-teal-500 hover:text-teal-700 text-sm md:text-base flex items-center gap-1 transition-colors duration-300"
              >
                Xem thêm <span>&rarr;</span>
              </a>
            </div>

            {/* Event Cards Slider */}
            <Swiper
              slidesPerView={4} // Hiển thị 4 thẻ mỗi lần
              slidesPerGroup={4}
              spaceBetween={10} // Khoảng cách giữa các thẻ
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
                        className="w-[90%] h-[90%] object-cover hover:scale-105 transition-transform duration-300 padding-30"
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
                        <span
                          className={`rounded-lg bg-emerald-200 px-2 font-medium text-sky-950 text-center md:text-left`}
                        >
                          {index % 2 === 0 ? "Miễn phí" : "950.000đ"}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Buttons */}
              <button className="custom-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
                <ChevronLeft className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
              <button className="custom-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all ">
                <ChevronRight className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
            </Swiper>

            {/* Type - 4 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 mt-8 gap-4">
              <h2 className="text-xl md:text-2xl font-bold">
                Thể loại khác
              </h2>
              <a
                href="#"
                className="text-teal-500 hover:text-teal-700 text-sm md:text-base flex items-center gap-1 transition-colors duration-300"
              >
                Xem thêm <span>&rarr;</span>
              </a>
            </div>

            {/* Event Cards Slider */}
            <Swiper
              slidesPerView={4} // Hiển thị 4 thẻ mỗi lần
              slidesPerGroup={4}
              spaceBetween={10} // Khoảng cách giữa các thẻ
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
                        className="w-[90%] h-[90%] object-cover hover:scale-105 transition-transform duration-300 padding-30"
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
                        <span
                          className={`rounded-lg bg-emerald-200 px-2 font-medium text-sky-950 text-center md:text-left`}
                        >
                          {index % 2 === 0 ? "Miễn phí" : "950.000đ"}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Buttons */}
              <button className="custom-swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
                <ChevronLeft className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
              <button className="custom-swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full hover:bg-white hover:bg-opacity-20 transition-all ">
                <ChevronRight className="text-3xl text-white hover:text-gray-900 transition-transform" />
              </button>
            </Swiper>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
