// booking/select-ticket/components/ticketInfor.tsx
'use client';

/* Package System */
import { Calendar, Ticket } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

/* Package Application */
// import { EventDetail } from '@/app/(event)/event/libs/event.interface';
// import CollapsibleDescription from './collapsibleDescriptionProp';
import { TicketType } from '@/app/(event)/event/libs/event.interface';
import { useI18n } from '@/app/providers/I18nProvider';

interface EventProps {
    id: number;
    title: string;
    description: string;
    // startDate: string;
    startTime: string;
    venue: string;
    Images_Events_imgPosterIdToImages?: { imageUrl: string };
    locationsString: string;
}

interface TicketInforProps {
    event: EventProps;
    totalTickets: number;
    totalAmount: number;
    hasSelectedTickets: boolean;
    selectedTicketType?: TicketType;
    selectedSeatIds?: number[];
    showingId?: string;
    onClearSelection?: () => void;
}

export default function TicketInfor({
    event,
    totalTickets,
    totalAmount,
    hasSelectedTickets,
    selectedTicketType,
    selectedSeatIds,
    showingId,
    onClearSelection
}: TicketInforProps) {
    const t = useTranslations('common');
    const { locale } = useI18n();
    const router = useRouter();

    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = async () => {
        const payload = {
            showingId: showingId,
            tickettypeId: selectedTicketType?.id,
            quantity: totalTickets,
            seatInfo: selectedSeatIds?.map((id) => ({ seatId: id })) || [],
        };

        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_TICKET_SVC_URL}/api/ticket/selectSeat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.user?.accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Không thể giữ ghế, vui lòng thử lại.');
                onClearSelection?.();
                return;
            }

            localStorage.setItem('event', JSON.stringify(event));
            localStorage.setItem('totalTickets', totalTickets.toString());
            localStorage.setItem('totalAmount', totalAmount.toString());
            localStorage.setItem('hasSelectedTickets', hasSelectedTickets.toString());
            localStorage.setItem('selectedTicketType', JSON.stringify(selectedTicketType));
            localStorage.setItem('selectedSeatIds', JSON.stringify(selectedSeatIds));
            localStorage.setItem('ticketTypeId', selectedTicketType?.id.toString() || '');
            localStorage.setItem('showingId', showingId || '');

            // Điều hướng đến trang tiếp theo
            router.push(`/event/${event.id}/booking/question-form`);
        } catch (error) {
            console.error('Lỗi khi gọi API lock-seat:', error);
            alert('Lỗi hệ thống khi giữ ghế. Vui lòng thử lại.');
            onClearSelection?.();
        } finally {
            setIsLoading(false);
        }

        // localStorage.setItem('event', JSON.stringify(event));
        // localStorage.setItem('totalTickets', totalTickets.toString());
        // localStorage.setItem('totalAmount', totalAmount.toString());
        // localStorage.setItem('hasSelectedTickets', hasSelectedTickets.toString());
        // localStorage.setItem('selectedTicketType', JSON.stringify(selectedTicketType));
        // localStorage.setItem('selectedSeatIds', JSON.stringify(selectedSeatIds));
        // localStorage.setItem('ticketTypeId', selectedTicketType?.id.toString() || '');
        // localStorage.setItem('showingId', showingId || '');


        // // Điều hướng đến trang tiếp theo
        // router.push(`/event/${event.id}/booking/question-form`);
    };

    return (
        <div className="info-container flex flex-col md:flex-row px-32 py-8 items-stretch space-y-4 md:space-y-0 md:space-x-6 min-h-[540]">
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

            <div className="w-full md:w-1/3 pt-2 pb-2 flex flex-col justify-between">
                <div className='ticket-info-wrapper'>
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                    <div className="text-gray-500 flex items-center space-x-2 mt-4">
                        <Calendar size={18} />
                        <span>
                            {new Date(event.startTime).toLocaleString(locale === "vi" ? 'vi-VN' : 'en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                    <div className="text-gray-500 flex items-center space-x-2 mt-2">
                        <i className="bi bi-geo-alt-fill mr-1"></i> <span>{event.venue}</span>
                    </div>
                    {/* <CollapsibleDescription htmlContent={event.description} maxHeight={140} /> */}
                </div>

                <div className='action-wrapper pb-4'>
                    <div className="flex items-center space-x-2 mt-4">
                        <Ticket size={28} /> <span className="text-gray-700 text-xl">x{totalTickets}</span>
                    </div>
                    <button
                        className={`w-full choose-ticket-btn items-center p-2 rounded-lg mt-4 ${hasSelectedTickets
                            ? 'bg-[#51DACF] text-[#0C4762] font-bold hover:bg-[#3BB8AE]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!hasSelectedTickets}
                        onClick={handleContinue}
                    >
                        {!isLoading ? (
                            hasSelectedTickets
                                ? `${t("continue") ?? "Tiếp tục"} - ${totalAmount.toLocaleString()}đ`
                                : `${t("pleaseChooseTicket") ?? "Vui lòng chọn vé"}`
                        ) : (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                        {/* {hasSelectedTickets
                            ? `${t("continue") ?? "Tiếp tục"} - ${totalAmount.toLocaleString()}đ`
                            : `${t("pleaseChooseTicket") ?? "Vui lòng chọn vé"}`} */}
                    </button>
                </div>
            </div>
        </div>
    );
}