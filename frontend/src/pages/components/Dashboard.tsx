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

  return (
    <div className="min-h-screen flex flex-col">
       <NavigationBar />
      <div className="flex justify-center mt-8">
        <div className="relative w-5/6  overflow-hidden rounded-lg">
          {/* Slides */}
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
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
                  <h2 className="text-6xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-4xl">{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* Search Controls */}
          <div className="absolute bottom-0 left-0 right-0 mx-auto w-11/12 px-10">
            <div className="bg-sky-900 text-white p-6 rounded-lg shadow-lg">
              <div className="flex gap-4">
                <div className="flex-1 text-left">
                  <label className="text-sm font-medium mb-2 ">Loại sự kiện</label>
                  <div className="mt-2 relative">
                  <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                    <option>Chọn địa điểm</option>
                    <option>Hà Nội</option>
                    <option>TP.HCM</option>
                    <option>Đà Nẵng</option>
                  </select>
                  <ChevronDown 
                    size={16} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
                </div>
                <div className="flex-1 text-left">
                  <label className=" text-sm font-medium mb-2">Địa điểm</label>
                  <div className="mt-2 relative">
                  <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                    <option>Chọn địa điểm</option>
                    <option>Hà Nội</option>
                    <option>TP.HCM</option>
                    <option>Đà Nẵng</option>
                  </select>
                  <ChevronDown 
                    size={16} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
                </div>
                <div className="flex-1 text-left">
                  <label className=" text-sm font-medium mb-2">Thời gian</label>
                  <div className="mt-2 relative">
                  <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                    <option>Chọn ngày và giờ</option>
                    <option>Hôm nay</option>
                    <option>Tuần này</option>
                    <option>Tháng này</option>
                  </select>   
                  <ChevronDown 
                    size={16} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  </div>
                </div>

                <div className='flex items-end'>
                <label className=" text-white text-sm block mb-2">&nbsp;</label>
                <button className="h-10 w-14 bg-teal-400 hover:bg-teal-300 rounded flex items-center justify-center">
                  <Search size={20} className="text-white" />
                </button>
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className=" flex justify-center mt-8">
      <div className="relative w-5/6 overflow-hidden rounded-lg">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Sự kiện <span className="text-teal-400">Đặc biệt</span>
          </h2>
          <div className="flex gap-4">
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>Ngày trong tuần</option>
            </select>
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>Loại sự kiện</option>
            </select>
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>Thể loại</option>
            </select>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-3 gap-7">
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
                <div className="flex justify-between items-center mb-2 text-sm">
                  <time className="text-teal-500">20:00 - 23:00, 25 tháng 10, 2024</time>
                  <span className={`rounded-lg bg-emerald-200 px-4 font-medium ${index % 2 === 0 ? 'text-sky-950	' : 'text-sky-950	'}`}>
                    {index % 2 === 0 ? 'Miễn phí' : 'Từ 950.000đ'}
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

      <Footer />
    </div>
  );
};

export default Dashboard;
