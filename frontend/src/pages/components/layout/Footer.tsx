import { Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer = ()=>{
    return (
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
    )
};

export default Footer;