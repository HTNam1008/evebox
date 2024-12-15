"use client"

import Link from 'next/link';
import { User, Ticket, Calendar, LogOut } from 'lucide-react';
import { Menu, ChevronDown } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: <User size={20} />, text: 'Quản lý tài khoản', href: '/account' },
    { icon: <Ticket size={20} />, text: 'Quản lý vé', href: '/tickets' },
    { icon: <Calendar size={20} />, text: 'Tạo sự kiện', href: '/create-event' },
    { icon: <LogOut size={20} />, text: 'Đăng xuất', href: '/logout' },
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
            <h2 className="text-xl sm:text-2xl font-bold m-0 p-0">QUẢN LÝ</h2>
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
                  <Link
                    href={item.href}
                    className="no-underline	text-white flex items-center gap-3 py-2 px-3 sm:px-4 hover:bg-sky-800 rounded-md transition-colors text-sm sm:text-base"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
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