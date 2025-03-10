// booking/select-ticket/page.tsx
'use client';

/* Package System */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';

/* Package Application */
import Navigation from '../components/navigation';
import TicketInfor from './components/ticketInfo';
import SelectTicket from './components/selectTicket';
import { SeatMap, ShowingData } from '@/types/model/seatmap';
import SeatMapComponent from '@/app/(showing)/showing/seatmap/seatmap';
import Loading from '@/app/(showing)/showing/components/loading';
import Error from '@/app/(showing)/showing/components/error';
import { fetchSeatMap } from '@/app/(showing)/showing/libs/server/fetchSeatmapData';
import { fetchShowingData } from '@/app/(showing)/showing/libs/server/fetchShowingData';
import { EventDetail } from '../../../libs/event.interface';
import { fetchEventDetail } from '@/app/(event)/libs/server/fetchEventDetail';

export default function SelectTicketPage() {
    const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const searchParams = useSearchParams();
    const showingId = searchParams?.get('showingId');
    const eventId = searchParams?.get('eventId');
    const [event, setEvent] = useState<EventDetail | null>(null);
    const [isLoadingEvent, setIsLoadingEvent] = useState(false);

    useEffect(() => {
        if (!eventId) return;

        const fetchEventData = async () => {
            setIsLoadingEvent(true);
            try {
                const response = await fetchEventDetail(eventId);
                if (response?.data) {
                    setEvent(response.data);
                }
                else {
                    setEvent(null);
                    console.error("Không tìm thấy dữ liệu sự kiện");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sự kiện:", error);
            } finally {
                setIsLoadingEvent(false);
            }
        };

        fetchEventData();
    }, [eventId]);

    const [seatMapData, setSeatMapData] = useState<SeatMap | ShowingData | null>(null);
    const [isLoadingSeatmap, setIsLoadingSeatmap] = useState(true);
    const [seatmapError, setSeatmapError] = useState<string | "">("");

    useEffect(() => {
        if (!showingId) return;

        console.log('get showing data');

        setIsLoadingSeatmap(true);
        setSeatmapError("");

        if (showingId.includes("showing-")) {
            fetchShowingData(showingId)
                .then((data) => {
                    if (data?.data) {
                        setSeatMapData(data.data);
                    } else {
                        setSeatmapError("Không tìm thấy dữ liệu showing");
                    }
                })
                .catch(() => setSeatmapError("Lỗi khi tải dữ liệu showing"))
                .finally(() => setIsLoadingSeatmap(false));
        }
        else {
            fetchSeatMap(showingId)
                .then((data) => {
                    if (data?.data) {
                        setSeatMapData(data.data);
                    } else {
                        setSeatmapError("Không tìm thấy dữ liệu sơ đồ chỗ ngồi");
                    }
                })
                .catch(() => setSeatmapError("Lỗi khi tải dữ liệu sơ đồ chỗ ngồi"))
                .finally(() => setIsLoadingSeatmap(false));
        }
    }, [showingId]);

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isShowingData = (data: any): data is ShowingData => {
        return !!(data && typeof data === "object" && "TicketType" in data);
    };

    // Tính tổng số vé và tổng tiền
    const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

    useEffect(() => {
        if (!seatMapData) return;

        if ("TicketType" in seatMapData) {
            const newTotal = Object.entries(selectedTickets).reduce((sum, [id, quantity]) => {
                const ticket = seatMapData?.TicketType?.find((t) => t.id === id);
                return sum + (ticket?.price || 0) * quantity;
            }, 0);

            setTotalAmount(newTotal);
        }
    }, [selectedTickets, seatMapData]);

    return (
        <div>
            <Navigation title="Chọn vé" />
            {(!isLoadingEvent && event) ? (
                <TicketInfor 
                    event={event} 
                    totalTickets={totalTickets}
                    totalAmount={totalAmount}
                    hasSelectedTickets={totalTickets > 0}
                />
            ) : (
                <Loading />
            )}
            <div className="seatmap-container">
                {isLoadingSeatmap ? (
                    <Loading />
                ) : seatmapError ? (
                    <Error />
                ) : isShowingData(seatMapData) ? (
                    <SelectTicket
                    tickets={(seatMapData?.TicketType || []).map((ticket) => ({
                        id: ticket.id,
                        name: ticket.name,
                        price: ticket.price,
                        available: ticket.status !== "sold_out",
                        description: ticket.description,
                    }))}
                    selectedTickets={selectedTickets}
                    setSelectedTickets={setSelectedTickets}
                    selectedTicket={selectedTicket}
                    setSelectedTicket={setSelectedTicket}
                />
                ) : (
                    <SeatMapComponent seatMap={seatMapData as SeatMap} />
                )}
            </div>
        </div>
    );
}