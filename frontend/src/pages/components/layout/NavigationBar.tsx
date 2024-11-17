import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import Sidebar from '../../components/layout/SideBar';

const NavigationBar = () => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return(
      <>  
       <nav className="bg-sky-900 shadow-lg">
       <div className="mx-auto px-4 sm:px-6 lg:px-4 h-16 flex justify-between items-center">      
         <div className="flex items-center gap-2">
         <button className="text-white p-2 hover:bg-teal-700 rounded-md mr-4" onClick={() => setIsSidebarOpen(true)}>
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

       <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        />
     </>
    );
};

export default NavigationBar;