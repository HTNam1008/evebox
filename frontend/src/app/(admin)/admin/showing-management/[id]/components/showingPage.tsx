'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react"
import TicketTable from './ticketTable';

/* Package Application */

export default function ShowingDetailPage() {
    const router = useRouter();

    //Gán cứng -> gọi API fetch theo id
    const showing = {
        id: '003',
        eventTitle: {
            id: 30000,
            title: '(Hà Nội) Piano solo - David Greilsammer | Du hành cùng Satie',
        },
        startTime: '2025-03-27T08:00:00.000Z',
        endTime: '2025-03-27T10:30:00.000Z',
        seatMapId: 12,
        numTicketType: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 }
        ]
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762]" />
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin Showing</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <h1 className="text-2xl font-semibold text-center mt-6">{showing.eventTitle.title}</h1>

            <div className="seat-map px-8">
                {showing.seatMapId === 0 ? '' : (
                    <>
                        <h2 className="text-xl font-semibold mt-6 mb-3">Seat map</h2>
                        <div className="flex justify-center mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="rounded-md" alt="Event Logo"
                                src={"https://res.cloudinary.com/de66mx8mw/image/upload/v1744458011/defaultImgEvent_spjrst.png"}
                                width={300} height={200}
                            />
                        </div>
                    </>
                )}
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3 px-8">Thời gian chi tiết</h2>
            <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-3 mb-6">
                <p>
                    <span className="font-semibold">Ngày diễn: </span> {new Date(showing.startTime).toLocaleDateString("vi-VN")}
                </p>
                <p className="mt-2">
                    <span className="font-semibold">Thời gian bắt đầu: </span>
                    {new Date(showing.startTime).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit"})}
                </p>
                <p className="mt-2">
                    <span className="font-semibold">Thời gian kết thúc: </span> 
                    {new Date(showing.endTime).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit"})}
                </p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3 px-8">Các loại vé</h2>

            <TicketTable showingID={showing.id} ticketTypeIds={showing.numTicketType.map(ticket => ticket.id)}/>
        </>
    )
}