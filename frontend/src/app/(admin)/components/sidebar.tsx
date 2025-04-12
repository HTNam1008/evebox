'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarPlus, UserRoundCog, Ticket, FilePenLine, MapPin, TicketPercent, CircleDollarSign, ChartColumnIncreasing } from 'lucide-react';

const Sidebar = () => {
  const pathName = usePathname();
  const menuSections = [
    { text: 'Quản lý Account', href: '/admin/account-management', icon: <UserRoundCog size={20} /> },
    { text: 'Quản lý Sự kiện', href: '/admin/event-management', icon: <CalendarPlus size={20} /> },
    { text: 'Quản lý Showing', href: '/admin/showing-management', icon: <Ticket size={20} /> },
    { text: 'Cập nhật Sự kiện đặc biệt', href: '/admin/event-special', icon: <FilePenLine size={20} /> },
    { text: 'Quản lý Địa điểm', href: '/admin/location-management', icon: <MapPin size={20} /> },
    { text: 'Quản lý Voucher', href: '/admin/voucher-management', icon: <TicketPercent size={20} /> },
    { text: 'Quản lý Thanh toán', href: '/admin/payment-management', icon: <CircleDollarSign size={20} /> },
    { text: 'Quản lý Doanh thu', href: '/admin/revenue-management', icon: <ChartColumnIncreasing size={20} /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-sky-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-[#51DACF] text-transparent bg-clip-text">ADMIN CENTER</h2>
      <nav>
        <ul className="space-y-3">
          {menuSections.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
                  pathName === item.href ? "bg-sky-700" : "hover:bg-sky-800"
                }`}
              >
                {item.icon}
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;