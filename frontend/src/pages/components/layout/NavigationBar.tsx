import { Menu, ChevronDown, User2Icon } from 'lucide-react';
import Sidebar from '../../components/layout/SideBar';
import Link from 'next/link';
import { AuthContext } from '../../../contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';

const NavigationBar = () => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { isAuthenticated, getUserInfo } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState<any>(null); // Replace `any` with a proper type if known
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          const user = await getUserInfo();
          setUserInfo(user);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, [isAuthenticated, getUserInfo]);

  return(
      <>  
       <nav className="fixed top-0 left-0 right-0 bg-sky-900 shadow-lg z-50">
        <div className="w-full px-4 h-16 flex justify-between items-center">      
          <div className="flex items-center gap-2">
            <button 
              className="text-white p-2 hover:bg-teal-700 rounded-md" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="w-18 h-9 rounded flex items-center">
              <img src="/images/dashboard/logo-icon.png" alt="logo" className="w-18 h-9" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">EveBox</span>
          </div>
         
          <div className="flex items-center gap-2 sm:gap-4">
           <div className="relative z-50">
              <button 
                className="flex items-center gap-1 sm:gap-2 text-white p-2 hover:bg-teal-700 rounded-md"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <img src="/images/dashboard/vietnam-icon.png" alt="flag" className="w-8 sm:w-12 h-7" />
                <span className="hidden sm:inline">VI</span>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>
             
              {isLangOpen && (
                 <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg py-1 w-32">
                  <div className="relative bg-white rounded-md overflow-hidden">
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full">
                    <img src="/images/dashboard/vietnam-icon.png" alt="English" className="w-8 h-6 rounded" />
                    <span className="text-gray-700">EN</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full">
                    <img src="/images/dashboard/vietnam-icon.png" alt="Vietnamese" className="w-8 h-6 rounded" />
                    <span className="text-gray-700">VI</span>
                  </button>
                </div>
                </div>

              )}
            </div>
            {!isAuthenticated ? (
            <div>
            <Link style={{ textDecoration: 'none' }} href="/login">
               <button className="text-white hover:text-teal-100 text-sm sm:text-base">Đăng nhập</button>
            </Link>
            
             <Link style={{ textDecoration: 'none' }} href="/register">
              <button className="ml-4 bg-teal-200 text-teal-950 px-3 sm:px-4 py-2 rounded-md hover:bg-teal-50 text-sm sm:text-base">
                 Đăng ký
              </button>
            </Link>
            </div>
            ) : (
              <div className="flex items-center">
  <h3 className="mr-2">
    <button className="text-white hover:text-teal-100 text-sm sm:text-base">
      {userInfo?.name}
    </button>
  </h3>
  <User2Icon className='bg-white rounded-full' size={24} />
</div>
            )}
          </div>
        </div>
      </nav>

      {/* Add a spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-16"></div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
    );
};

export default NavigationBar;