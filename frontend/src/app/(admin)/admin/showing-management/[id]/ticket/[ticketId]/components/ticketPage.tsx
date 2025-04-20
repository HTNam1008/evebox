'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation';

/* Package Application */
import { TicketTypeDetailProps } from '../../../../lib/interface/ticketTable.interface';

export default function TicketDetailPage() {
    const router = useRouter();
    const params = useParams();

    const showingId = params.id as string;
    const ticketId = params.ticketId as string;

    //Call API theo showingId và ticketId
    const showing = {
        id: showingId,
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

    const ticket: TicketTypeDetailProps =
    {
        id: ticketId?.toString(),
        name: "VIP",
        startTime: "2025-04-09T16:22:12.000Z",
        endTime: "2025-04-09T17:00:00.000Z",
        description: "Ngồi vị trí gần khán đài",
        price: 350000,
        maxQtyPerOrder: 3,
        minQtyPerOrder: 1,
        quantity: 100,
        sold: 80,
        status: "book_now",
        imgUrl: "https://res.cloudinary.com/de66mx8mw/image/upload/v1743393414/background.jpg.jpg",
    }

    return (
        <>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762] cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin chi tiết vé</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8 mb-6">
                <div className="px-6">
                    <p>
                        <span className="font-semibold">Tên sự kiện: </span> {showing.eventTitle.title}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Ngày diễn: </span>
                        {new Date(showing.startTime).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian: </span>
                        {new Date(showing.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(showing.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </p>
                </div>
            </div>

            <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-3 mb-6">
                <div className="flex justify-center">
                    {/* Thay bằng ảnh của vé */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="rounded-md mt-4" alt="Ticket Image"
                        src={ticket.imgUrl}
                        width={800} height={150}
                    />
                </div>
                <div className="p-6">
                    <p>
                        <span className="font-semibold">Tên vé: </span> {ticket.name}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Mô tả: </span> {ticket.description}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Giá vé: </span>
                        {ticket.price === 0 ? "Miễn phí" : `${ticket.price} VNĐ`}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian mở bán: </span>
                        {`${new Date(ticket.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${new Date(ticket.startTime).toLocaleDateString('vi-VN')}`}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian ngừng bán: </span>
                        {`${new Date(ticket.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${new Date(ticket.endTime).toLocaleDateString('vi-VN')}`}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Số lượng vé mua tối thiểu/lần: </span> {ticket.minQtyPerOrder}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Số lượng vé mua tối đa/lần: </span> {ticket.maxQtyPerOrder}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Tổng số lượng vé: </span> {ticket.quantity}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Số lượng vé đã bán: </span> {ticket.sold}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Trạng thái: </span>
                        {ticket.status === "book_now" && (
                            <span className="min-w-[100px] ml-2 text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#9EF5CF] text-[#0C4762] border-[#9EF5CF]">
                                Mở bán
                            </span>
                        )}
                        {ticket.status === "sold_out" && (
                            <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#FFC9C9] text-[#FF0000] border-[#FFC9C9]">
                                Hết vé
                            </span>
                        )}
                        {ticket.status === "sale_closed" && (
                            <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#F4EEEE] text-[#979797] border-[#F4EEEE]">
                                Ngừng bán
                            </span>
                        )}
                        {ticket.status === "not_open" && (
                            <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#F4EEEE] text-[#979797] border-[#F4EEEE]">
                                Chưa mở bán
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </>
    );
}
