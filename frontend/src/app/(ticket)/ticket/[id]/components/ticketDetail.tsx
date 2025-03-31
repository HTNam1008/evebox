'use client';

import Image from 'next/image';
import { IUserTicketById } from '@/types/model/ticketInfoById';

interface TicketDetailProps {
    ticket: IUserTicketById;
}

const TicketDetailClient = ({ ticket }: TicketDetailProps) => {
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

    return (
        <div className="mt-8 min-h-screen flex justify-center items-center px-4">
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
                            <p className="text-[#9EF5CF] font-semibold">{ticket.seats[0]?.Row.Section.name || "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Hàng: Ghế</p>
                            <p className="text-[#9EF5CF] font-semibold">{ticket.seats[0]?.Row.name}: {ticket.seats[0]?.name || "-"}</p>
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

                    <div className="flex justify-end mt-6">
                        <div className="bg-[#9EF5CF] p-2 rounded-lg flex flex-col items-center gap-2">
                            {ticket.TicketQRCode && ticket.TicketQRCode.length > 0 ? (
                                ticket.TicketQRCode.map((ticketQR, index) => (
                                    <Image
                                        key={index}
                                        src={ticketQR.qrCode.startsWith('data:image') ? ticketQR.qrCode : `data:image/png;base64,${ticketQR.qrCode}`}
                                        alt="QR Code"
                                        width={100}
                                        height={100}
                                        className="border border-gray-400 rounded-lg"
                                    />
                                ))
                            ) : (
                                <span className="text-sm text-[#0C4762]">
                                    Vui lòng tải app Ticketbox để xem mã QR vé
                                </span>
                            )}
                            {/* Dòng chữ nằm dưới mã QR */}
                            {ticket.TicketQRCode && ticket.TicketQRCode.length > 0 && (
                                <span className="text-sm text-[#0C4762] font-semibold">Mã QR vé</span>
                            )}
                        </div>
                    </div>

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
