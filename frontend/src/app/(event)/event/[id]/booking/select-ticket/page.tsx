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
import { SeatMap, ShowingData, TicketType } from '@/types/model/seatmap';
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
    const [ticketType, setTicketType] = useState<TicketType[]>([]);

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

        setIsLoadingSeatmap(true);
        setSeatmapError("");

        if (showingId.includes("showing-")) {
            fetchShowingData(showingId)
                .then((data) => {
                    if (data?.data) {
                        setSeatMapData(data.data);
                        setTicketType(data?.data?.TicketType || []);
                    } else {
                        setSeatmapError("Không tìm thấy dữ liệu showing");
                    }
                })
                .catch(() => setSeatmapError("Lỗi khi tải dữ liệu showing"))
                .finally(() => setIsLoadingSeatmap(false));
        }
        else {
            fetchSeatMap(showingId)
                .then((seatMapResponse) => {
                    if (seatMapResponse?.data) {
                        setSeatMapData(seatMapResponse.data);

                        return fetchShowingData(showingId);
                    } else {
                        setSeatmapError("Không tìm thấy dữ liệu sơ đồ chỗ ngồi");
                        return null;
                    }
                })
                .then((showingResponse) => {
                    if (showingResponse?.data?.TicketType) {
                        setTicketType(showingResponse.data.TicketType);
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

    const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

    const selectedTicketType =
        Object.keys(selectedTickets).length === 1
            ? ticketType.find((t) => t.id === Object.keys(selectedTickets)[0])
            : undefined;

    useEffect(() => {
        if (!seatMapData) return;

        if ("TicketType" in seatMapData) {
            const newTotal = Object.entries(selectedTickets).reduce((sum, [id, quantity]) => {
                const ticket = seatMapData?.TicketType?.find((t) => t.id === id);
                return sum + (ticket?.price || 0) * quantity;
            }, 0);

            setTotalAmount(newTotal);
        }
        else {
            const newTotal = Object.entries(selectedTickets).reduce((sum, [ticketTypeId, quantity]) => {
                const ticket = ticketType.find((t) => t.id === ticketTypeId);
                return sum + (ticket?.price || 0) * quantity;
            }, 0);
            setTotalAmount(newTotal);
        }
    }, [selectedTickets, seatMapData, ticketType]);

    const handleSeatSelectionChange = (seat: { id: number; ticketTypeId: string }, isSelected: boolean) => {
        setSelectedTickets((prev) => {
            const ticketTypeId = seat.ticketTypeId;
            const currentCount = prev[ticketTypeId] || 0;
            return {
                ...prev,
                [ticketTypeId]: isSelected ? currentCount + 1 : Math.max(currentCount - 1, 0)
            };
        });
    };

    return (
        <div>
            <Navigation title="Chọn vé" />
            {(!isLoadingEvent && event) ? (
                <TicketInfor
                    event={event}
                    totalTickets={totalTickets}
                    totalAmount={totalAmount}
                    hasSelectedTickets={totalTickets > 0}
                    selectedTicketTypeName={selectedTicketType?.name || ""}
                    selectedTicketPrice={selectedTicketType?.price || 0}
                />
            ) : (
                <Loading />
            )}
            <div className="showing-seatmap-container flex flex-row justify-center my-5 mx-0">
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
                    <>
                        <SeatMapComponent seatMap={seatMapData as SeatMap} onSeatSelectionChange={handleSeatSelectionChange} />
                        <div className='w-[30%] pl-4'>
                            {ticketType.length > 0 && (
                                <div className='ticket-type-list'>
                                    <h2 className='font-bold text-lg mb-2'>Giá vé</h2>
                                    {ticketType.map((type) => (
                                        <div key={type.id} className='ticket-type-item flex justify-between items-center mb-2'>
                                            <div className='flex items-center'>
                                                <span
                                                    className="inline-block ticket-type-color w-10 h-6 rounded mr-2"
                                                    style={{ backgroundColor: type.color }}
                                                ></span>
                                                <span className='ticket-type-name'>{type.name}</span>
                                            </div>
                                            <span className='ticket-type-price text-[#0C4762] font-semibold'>{type.price.toLocaleString("vi-VN")}đ</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}