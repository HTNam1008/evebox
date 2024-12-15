"use client"

import { Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
      <footer className="w-[100vw] bg-sky-900 text-white mt-12 sm:mt-20 py-8 sm:py-12 relative left-[calc(-50vw+50%)]">
        {/* Newsletter Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">EveBox</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2 px-4">
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              className="flex-1 px-4 py-2 rounded-md text-gray-800 w-full sm:w-auto"
            />
            <button className="bg-teal-200 text-teal-950 px-4 sm:px-6 py-2 rounded-md hover:bg-teal-100 whitespace-nowrap w-full sm:w-auto">
              Nhận tin mới
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
          <a href="#" className="no-underline	text-white over:text-teal-200">Trang chủ</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">Giới thiệu</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">Dịch vụ</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">Liên hệ</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">Hỏi đáp</a>
        </div>

        {/* Divider and Bottom Section */}
        <div className="border-t-2 border-slate-400">
          <div className="max-w-6xl mx-auto px-4 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-4">
                <button className="bg-teal-200 text-teal-950 px-4 py-2 rounded-md">Tiếng Việt</button>
                <button className="hover:text-teal-200">English</button>
              </div>
              <div className="flex gap-6">
                <a href="#" className="no-underline	text-white hover:text-teal-200">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="no-underline	text-white hover:text-teal-200">
                  <Instagram size={20} />
                </a>
                <a href="#" className="no-underline	text-white hover:text-teal-200">
                  <Facebook size={20} />
                </a>
              </div>
              <div className="text-xs sm:text-sm">
                Non Copyrighted © 2024 Upload by EveBox
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;