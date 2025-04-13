'use client'

/* Package System */
import { useState } from "react";
import { CalendarOff, Check, Trash2 } from "lucide-react";

/* Package Application */
import { Event } from "../lib/interface/eventtable.interface";
import ConfirmApprovalDialog from "./dialog/confirmApproval";

export default function EventTable() {
    const data: Event[] = [
        {
            id: 1,
            title: 'SÂN KHẤU NO.1 | VỞ KỊCH | MẶT NẠ DA NGƯỜI',
            organizerId: 'Nguyễn Ngọc Hà',
            createdAt: '2024-10-12T12:34:56Z',
            venue: 'Sân khấu kịch No.1',
            isApproved: true,
            deletedAt: null,
            isOnline: true,
            Images_Events_imgPosterIdToImages: {
                id: 1,
                url: 'https://fastly.picsum.photos/id/513/200/200.jpg?hmac=xMRZhdrttvlfIvOf0Qm9J4texbmA0HS2pBNVM-Pho-U',
            },
        },
        {
            id: 2,
            title: 'Tech4Good Conference',
            organizerId: 'Trần Ngọc Hải',
            createdAt: '2024-09-20T08:15:00Z',
            venue: 'Trung Tâm Hội Chợ Triển Lãm Sài Gòn SECC',
            isApproved: false,
            deletedAt: null,
            isOnline: true,
            Images_Events_imgPosterIdToImages: {
                id: 2,
                url: 'https://fastly.picsum.photos/id/82/200/200.jpg?hmac=ATNAhTLN2dA0KmTzSE5D9XiPe3GMX8uwxpFlhU7U5OY',
            }
        },
        {
            id: 3,
            title: 'AI Startup Pitching',
            organizerId: 'Huỳnh Thiên Nga',
            createdAt: '2024-11-01T10:00:00Z',
            venue: 'Trung tâm sáng tạo khoa học - kỹ thuật (TSK)',
            isApproved: true,
            isOnline: true,
            deletedAt: null,
            Images_Events_imgPosterIdToImages: null,
        },
        {
            id: 4,
            title: '(Hà Nội) Piano solo - David Greilsammer | Du hành cùng Satie ',
            organizerId: 'Cao Thiên Ý',
            createdAt: '2025-03-16T19:51:36.946Z',
            venue: 'Trường Pháp quốc tế Alexandre Yersin',
            isApproved: true,
            isOnline: true,
            deletedAt: '2025-03-20T19:51:36.946Z',
            Images_Events_imgPosterIdToImages: null,
        },
        {
            id: 5,
            title: 'VUI TẾT THIẾU NHI CÙNG NHẠC NƯỚC VAN PHUC WATER SHOW',
            organizerId: 'Hoàng Văn An',
            createdAt: '2025-02-16T19:51:36.946Z',
            venue: 'Quảng trường Diamond, Van Phuc Water Show',
            isApproved: false,
            isOnline: false,
            deletedAt: '2025-03-01T19:51:36.946Z',
            Images_Events_imgPosterIdToImages: {
                id: 5,
                url: "https://fastly.picsum.photos/id/442/200/200.jpg?hmac=S-yNCNr30GK97ulUYoey_Fh2-czIf7YnNgcKp7zrEoE"
            },
        },
    ];

    const [events, setEvents] = useState<Event[]>(data);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleStatusClick = (event: Event) => {
        setSelectedEvent(event);
        setIsDialogOpen(true);
    };

    const handleConfirmApproval = () => {
        if (selectedEvent) {
            // Update logic
            const updatedData = events.map(item =>
                item.id === selectedEvent.id
                    ? { ...item, isApproved: true }
                    : item
            );
    
            setEvents(updatedData); 
            setSelectedEvent(null);
        }
    };

    return (
        <>
            <div className="overflow-x-auto rounded-xl shadow-md mt-6">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-[#0C4762] text-center text-white text-xs text-left rounded-t-lg">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3 min-w-[88px]">Hình ảnh</th>
                            <th className="px-4 py-3 cursor-pointer min-w-[170px]" >
                                Tên sự kiện
                            </th>
                            <th className="px-4 py-3 cursor-pointer min-w-[100px]" >
                                Loại sự kiện
                            </th>
                            <th className="px-4 py-3 cursor-pointer min-w-[140px]" >
                                Địa điểm
                            </th>
                            <th className="px-4 py-3 cursor-pointer min-w-[125px]">
                                Người tạo
                            </th>
                            <th className="px-4 py-3 cursor-pointer">
                                Ngày tạo
                            </th>
                            <th className="px-4 py-3 cursor-pointer">
                                Trạng thái
                            </th>
                            <th className="px-4 py-3 cursor-pointer min-w-[85px]">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {events.map((event, index) => (
                            <tr key={event.id ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                <td className="px-4 py-3 text-center border-r border-gray-200">{event.id}</td>
                                <td className="px-4 py-3 border-r border-gray-200 cursor-pointer text-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img className="rounded-md object-cover" alt="Event Logo"
                                        src={event.Images_Events_imgPosterIdToImages?.url || "https://res.cloudinary.com/de66mx8mw/image/upload/v1744458011/defaultImgEvent_spjrst.png"}
                                        width={50} height={50}
                                    />
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200 cursor-pointer">{event.title}</td>
                                <td className="px-4 py-3 border-r border-gray-200 text-center">
                                    {event.isOnline ? "Online" : "Offline"}
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">{event.venue}</td>
                                <td className="px-4 py-3 border-r border-gray-200">{event.organizerId}</td>
                                <td className="px-4 py-3 text-center border-r border-gray-200">
                                    {new Date(event.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200 text-center cursor-pointer">
                                    <span className={`min-w-[90px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border                                                               
                                            ${event.deletedAt
                                            ? 'bg-gray-200 text-gray-500 border-gray-500'
                                            : event.isApproved
                                                ? 'bg-teal-100 text-teal-500 border-teal-500'
                                                : 'bg-yellow-100 text-yellow-500 border-yellow-500'
                                        }`}>
                                        {event.deletedAt ? "Đã xóa" : event.isApproved ? "Đã duyệt" : "Chờ duyệt"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200 text-center">
                                    <div className="flex justify-center items-center gap-x-2">
                                        {event.deletedAt === null && event.isApproved === false && (
                                            <Check className="p-1 bg-teal-400 text-white rounded w-6 h-6 cursor-pointer"
                                                onClick={() => handleStatusClick(event)} />
                                        )}

                                        {event.deletedAt === null && event.isApproved === true && (
                                            <CalendarOff className="p-1 bg-yellow-400 text-white rounded w-6 h-6 cursor-pointer"/>
                                        )}

                                        {event.deletedAt && (<Trash2 className="p-1 bg-red-500 text-white rounded w-6 h-6 cursor-pointer" />)}

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <div className="flex items-center justify-between mt-4 px-2 text-sm text-gray-500">
                {/* <p>Hiển thị {startItem}-{endItem} của {totalItems}</p> */}

                <div className="inline-flex items-center rounded-full border border-gray-300 overflow-hidden">
                    {/* Nút Previous */}
                    {/* <button
                        onClick={handlePrevious} disabled={currentPage === 1}
                        className={`w-8 h-8 flex items-center justify-center 
                                                ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button> */}

                    <div className="h-6 w-px bg-gray-300" />

                    {/* Nút Next */}
                    {/* <button
                        onClick={handleNext} disabled={currentPage === totalPages}
                        className={`w-8 h-8 flex items-center justify-center 
                                                ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button> */}
                </div>
            </div>

            {selectedEvent && (
                <ConfirmApprovalDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onConfirm={handleConfirmApproval}
                />
            )}
        </>
    )
}