'use client'

/* Package System */
import { useEffect, useState } from "react";
import { CalendarOff, Check, Trash2 } from "lucide-react";
import toast from 'react-hot-toast';

/* Package Application */
import { Event } from "../lib/interface/eventtable.interface";
import ConfirmApprovalDialog from "./dialog/confirmApproval";
import ConfirmSupspendDialog from "./dialog/confirmSupspend";
import ConfirmDeleteDialog from "./dialog/confirmDelete";
import { EventTableProps } from "../lib/interface/eventtable.interface";
import Pagination from "./common/pagination";

export default function EventTable({ activeTab, searchKeyword }: EventTableProps) {
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
    const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
    const [isSupspendDialogOpen, setIsSupspendDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const filteredEvents = events.filter(event => {
        const matchSearch = event.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            event.id.toString().includes(searchKeyword);

        // switch (activeTab) {
        //     case "pending":
        //         return !event.deletedAt && !event.isApproved;
        //     case "approved":
        //         return !event.deletedAt && event.isApproved;
        //     case "deleted":
        //         return event.deletedAt !== null;
        //     default:
        //         return true;
        // }
        let matchTab = false;

        switch (activeTab) {
            case "pending":
                matchTab = !event.deletedAt && !event.isApproved;
                break;
            case "approved":
                matchTab = !event.deletedAt && event.isApproved;
                break;
            case "deleted":
                matchTab = event.deletedAt !== null;
                break;
            default:
                matchTab = true;
        }

        return matchSearch && matchTab;
    });

    const handleApprovalClick = (event: Event) => {
        setSelectedEvent(event);
        setIsApprovalDialogOpen(true);
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
            toast.success("Duyệt sự kiện thành công!");
        }
    };

    const handleSupspendClick = (event: Event) => {
        setSelectedEvent(event);
        setIsSupspendDialogOpen(true);
    };

    const handleConfirmSupspend = () => {
        if (selectedEvent) {
            // Update logic
            const updatedData = events.map(item =>
                item.id === selectedEvent.id
                    ? { ...item, isApproved: false }
                    : item
            );

            setEvents(updatedData);
            setSelectedEvent(null);
            toast.success("Đình chỉ sự kiện thành công!");
        }
    };

    const handleDeleteClick = (event: Event) => {
        setSelectedEvent(event);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedEvent) {
            const updatedData = events.filter(item => item.id !== selectedEvent.id);
            setEvents(updatedData);
            setSelectedEvent(null);
            setIsDeleteDialogOpen(false);
            toast.success("Xóa sự kiện thành công!");
        }
    };

    //Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const totalItems = filteredEvents.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const paginatedData = filteredEvents.slice(startItem - 1, endItem);

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
                        {paginatedData.length > 0 ? (
                            paginatedData.map((event, index) => (
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
                                                    onClick={() => handleApprovalClick(event)} />
                                            )}

                                            {event.deletedAt === null && event.isApproved === true && (
                                                <CalendarOff className="p-1 bg-yellow-400 text-white rounded w-6 h-6 cursor-pointer"
                                                    onClick={() => handleSupspendClick(event)} />
                                            )}

                                            {event.deletedAt && (<Trash2 className="p-1 bg-red-500 text-white rounded w-6 h-6 cursor-pointer"
                                                onClick={() => handleDeleteClick(event)} />)}

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center py-4 text-gray-500">
                                    Không có sự kiện nào khớp với từ khóa tìm kiếm
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <Pagination
                currentPage={currentPage}
                totalItems={filteredEvents.length}
                itemsPerPage={itemsPerPage}
                onPrevious={handlePrevious}
                onNext={handleNext} />

            {selectedEvent && (
                <ConfirmApprovalDialog
                    open={isApprovalDialogOpen}
                    onClose={() => setIsApprovalDialogOpen(false)}
                    onConfirm={handleConfirmApproval}
                />
            )}

            {selectedEvent && (
                <ConfirmSupspendDialog
                    open={isSupspendDialogOpen}
                    onClose={() => setIsSupspendDialogOpen(false)}
                    onConfirm={handleConfirmSupspend}
                />
            )}

            {selectedEvent && (
                <ConfirmDeleteDialog
                    open={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    )
}