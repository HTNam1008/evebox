// src/pages/dashboard.tsx
import {useState, useEffect } from 'react';
import '../../../public/styles/admin/pages/Dashboard.css';
import React from 'react';
import 'tailwindcss/tailwind.css';
import { Menu, ChevronDown, ChevronLeft, ChevronRight, Linkedin, Instagram, Facebook ,Search } from 'lucide-react';
const Dashboard = () => {
  //const { user, logout } = useContext(AuthContext);
  const [isLangOpen, setIsLangOpen] = useState(false);
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
       {/* Navigation Bar */}
       <nav className="bg-sky-900 shadow-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-4 h-16 flex justify-between items-center">      
          <div className="flex items-center gap-2">
          <button className="text-white p-2 hover:bg-teal-700 rounded-md mr-4">
            <Menu size={24} />
          </button>
            <div className="w-18 h-9 rounded flex items-center justify-center">
              <img src="/images/dashboard/logo-icon.png" alt="flag" className="w-18 h-9" />
            </div>
            <span className="text-white font-bold text-xl">EveBox</span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Language Selector */}
             <div className="relative">
              <button 
                className="flex items-center gap-2 text-white p-2 hover:bg-teal-700 rounded-md"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <img src="/images/dashboard/vietnam-icon.png" alt="flag" className="w-12 h-7 mr-2" />
                <span>VI</span>
                <ChevronDown size={16} />
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg py-1 w-32">
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full">
                    <img 
                      src="/images/dashboard/vietnam-icon.png" 
                      alt="English flag" 
                      className="w-8 h-6 rounded"
                    />
                    <span className="text-gray-700">EN</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full">
                    <img 
                      src="/images/dashboard/vietnam-icon.png" 
                      alt="Vietnamese flag" 
                      className="w-8 h-6 rounded"
                    />
                    <span className="text-gray-700">VI</span>
                  </button>
                </div>
              )}
            </div>
            <button className="text-white hover:text-teal-100">Đăng nhập</button>
            <button className="bg-teal-200 text-teal-950 px-4 py-2 rounded-md hover:bg-teal-50">
              Đăng ký
            </button>
          </div>
        </div>
      </nav>

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
                <button className="h-10 w-10 bg-teal-400 hover:bg-teal-300 rounded flex items-center justify-center">
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

      

       {/* Footer */}
       <footer className="bg-sky-900 text-white mt-20 py-12">
        <div className="container mx-auto px-4">
          {/* Newsletter Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-8">EveBox</h2>
            <div className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="flex-1 px-4 py-2 rounded-md text-gray-800"
              />
              <button className="bg-teal-200 text-teal-950 px-6 py-2 rounded-md hover:bg-teal-100">
                Nhận tin mới
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="hover:text-teal-200">Trang chủ</a>
            <a href="#" className="hover:text-teal-200">Giới thiệu</a>
            <a href="#" className="hover:text-teal-200">Dịch vụ</a>
            <a href="#" className="hover:text-teal-200">Liên hệ</a>
            <a href="#" className="hover:text-teal-200">Hỏi đáp</a>
          </div>

          {/* Language and Social Links */}
          <div className="flex justify-between items-center border-t-2 border-slate-400	 pt-8">
            <div className="flex gap-4">
              <button className="bg-teal-200 text-teal-950 px-6 py-2 rounded-md">Tiếng Việt</button>
              <button className="hover:text-teal-200">English</button>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-teal-200">
                <Linkedin size={24} />
              </a>
              <a href="#" className="hover:text-teal-200">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-teal-200">
                <Facebook size={24} />
              </a>
            </div>
            <div className="text-sm">
              Non Copyrighted © 2023 Upload by EveBox
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
