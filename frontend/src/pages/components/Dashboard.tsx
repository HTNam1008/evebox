// src/pages/dashboard.tsx
import {useState, useEffect } from 'react';
import '../../../public/styles/admin/pages/Dashboard.css';
import React from 'react';
import 'tailwindcss/tailwind.css';
import NavigationBar from '../../pages/components/layout/NavigationBar';
import Footer from '../../pages/components/layout/Footer';
import { ChevronDown, ChevronLeft, ChevronRight ,Search } from 'lucide-react';
const Dashboard = () => {
  //const { user, logout } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "../../../images/dashboard/presentation_pic.png",
      title: "MADE FOR THOSE",
      subtitle: "WHO DO"
    },
    {
      image: "../../../images/dashboard/presentation_pic.png",
      title: "DISCOVER EVENTS",
      subtitle: "NEAR YOU"
    },
    {
      image: "../../../images/dashboard/presentation_pic.png",
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
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                  <h2 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4  text-center">{slide.title}</h2>
                  <p className="text-2xl md:text-4xl  text-center">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-opacity-30 p-1 md:p-2 rounded-full hover:bg-opacity-50 transition-all"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2  bg-opacity-30 p-1 md:p-2 rounded-full hover:bg-opacity-50 transition-all"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
          </div>
          {/* Search Controls */}
          <div className="absolute left-0 right-0 -bottom-20 mx-auto w-full md:w-11/12 px-4">
          <div className="bg-sky-900 text-white p-4 md:p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 text-left">
                  <label className="text-sm font-medium mb-2">Loại sự kiện</label>
                  <div className="mt-2 relative">
                    <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                      <option>Chọn địa điểm</option>
                      <option>Hà Nội</option>
                      <option>TP.HCM</option>
                      <option>Đà Nẵng</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"/>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <label className="text-sm font-medium mb-2">Địa điểm</label>
                  <div className="mt-2 relative">
                    <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                      <option>Chọn địa điểm</option>
                      <option>Hà Nội</option>
                      <option>TP.HCM</option>
                      <option>Đà Nẵng</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"/>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <label className="text-sm font-medium mb-2">Thời gian</label>
                  <div className="mt-2 relative">
                    <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                      <option>Chọn ngày và giờ</option>
                      <option>Hôm nay</option>
                      <option>Tuần này</option>
                      <option>Tháng này</option>
                    </select>   
                    <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"/>
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

      {/* Events Section */}
      <div className="flex justify-center mt-8 px-4">
        <div className="w-full md:w-5/6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-bold">
              Sự kiện <span className="text-teal-400">Đặc biệt</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <select className="px-4 py-2 border rounded-md text-sm w-full md:w-auto">
                <option>Ngày trong tuần</option>
              </select>
              <select className="px-4 py-2 border rounded-md text-sm w-full md:w-auto">
                <option>Loại sự kiện</option>
              </select>
              <select className="px-4 py-2 border rounded-md text-sm w-full md:w-auto">
                <option>Thể loại</option>
              </select>
            </div>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center aspect-[13/9] overflow-hidden">
                  <img 
                    src="/images/dashboard/card_pic.png" 
                    alt="Event" 
                    className="w-11/12 h-11/12 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-left text-base mb-3 line-clamp-2 leading-tight">
                    Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trường
                  </h3>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-sm">
                    <time className="text-left text-teal-500">20:00 - 23:00, 25 tháng 10, 2024</time>
                    <span className={`rounded-lg bg-emerald-200 px-4 font-medium text-sky-950 text-center md:text-left`}>
                      {index % 2 === 0 ? 'Miễn phí' : '950.000đ'}
                    </span>
                  </div>
                  <p className="mt-3 text-left text-xs text-gray-400">
                    SỰ KIỆN TRỰC TUYẾN - Tham dự ở bất cứ đâu
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 bg-teal-400 text-sky-950 rounded-md hover:bg-teal-300 transition-colors">
              Xem thêm...
            </button>
          </div>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );

};

export default Dashboard;
