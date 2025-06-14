'use client';

/* Package System */
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
// import { ArrowLeft } from 'lucide-react';
import jsQR from 'jsqr';

/* Package Application */
import { useTicketById } from '@/app/(ticket)/libs/hooks/useTicketById';
import { decrypt } from '@/utils/helpers';


interface TicketDetailProps {
    ticketId: string;
}

const TicketDetailClient = ({ ticketId }: TicketDetailProps) => {
    const { ticket, loading, error } = useTicketById(ticketId);
    const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
    const [qrDecodedData, setQrDecodedData] = useState(null);
    // const router = useRouter();

    if (loading) {
        return <div className="text-white text-center">Đang tải...</div>;
    }

    if (error || !ticket) {
        return <div className="text-white text-center">Không tìm thấy vé</div>;
    }

    const getStatusInfo = (status: number) => {
        switch (status) {
            case 0: return { text: 'Đã hủy', color: 'text-red-500' };
            case 1: return { text: 'Thành công', color: 'text-green-500' };
            case 2: return { text: 'Đang chờ xử lý', color: 'text-yellow-500' };
            default: return { text: 'Không xác định', color: 'text-white' };
        }
    };

    if (!ticket) {
        return <div className="text-white text-center">Không tìm thấy vé</div>;
    }

    const { text, color } = getStatusInfo(ticket.status);

    const allTickets = ticket.TicketQRCode || [];
    const totalTickets = allTickets.length;

    const currentTicket = allTickets[currentTicketIndex];

    let seatInfo = { section: "-", row: "-", seat: "-" };
    if (currentTicket?.seatId) {
        const seat = ticket.seats.find(seat => seat.id === currentTicket.seatId);
        if (seat) {
            seatInfo = {
                section: seat.Row?.Section?.name || "-",
                row: seat.Row?.name || "-",
                seat: seat.name || "-",
            };
        }
    }

    const handleDecodeQR = () => {
        const base64 = currentTicket?.qrCode.startsWith('data:image')
            ? currentTicket.qrCode
            : `data:image/png;base64,${currentTicket?.qrCode}`;

        const img = document.createElement('img');
        img.src = base64;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qr = jsQR(imageData.data, imageData.width, imageData.height);
            if (qr) {
                try {
                    const encryptedText = qr.data;
                    const decryptedContent = decrypt(encryptedText);
                    const parsedData = JSON.parse(decryptedContent);
                    setQrDecodedData(parsedData);
                } catch (error) {
                    console.error('Lỗi khi giải mã hoặc parse QR:', error);
                    alert('Có lỗi xảy ra khi giải mã QR.');
                }
            } else {
                alert('Không tìm thấy dữ liệu QR.');
            }
        };
        img.onerror = (event: string | Event) => {
            console.error('Lỗi khi load ảnh QR:', event);
        };
    }

    return (
        <div className="mt-8 min-h-screen flex justify-center items-center px-4">
            {/* <button
                onClick={() => router.back()}
                className="p-1.5 border-2 border-[#0C4762] rounded-md hover:bg-gray-200 absolute top-4 left-4"
            >
                <ArrowLeft size={20} className="text-[#0C4762]" />
            </button> */}
            <div className="flex flex-row gap-4 w-full">
                {/* Ticket Details */}
                <div className="bg-[#0C4762] text-white w-1/2 p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4 text-gray-300">{ticket.Showing?.Events.title}</h2>

                    <div className="w-full rounded-lg overflow-hidden border border-white">
                        <Image
                            src={ticket.Showing?.Events.Images_Events_imgPosterIdToImages.imageUrl || "/images/event.png"}
                            alt="Poster"
                            width={700}
                            height={300}
                            className="w-full"
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-x-4">
                        <div>
                            <p className="text-sm text-gray-300">Loại vé</p>
                            <p className="text-[#9EF5CF] font-semibold">{ticket.ticketType.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Khu vực</p>
                            <p className="text-[#9EF5CF] font-semibold">{seatInfo.section}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Hàng: Ghế</p>
                            <p className="text-[#9EF5CF] font-semibold">{seatInfo.row} : {seatInfo.seat}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Thời gian</p>
                            <p className="text-[#9EF5CF] font-semibold">
                                {new Date(ticket.Showing?.startTime || '').toLocaleTimeString()} - {new Date(ticket.Showing?.endTime || '').toLocaleTimeString()}
                            </p>
                            <p className="text-[#9EF5CF] font-semibold">
                                {new Date(ticket.Showing?.startTime || '').toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* QR Code */}
                    {currentTicket?.qrCode && currentTicket.qrCode !== "Unknow" && (
                        <div className="mt-6 flex justify-center">
                            <div className="bg-[#9EF5CF] p-2 rounded-lg flex flex-col items-center gap-2">
                                <span className="text-sm text-[#0C4762] font-semibold">Mã QR vé</span>
                                <Image
                                    src={currentTicket.qrCode.startsWith('data:image') ? currentTicket.qrCode : `data:image/png;base64,${currentTicket.qrCode}`}
                                    alt="QR Code"
                                    width={100}
                                    height={100}
                                    className="border border-gray-400 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {/* Nút giải mã QR */}
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handleDecodeQR}
                            className="bg-[#51DACF] text-[#0C4762] px-4 py-2 rounded-lg"
                        >
                            Giải mã QR
                        </button>
                    </div>
                    {/* Hiển thị dữ liệu giải mã được dưới dạng danh sách */}
                    {qrDecodedData && (
                        <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Nội dung QR:</h3>
                            <ul className="text-white text-sm list-disc pl-5">
                                {Object.entries(qrDecodedData).map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {String(value)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Điều hướng giữa các vé */}
                    {totalTickets > 1 && (
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-[#51DACF] text-[#0C4762] px-4 py-2 rounded-lg disabled:opacity-50"
                                onClick={() => setCurrentTicketIndex((prev) => Math.max(0, prev - 1))}
                                disabled={currentTicketIndex === 0}
                            >
                                Trước
                            </button>
                            <span className="flex items-center justify-center">Vé {currentTicketIndex + 1} / {totalTickets}</span>
                            <button
                                className="bg-[#51DACF] text-[#0C4762] px-4 py-2 rounded-lg disabled:opacity-50"
                                onClick={() => setCurrentTicketIndex((prev) => Math.min(totalTickets - 1, prev + 1))}
                                disabled={currentTicketIndex === totalTickets - 1}
                            >
                                Sau
                            </button>
                        </div>
                    )}

                </div>

                {/* Order Details */}
                <div className="bg-[#0C4762] text-white w-1/2 p-6 rounded-lg shadow-lg">
                    <div className="bg-[#083A4F] p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Thông tin đơn hàng</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p className="text-gray-300">Ngày đặt hàng:</p>
                            <p className="text-[#9EF5CF]">{new Date(ticket.PaymentInfo?.paidAt || '').toLocaleString()}</p>
                            <p className="text-gray-300">Phương thức thanh toán:</p>
                            <p className="text-[#9EF5CF]">{ticket.PaymentInfo?.method}</p>
                            <p className="text-gray-300">Tình trạng đơn hàng:</p>
                            <p className={`${color} font-bold`}>{text}</p>
                        </div>
                    </div>

                    <div className="mt-4 bg-[#083A4F] p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Thông tin người mua</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {ticket?.FormResponse?.FormAnswer.length ? (
                                ticket.FormResponse.FormAnswer.map((answer, index) => (
                                    <div key={index} className="contents">
                                        <p className="text-gray-300">{answer.FormInput.fieldName}:</p>
                                        <p className="text-[#9EF5CF]">{answer.value || "-"}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-300 col-span-2">Không có thông tin người mua.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 bg-[#083A4F] p-4 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Chi tiết thanh toán</h3>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            <p className="text-gray-300">Loại vé</p>
                            <p className="text-gray-300 text-center">Số lượng</p>
                            <p className="text-gray-300 text-right">Thành tiền</p>
                            <p className="text-[#9EF5CF]">{ticket.ticketType.name}</p>
                            <p className="text-[#9EF5CF] text-center">{ticket.count}</p>
                            <p className="text-[#9EF5CF] text-right">{(ticket.price * ticket.count).toLocaleString()} đ</p>
                        </div>
                        <div className="border-t border-gray-400 mt-2 pt-2 text-sm">
                            <p className="text-gray-300 flex justify-between">
                                Tổng tạm tính:
                                <span className="text-[#9EF5CF]">{(ticket.price * ticket.count).toLocaleString()} đ</span>
                            </p>
                            <p className="text-white flex justify-between font-bold text-lg mt-2">
                                Tổng tiền:
                                <span className="text-[#00FF00]">{(ticket.price * ticket.count).toLocaleString()} đ</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TicketDetailClient;
