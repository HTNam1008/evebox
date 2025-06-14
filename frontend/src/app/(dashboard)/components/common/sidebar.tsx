"use client"

import Link from 'next/link';
import { User, Ticket, Calendar, LogOut, Lock } from 'lucide-react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { SidebarProps } from '../../libs/interface/dashboard.interface';
import { useTranslations } from "next-intl";
import { gatewayService } from '@/services/instance.service';

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations("common");

  const handleLogout = async () => {
    if (!session?.user?.accessToken) {
      console.error('No token found');
      return;
    }

    setLoading(true);
    try {
      await gatewayService.post('/api/user/logout', {
        refresh_token: session.user.refreshToken
      });
      
/*       // Clear cookies on client side
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }); */

      // Clear client session and redirect
      await signOut({ redirect: false });
      window.location.href = "/"; 
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: <User size={20} />, text: t("accountManagement"), href: '/my-profile' },
    { icon: <Ticket size={20} />, text: t("ticketManagement"), href: '/ticket' },
    { icon: <Calendar size={20} />, text: t("createEvent"), href: '/organizer/create-event' },
    { icon: <Lock size={20} />, text: t("changePassword"), href: '/change-password' },
    { icon: <LogOut size={20} />, text: t("logout"), onClick: handleLogout },  // Sửa để sử dụng button
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-sky-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4">
          <div className='flex flex-row justify-between items-center'>
            <h2 className="text-xl sm:text-2xl font-bold m-0 p-0">{t("sidebarTitle") || "Fallback Text"}</h2>
            <button
              className="text-white p-2 hover:bg-teal-700 rounded-md"
              onClick={onClose}
            >
              <Menu size={24} />
            </button>
          </div>
          <nav>
            <ul className="space-y-3 sm:space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="no-underline text-white flex items-center gap-3 py-2 px-3 sm:px-4 hover:bg-sky-800 rounded-md transition-colors text-sm sm:text-base"
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  ) : (
                    // Dùng button cho mục Đăng xuất
                    <button
                      onClick={item.onClick}
                      disabled={loading}
                      className="no-underline text-white flex items-center gap-3 py-2 px-3 sm:px-4 hover:bg-sky-800 rounded-md transition-colors text-sm sm:text-base"
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
