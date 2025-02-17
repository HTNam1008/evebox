// booking/select-ticket/page.tsx
'use client';

import Navigation from '../components/navigation';
import TicketInfor from './components/ticketInfo';
import SelectTicket from './components/selectTicket';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';

const event = {
    title: 'Dream world wide in Jakarta',
    description: "Marty travels back in time using an eccentric scientist's time machine...",
    date: '20:00 - 23:00, 25 tháng 10, 2024',
    location: 'Đường Nguyễn Huệ, Quận 1, TP.HCM',
};

const tickets = [
    { id: 1, name: 'Early Bird 1 Ticket', price: 499000, available: false, description: 'Khán giả tự do chọn vị trí đứng trong khu vực sự kiện\nHỗ trợ LED Live cam để theo dõi toàn bộ sự kiện' },
    { id: 2, name: 'Early Bird Ticket', price: 599000, available: true, description: 'Khán giả tự do chọn vị trí đứng trong khu vực sự kiện' },
    { id: 3, name: 'Office Ticket', price: 699000, available: true, description: 'Ghế ngồi khu vực VIP, tầm nhìn tốt nhất' },
    { id: 4, name: 'Office Ticket', price: 699000, available: false, description: 'Ghế ngồi khu vực thường' },
];

export default function SelectTicketPage() {
    const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({});
    const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

    // Tính tổng số vé và tổng tiền
    const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
    const totalAmount = Object.entries(selectedTickets).reduce(
        (sum, [id, quantity]) => sum + (tickets.find(t => t.id === Number(id))?.price || 0) * quantity,
        0
    );

    return (
        <div>
            <Navigation title="Chọn vé" />
            <TicketInfor 
                event={event} 
                totalTickets={totalTickets}
                totalAmount={totalAmount}
                hasSelectedTickets={totalTickets > 0}
            />
            <SelectTicket 
                tickets={tickets}
                selectedTickets={selectedTickets}
                setSelectedTickets={setSelectedTickets}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
            />
        </div>
    );
}