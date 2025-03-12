// booking/select-ticket/components/ticketInfor.tsx
'use client';

/* Package System */
import { Calendar, MapPin, Ticket } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/* Package Application */
// import CollapsibleDescription from './collapsibleDescriptionProp';
import { convertLocationToVietnamese } from '@/utils/helpers';

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
    selectedTicketTypeName?: string;
    selectedTicketPrice?: number;
}

export default function TicketInfor({
    event,
    totalTickets,
    totalAmount,
    hasSelectedTickets,
    selectedTicketTypeName,
    selectedTicketPrice,
}: TicketInforProps) {
    const router = useRouter();

    const handleContinue = () => {
        localStorage.setItem('event', JSON.stringify(event));
        localStorage.setItem('totalTickets', totalTickets.toString());
        localStorage.setItem('totalAmount', totalAmount.toString());
        localStorage.setItem('hasSelectedTickets', hasSelectedTickets.toString());
        localStorage.setItem('selectedTicketTypeName', selectedTicketTypeName || '');
        localStorage.setItem('selectedTicketPrice', selectedTicketPrice?.toString() || '');

        // Điều hướng đến trang tiếp theo
        router.push(`/event/${event.id}/booking/question-form`);
    };

    return (
        <div className="flex flex-col md:flex-row px-32 py-8 items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-2/3">
                <Image
                    src={`${event.Images_Events_imgPosterIdToImages?.imageUrl}` || '/images/event.png'}
                    alt="Event"
                    width={800}
                    height={540}
                    className="object-cover rounded-lg"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            </div>

            <div className="w-full md:w-1/3">
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
                    <MapPin size={18} /> <span>{convertLocationToVietnamese(event.locationsString)}</span>
                </div>
                {/* <CollapsibleDescription htmlContent={event.description} maxHeight={140} /> */}
                <div className="flex items-center space-x-2 mt-4">
                    <Ticket size={18} /> <span className="text-gray-700">x{totalTickets}</span>
                </div>

                <button
                    className={`w-[70%] choose-ticket-btn items-center p-2 rounded-lg mt-4 ${hasSelectedTickets
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