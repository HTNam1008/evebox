/* Package System */
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { useTranslations } from 'next-intl';

/* Package Application */
import AlertDialog from '@/app/(showing)/showing/components/alertDialog';

interface Ticket {
    id: string;
    name: string;
    price: number;
    available: boolean;
    description: string;
}

interface SelectTicketProps {
    tickets: Ticket[];
    selectedTickets: { [key: string]: number };
    setSelectedTickets: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    selectedTicket: string | null;
    setSelectedTicket: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectTicket({
    tickets,
    selectedTickets,
    setSelectedTickets,
    selectedTicket,
    setSelectedTicket
}: SelectTicketProps) {
    const t = useTranslations("common");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleIncrease = (id: string) => {
        if (selectedTicket && selectedTicket !== id) {
            setAlertMessage(t("onlyOneTicketType") ?? "Bạn chỉ được mua 1 loại vé duy nhất.");
            setAlertOpen(true);
            return;
        }

        setSelectedTickets((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleDecrease = (id: string) => {
        setSelectedTickets((prev) => {
            if (prev[id] && prev[id] > 0) {
                return { ...prev, [id]: prev[id] - 1 };
            }
            return prev;
        });
    };

    const handleSelect = (id: string) => {
        setSelectedTicket(id);
    };

    return (
        <>
            <div className="px-32 py-0">
                <hr className="mb-8 border-2 border-[#0C4762]" />

                <div className='ticket-container flex justify-center'>
                    <div className='inline-grid grid-flow-col auto-cols-[minmax(250px,1fr)] gap-4 mx-auto'>
                        {tickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className={`border rounded-lg p-3 text-center cursor-pointer transition-all duration-300 bg-white flex flex-col
                            ${selectedTicket === ticket.id ? 'border-2 border-black shadow-[8px_8px_0px_0px_#0C4762]' : 'border-2 border-gray-800'}
                            ${!ticket.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => ticket.available && handleSelect(ticket.id)}
                            >
                                <div className='ticket-info'>
                                    <h3 className='font-semibold'>{ticket.name}</h3>

                                    {ticket.description && ticket.description !== "" && (
                                        <div className="bg-[#F4EEEE] text-gray-700 rounded-lg p-2 mt-2 text-sm text-left flex items-start">
                                            <div className="flex items-center justify-center w-6 h-6 mr-2">
                                                <i className="bi bi-exclamation-circle-fill text-orange-600"></i>
                                            </div>
                                            <p className="whitespace-pre-line">{ticket.description}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='ticket-actions mt-auto'>
                                    <p className="font-semibold mt-2">{ticket.price.toLocaleString()}đ</p>

                                    {ticket.available ? (
                                        <div className='flex items-center justify-center mt-2'>
                                            <button
                                                className={`px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200 ${selectedTickets[ticket.id] ? '' : 'opacity-50 cursor-not-allowed'}`}
                                                onClick={() => handleDecrease(ticket.id)}
                                                disabled={!selectedTickets[ticket.id]}
                                            >-</button>
                                            <span className="px-4 font-semibold">{selectedTickets[ticket.id] || 0}</span>
                                            <button
                                                className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
                                                onClick={() => handleIncrease(ticket.id)}
                                            >+</button>
                                        </div>
                                    ) : (
                                        <p className="text-red-500 mt-2 font-semibold">{t("soldOutTicket") ?? "Hết vé"}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <AlertDialog
                message={alertMessage}
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
            />
        </>
    );
}