'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

/* Package Application */
import { TicketOfShowing, TicketTypeDetailProps } from '../../../../lib/interface/ticketTable.interface';
import { getTicketDetailOfShowing } from '@/services/event.service';
import TicketPageSkeleton from './ticketPageSkeleton';
import { formatCurrency } from '@/utils/helpers';

export default function TicketDetailPage() {
    const router = useRouter();
    const params = useParams();

    const showingId = params?.id as string;
    const ticketTypeId = params?.ticketId as string;

    const [showing, setShowing] = useState<TicketOfShowing | null>(null);
    const [ticket, setTicket] = useState<TicketTypeDetailProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                if (showingId && ticketTypeId) {
                    const res = await getTicketDetailOfShowing(showingId, ticketTypeId);

                    setShowing(res);
                    setTicket(res.ticketType);
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu vé', error);
                toast.error('Lỗi khi tải dữ liệu vé');
            } finally { 
                setIsLoading(false);
            }
        }

        fetchData();
    }, [showingId, ticketTypeId]);

    const renderTicketStatus = (status: string) => {
        switch (status) {
            case "book_now":
                return (
                    <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#9EF5CF] text-[#0C4762] border-[#9EF5CF]">
                        Mở bán
                    </span>
                );
            case "sold_out":
                return (
                    <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#FFC9C9] text-[#FF0000] border-[#FFC9C9]">
                        Hết vé
                    </span>
                );
            case "sale_closed":
                return (
                    <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#F4EEEE] text-[#979797] border-[#F4EEEE]">
                        Ngừng bán
                    </span>
                );
            case "not_open":
                return (
                    <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#F4EEEE] text-[#979797] border-[#F4EEEE]">
                        Chưa mở bán
                    </span>
                );
            case "register_now":
                return (
                    <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#9EF5CF] text-[#0C4762] border-[#9EF5CF]">
                        Đăng ký ngay
                    </span>
                );
            case "register_closed":
                return (
                    <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#F4EEEE] text-[#979797] border-[#F4EEEE]">
                        Đóng đăng ký
                    </span>
                );
            default:
                return <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#F4EEEE] text-[#979797] border-[#F4EEEE]">Không xác định</span>;
        }
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762] cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin chi tiết vé</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            {isLoading ? (
                <TicketPageSkeleton />
            ) : (
                <>
                    <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8 mb-6">
                <div className="px-6">
                    <p>
                        <span className="font-semibold">Tên sự kiện: </span> {showing?.event.title}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Ngày diễn: </span>
                        {new Date(showing?.startTime ?? "").toLocaleDateString('vi-VN')}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian: </span>
                        {new Date(showing?.startTime ?? "").toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(showing?.endTime ?? "").toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </p>
                </div>
            </div>

            <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-3 mb-6">
                <div className="flex justify-center">
                    {/* Thay bằng ảnh của vé */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="rounded-md mt-4" alt="Ticket Image"
                        src={(ticket?.imageUrl && ticket?.imageUrl !== "") ? ticket?.imageUrl : "https://res.cloudinary.com/de66mx8mw/image/upload/v1744458011/defaultImgEvent_spjrst.png"}
                        width={800} height={150}
                    />
                </div>
                <div className="p-6">
                    <p>
                        <span className="font-semibold">Tên vé: </span> {ticket?.name}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Mô tả: </span> {ticket?.description}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Giá vé: </span>
                        {ticket?.price === 0 ? "Miễn phí" : `${formatCurrency(ticket?.price ?? 0)} VNĐ`}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian mở bán: </span>
                        {`${new Date(ticket?.startTime ?? "").toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${new Date(ticket?.startTime ?? "").toLocaleDateString('vi-VN')}`}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian ngừng bán: </span>
                        {`${new Date(ticket?.endTime ?? "").toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} - ${new Date(ticket?.endTime ?? "").toLocaleDateString('vi-VN')}`}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Số lượng vé mua tối thiểu/lần: </span> {ticket?.minQtyPerOrder}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Số lượng vé mua tối đa/lần: </span> {ticket?.maxQtyPerOrder}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Tổng số lượng vé: </span> {ticket?.quantity}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Số lượng vé đã bán: </span> {ticket?.sold}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Trạng thái: </span>
                        {renderTicketStatus(ticket?.status ?? "")}
                    </p>
                </div>
            </div>
                </>
            )}
        </>
    );
}
