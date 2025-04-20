'use client'

/* Package System */
import { useRouter } from 'next/navigation';

/* Package Application */
import { TicketTypeProps } from "../../lib/interface/ticketTable.interface";

interface TicketTableProps {
    showingID: string;
    ticketTypeIds: number[];
}

export default function TicketTable({ showingID, ticketTypeIds }: TicketTableProps) {
    const router = useRouter();

    //call api để fetch theo các ID vé trong mảng "ticketTypeIds"
    const data: TicketTypeProps[] = [
        {
            id: ticketTypeIds[0].toString(),
            name: "VIP",
            startTime: "2025-04-09T16:22:12.000Z",
            endTime: "2025-04-09T17:00:00.000Z",
            description: "Ngồi vị trí gần khán đài",
            price: 350000,
            quantity: 100,
            sold: 80,
            status: "book_now",
        },
        {
            id: ticketTypeIds[1].toString(),
            name: "Thường",
            startTime: "2025-04-09T16:22:12.000Z",
            endTime: "2025-04-09T17:00:00.000Z",
            description: "Ngồi vị trí gần khán đài",
            price: 0,
            quantity: 500,
            sold: 500,
            status: "sold_out",
        },
        {
            id: ticketTypeIds[2].toString(),
            name: "Ưu tiên",
            startTime: "2025-04-09T16:22:12.000Z",
            endTime: "2025-04-09T17:00:00.000Z",
            description: "Ngồi vị trí gần khán đài",
            price: 600000,
            quantity: 10,
            sold: 0,
            status: "sale_closed",
        },
        {
            id: ticketTypeIds[3].toString(),
            name: "Hạng A",
            startTime: "2025-04-09T16:22:12.000Z",
            endTime: "2025-04-09T17:00:00.000Z",
            description: "Ngồi vị trí gần khán đài",
            price: 250000,
            quantity: 10,
            sold: 0,
            status: "not_open",
        }
    ]

    return (
        <>
            <div className="table-ticket px-8 mb-10">
                <div className="overflow-x-auto rounded-xl shadow-md mt-3">
                    <table className="min-w-full border border-gray-200">
                        <thead>
                            <tr className="bg-[#0C4762] text-center text-white text-xs rounded-t-lg">
                                <th className="px-4 py-3 cursor-pointer">
                                    ID
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[120px]">
                                    Tên vé
                                </th>
                                <th className="px-4 py-3 cursor-pointer">
                                    Mô tả
                                </th>
                                <th className="px-4 py-3 cursor-pointer">
                                    Giá vé
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[90px]">
                                    Số lượng vé
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[90px]">
                                    Đã bán
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[90px]">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {data.map((ticket, index) => (
                                <tr key={ticket.id ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => router.push(`/admin/showing-management/${showingID}/ticket/${ticket.id}`)}>
                                    <td className="px-4 py-3 text-center border-r border-gray-200">{ticket.id}</td>
                                    <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        <div className="line-clamp-2 leading-snug">
                                            {ticket.name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        <div className="line-clamp-3 leading-snug">
                                            <span>
                                                {`${new Date(ticket.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} - ${new Date(ticket.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} ${new Date(ticket.startTime).toLocaleDateString('vi-VN')}`}
                                            </span>
                                            <br></br>{ticket.description}
                                        </div>
                                    </td>
                                    <td className="text-center px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        {ticket.price === 0 ? "Miễn phí" : `${ticket.price} VNĐ`}
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-gray-200">
                                        {ticket.quantity}
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center cursor-pointer">
                                        {ticket.sold}
                                    </td>
                                    <td className="action-btn px-4 py-3 border-r border-gray-200 text-center">
                                        {ticket.status === "book_now" && (
                                            <span className="min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border bg-[#9EF5CF] text-[#0C4762] border-[#9EF5CF]">
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}