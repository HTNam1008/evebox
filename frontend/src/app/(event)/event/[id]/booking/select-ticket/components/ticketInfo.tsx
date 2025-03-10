// booking/select-ticket/components/ticketInfor.tsx
'use client';

import { Calendar, MapPin, Ticket } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface EventProps {
    id: number;
    title: string;
    description: string;
    startDate: string;
    venue: string;
    Images_Events_imgPosterIdToImages?: { imageUrl: string };
    locationsString: string;
}

interface TicketInforProps {
    event: EventProps;
    totalTickets: number;
    totalAmount: number;
    hasSelectedTickets: boolean;
}

const cleanDescriptionHTML = (html: string) => {
    return html.replace(/<img[^>]*>/g, "") // Remove all <img> tags
        .replace(/<\/?h3[^>]*>/g, ""); // Remove all <h3> tags
};

export default function TicketInfor({
    event,
    totalTickets,
    totalAmount,
    hasSelectedTickets
}: TicketInforProps) {
    const router = useRouter();

    const handleContinue = () => {
        localStorage.setItem('event', JSON.stringify(event));
        localStorage.setItem('totalTickets', totalTickets.toString());
        localStorage.setItem('totalAmount', totalAmount.toString());
        localStorage.setItem('hasSelectedTickets', hasSelectedTickets.toString());

        // Điều hướng đến trang tiếp theo
        router.push(`/event/${event.id}/booking/question-form`);
    };

    return (
        <div className="flex flex-col md:flex-row px-32 py-8 items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/2">
                <Image
                    src={`${event.Images_Events_imgPosterIdToImages?.imageUrl}` || '/images/event.png'}
                    alt="Event"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            </div>

            <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <div className="text-gray-500 flex items-center space-x-2 mt-4">
                    <Calendar size={18} />
                    <span>
                        {new Date(event.startDate).toLocaleString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
                <div className="text-gray-500 flex items-center space-x-2 mt-2">
                    <MapPin size={18} /> <span>{event.locationsString}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: cleanDescriptionHTML(event.description) }}></div>
                <div className="flex items-center space-x-2 mt-4">
                    <Ticket size={18} /> <span className="text-gray-700">x{totalTickets}</span>
                </div>

                <button
                    className={`w-full p-2 rounded-lg mt-4 ${hasSelectedTickets
                            ? 'bg-[#51DACF] text-[#0C4762] font-bold hover:bg-[#3BB8AE]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    disabled={!hasSelectedTickets}
                    onClick={handleContinue}
                >
                    {hasSelectedTickets
                        ? `Tiếp tục - ${totalAmount.toLocaleString()}đ`
                        : 'Vui lòng chọn vé'}
                </button>
            </div>
        </div>
    );
}