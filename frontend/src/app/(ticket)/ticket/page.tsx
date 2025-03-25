'use client';

/* Package System */
import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';

/* Package Application */
import '../../../../public/styles/ticket/TicketManagement.css';
import { formatYYYYMMDDToLocaleDateString } from '@/utils/helpers';

const TicketManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [eventType, setEventType] = useState('upcoming'); // "upcoming" or "past"

  const locations = [
    'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Nha Trang', 
    'Huế', 'Cần Thơ', 'Vũng Tàu', 'Phú Quốc', 'Quảng Ninh'
  ];

  interface Ticket {
    id: number;
    title: string;
    date: string;
    price: string;
    status: string;
    location: string;
  }

  function generateTickets(existingTickets: Ticket[], count: number): Ticket[] {
    const additionalTickets: Ticket[] = [];
    for (let i = 0; i < count; i++) {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const newTicket: Ticket = {
        id: existingTickets.length + i + 1,
        title: `Event ${existingTickets.length + i + 1}`,
        date: new Date(2023, Math.floor(Math.random() * 12), Math.ceil(Math.random() * 28))
          .toISOString()
          .split('T')[0],
        price: Math.random() > 0.5 ? 'Miễn phí' : `${(Math.random() * 1000000 + 500000).toFixed(0)}đ`,
        status: ['success', 'pending', 'cancelled'][Math.floor(Math.random() * 3)] as 'success' | 'pending' | 'cancelled',
        location: randomLocation
      };
      additionalTickets.push(newTicket);
    }
    return [...existingTickets, ...additionalTickets];
  }

  // Giả lập data với các ngày xen kẽ và trạng thái
  const tickets = [
    { id: 1, title: 'Nhớ Trịnh Công Sơn 3', date: '2024-10-25', price: 'Miễn phí', status: 'success', location: 'Hà Nội' },
    { id: 2, title: 'Hòa Nhạc Mùa Thu', date: '2024-11-01', price: '1.200.000đ', status: 'pending', location: 'Hồ Chí Minh' },
    { id: 3, title: 'Đêm Nhạc Phố Cổ', date: '2023-12-20', price: '950.000đ', status: 'success', location: 'Đà Nẵng' },
    { id: 4, title: 'Gala Nhạc Trịnh', date: '2023-09-15', price: 'Miễn phí', status: 'cancelled', location: 'Hải Phòng' },
    { id: 5, title: 'Live Show Bức Tường', date: '2024-09-10', price: '1.500.000đ', status: 'success', location: 'Nha Trang' },
    { id: 6, title: 'Hòa Nhạc Giao Hưởng', date: '2023-11-01', price: 'Miễn phí', status: 'pending', location: 'Huế' },
    { id: 7, title: 'Chuyến Bay Âm Nhạc', date: '2024-12-30', price: '2.000.000đ', status: 'success', location: 'Cần Thơ' },
    { id: 8, title: 'Đêm Nhạc Rock', date: '2023-08-21', price: '950.000đ', status: 'cancelled', location: 'Vũng Tàu' },
    { id: 9, title: 'Nhạc Hội Giáng Sinh', date: '2023-12-24', price: 'Miễn phí', status: 'pending', location: 'Phú Quốc' },
    { id: 10, title: 'Festival Acoustic', date: '2024-05-18', price: '850.000đ', status: 'success', location: 'Quảng Ninh' },
    { id: 11, title: 'Cảm Xúc Trịnh Ca', date: '2024-07-15', price: 'Miễn phí', status: 'success', location: 'Hà Nội' },
    { id: 12, title: 'Tình Khúc Bolero', date: '2023-10-10', price: '1.200.000đ', status: 'cancelled', location: 'Hồ Chí Minh' },
    { id: 13, title: 'Nhạc Sống Đường Phố', date: '2024-03-21', price: 'Miễn phí', status: 'pending', location: 'Đà Nẵng' },
    { id: 14, title: 'Giai Điệu Tuổi Trẻ', date: '2023-06-05', price: '750.000đ', status: 'success', location: 'Hải Phòng' },
    { id: 15, title: 'Live Show Hòa Tấu', date: '2024-01-01', price: 'Miễn phí', status: 'success', location: 'Nha Trang' },
  ];

  const ticketsWithLocations = generateTickets(tickets, 15);

  const today = new Date();

  // Lọc theo trạng thái vé và ngày
  const filteredTickets = ticketsWithLocations.filter(ticket => {
    const ticketDate = new Date(ticket.date);
    const isUpcoming = ticketDate >= today;
    const isPast = ticketDate < today;

    if (activeTab !== 'all' && ticket.status !== activeTab) return false;

    if (eventType === 'upcoming') return isUpcoming;
    if (eventType === 'past') return isPast;

    return true;
  });

  const tabs = [
    { key: 'all', label: 'Tất cả' },
    { key: 'success', label: 'Thành công' },
    { key: 'pending', label: 'Đang xử lý' },
    { key: 'cancelled', label: 'Đã hủy' },
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-8 mb-4">Quản lý vé đã mua</h2>
      <h5 className="text-sm text-gray-700">
        Quản lý tiến trình tham gia sự kiện qua các vé
      </h5>
      {/* tôi muốn tăng độ đậm của đường gạch ngang */}
      <hr className="my-6 border-gray-700" />
      {/* Tabs */}
      <div className="flex status-tab space-x-4 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 status-tab__item py-2 rounded-lg ${activeTab === tab.key
              ? 'bg-teal-500 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Event Type (Upcoming / Past) */}
      <div className="flex time-tab space-x-8 mb-6">
        <button
          onClick={() => setEventType('upcoming')}
          className={`pb-2 text-lg font-semibold ${eventType === 'upcoming'
              ? 'text-black border-b-3 border-teal-500'
              : 'text-gray-500'
            }`}
        >
          Sắp diễn ra
        </button>
        <button
          onClick={() => setEventType('past')}
          className={`pb-2 text-lg font-semibold ${eventType === 'past'
              ? 'text-black border-b-3 border-teal-500'
              : 'text-gray-500'
            }`}
        >
          Đã kết thúc
        </button>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
        {filteredTickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg border-2 hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-[13/9] overflow-hidden">
              <Image
                src="/images/dashboard/card_pic.png"
                alt={ticket.title}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-left text-base mb-3 line-clamp-2 leading-tight">
                {ticket.title}
              </h3>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-sm">
                <div>
                  <Icon icon="solar:calendar-bold" className="inline mr-3 mb-1" />
                  <span style={{color:'#51DACF'}}>{formatYYYYMMDDToLocaleDateString(ticket.date)}</span>
                </div>
                <span
                  className={`rounded-lg px-4 py-1 font-medium text-center text-white ${ticket.price === 'Miễn phí' ? 'bg-emerald-400' : 'bg-sky-500'
                    }`}
                >
                  {ticket.price}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 text-sm">
                <Icon icon='mdi:location' />
                <span>{ticket.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketManagement;