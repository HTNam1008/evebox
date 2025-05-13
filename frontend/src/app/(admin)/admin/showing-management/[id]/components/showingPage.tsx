'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react"
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

/* Package Application */
import { Showing } from '../../lib/interface/showingTable.interface';
import TicketTable from './ticketTable';
import { getShowingDetail } from '@/services/event.service';
import ShowingDetailSkeleton from './showingDetailSkeleton';

export default function ShowingDetailPage({ showingId }: { showingId: string }) {
    const router = useRouter();

    const [showing, setShowing] = useState<Showing | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchShowingDetail = async () => {
            try {
                if (showingId) {
                    const res = await getShowingDetail(showingId);

                    setShowing(res);
                } else {
                    throw new Error('Invalid event ID');
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu suất diễn', error);
                toast.error('Lỗi khi tải dữ liệu suất diễn');
            } finally {
                setIsLoading(false);
            }
        }

        fetchShowingDetail();
    }, [showingId]);

    return (
        isLoading ? (
            <ShowingDetailSkeleton />
        ) : (
            <>
                <div className="flex items-center space-x-2">
                    <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762] cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                    <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin Showing</h1>
                </div>

                <div className="border-t-2 border-[#0C4762] mt-2"></div>

                <h1 className="text-2xl font-semibold text-center mt-6">{showing?.event.title}</h1>

                <div className="seat-map px-8">
                    {showing?.seatMapId === 0 ? '' : (
                        <>
                            <h2 className="text-xl font-semibold mt-6 mb-3">Seat map</h2>
                            <div className="flex justify-center mb-6">
                                {/* Thay bằng seatmap */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="rounded-md" alt="Seat map"
                                    src={"https://res.cloudinary.com/de66mx8mw/image/upload/v1743393414/background.jpg.jpg"}
                                    width={800} height={150}
                                />
                            </div>
                        </>
                    )}
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-3 px-8">Thời gian chi tiết</h2>
                <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-3 mb-6">
                    <p>
                        <span className="font-semibold">Ngày diễn: </span> {new Date(showing?.startTime ?? "").toLocaleDateString("vi-VN")}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian bắt đầu: </span>
                        {new Date(showing?.startTime ?? "").toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian kết thúc: </span>
                        {new Date(showing?.endTime ?? "").toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </p>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-3 px-8">Các loại vé</h2>

                <TicketTable showingID={showing?.id ?? ""} ticketTypes={showing?.ticketTypes ?? []} />
            </>
        )
    )
}