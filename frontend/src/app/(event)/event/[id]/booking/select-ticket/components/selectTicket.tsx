// import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

interface Ticket {
    id: number;
    name: string;
    price: number;
    available: boolean;
    description: string;
}

interface SelectTicketProps {
    tickets: Ticket[];
    selectedTickets: { [key: number]: number };
    setSelectedTickets: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
    selectedTicket: number | null;
    setSelectedTicket: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function SelectTicket({
    tickets,
    selectedTickets,
    setSelectedTickets,
    selectedTicket,
    setSelectedTicket
}: SelectTicketProps) {
    const handleIncrease = (id: number) => {
        setSelectedTickets((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleDecrease = (id: number) => {
        setSelectedTickets((prev) => {
            if (prev[id] && prev[id] > 0) {
                return { ...prev, [id]: prev[id] - 1 };
            }
            return prev;
        });
    };

    const handleSelect = (id: number) => {
        setSelectedTicket(id);
    };

    return (
        <div className="px-32 py-0">
            <hr className="mb-8 border-2 border-[#0C4762]" />

            <div className="grid grid-cols-4 gap-4">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className={`border rounded-lg p-3 text-center cursor-pointer transition-all duration-300 bg-white
                        ${selectedTicket === ticket.id ? 'border-2 border-black shadow-[8px_8px_0px_0px_#0C4762]' : 'border-2 border-gray-800'}
                        ${!ticket.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => ticket.available && handleSelect(ticket.id)}
                    >
                        <h3 className="font-semibold">{ticket.name}</h3>

                        {/* Mô tả với icon cảnh báo tròn */}
                        <div className="bg-[#F4EEEE] text-gray-700 rounded-lg p-2 mt-2 text-sm text-left flex items-start">
                            <div className="flex items-center justify-center w-6 h-6 mr-2">
                                <i className="bi bi-exclamation-circle-fill text-orange-600"></i>
                            </div>
                            <p className="whitespace-pre-line">{ticket.description}</p>
                        </div>

                        <p className="font-semibold mt-2">{ticket.price.toLocaleString()}đ</p>

                        {ticket.available ? (
                            <div className="flex items-center justify-center mt-2">
                                <button
                                    className={`px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200 ${selectedTickets[ticket.id] ? '' : 'opacity-50 cursor-not-allowed'}`}
                                    onClick={() => handleDecrease(ticket.id)}
                                    disabled={!selectedTickets[ticket.id]}
                                >
                                    -
                                </button>
                                <span className="px-4 font-semibold">{selectedTickets[ticket.id] || 0}</span>
                                <button
                                    className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
                                    onClick={() => handleIncrease(ticket.id)}
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <p className="text-red-500 mt-2 font-semibold">Hết vé</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
