import { Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer = ()=>{
    return (
      <footer className="bg-sky-900 text-white mt-12 sm:mt-20 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">EveBox</h2>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              className="flex-1 px-4 py-2 rounded-md text-gray-800"
            />
            <button className="bg-teal-200 text-teal-950 px-4 sm:px-6 py-2 rounded-md hover:bg-teal-100">
              Nhận tin mới
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8">
          <a href="#" className="hover:text-teal-200 text-center">Trang chủ</a>
          <a href="#" className="hover:text-teal-200 text-center">Giới thiệu</a>
          <a href="#" className="hover:text-teal-200 text-center">Dịch vụ</a>
          <a href="#" className="hover:text-teal-200 text-center">Liên hệ</a>
          <a href="#" className="hover:text-teal-200 text-center">Hỏi đáp</a>
        </div>

        {/* Language and Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t-2 border-slate-400 pt-8 gap-4">
          <div className="flex gap-4">
            <button className="bg-teal-200 text-teal-950 px-4 sm:px-6 py-2 rounded-md">Tiếng Việt</button>
            <button className="hover:text-teal-200">English</button>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-200">
              <Linkedin size={20}  />
            </a>
            <a href="#" className="hover:text-teal-200">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-teal-200">
              <Facebook size={20}  />
            </a>
          </div>
          <div className="text-xs sm:text-sm text-center sm:text-right">
            Non Copyrighted © 2023 Upload by EveBox
          </div>
        </div>
      </div>
    </footer>
    )
};

export default Footer;