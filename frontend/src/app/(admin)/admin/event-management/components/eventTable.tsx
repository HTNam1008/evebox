'use client'

/* Package System */
import { useEffect, useState, useCallback } from "react";
import { CalendarOff, Check } from "lucide-react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from "next/image";

/* Package Application */
import { EventAdminTable } from "../lib/interface/eventTable.interface";
import ConfirmApprovalDialog from "./dialog/confirmApproval";
import ConfirmSupspendDialog from "./dialog/confirmSupspend";
import ConfirmDeleteDialog from "./dialog/confirmDelete";
import { EventTableProps } from "../lib/interface/eventTable.interface";
import Pagination from "./common/pagination";
import SortIcon from "../../account-management/components/sortIcon";
import { sortEvents } from "../lib/function/sortEvents";
import { getEventsManagement, updateEventAdmin } from "@/services/event.service";
import EventTableSkeleton from "./common/eventTableSkeleton";

export default function EventTable({ activeTab, searchKeyword, categoryFilter, dateFrom, dateTo }: EventTableProps) {
    const [events, setEvents] = useState<EventAdminTable[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
    const [isLoadingEventAction, setIsLoadingEventAction] = useState<boolean>(false);
    const router = useRouter();
    const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
    const [isSupspendDialogOpen, setIsSupspendDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventAdminTable | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof EventAdminTable; direction: 'asc' | 'desc' } | null>(null);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const fetchEvents = useCallback(async () => {
        try {
            setEvents([])
            setIsLoadingEvents(true);

            const mapCategoryNameToId = (vnName: string): number | undefined => {
                switch (vnName) {
                    case 'Âm nhạc': return 1;
                    case 'Sân khấu & Nghệ thuật': return 2;
                    case 'Thể thao': return 3;
                    case 'Khác': return 4;
                    default: return undefined;
                }
            };

            const res = await getEventsManagement({
                page: currentPage,
                limit: itemsPerPage,
                createdFrom: dateFrom || undefined,
                createdTo: dateTo || undefined,
                isApproved: activeTab === "approved" ? true : activeTab === "pending" ? false : undefined,
                categoryId: categoryFilter ? mapCategoryNameToId(categoryFilter) : undefined,
                isDeleted: activeTab === "deleted" ? true : undefined,
                search: searchKeyword ?? "",
            });

            setEvents(res.data);
            setTotalItems(res.meta.totalCount);
            setTotalPages(res.meta.totalPages);
        } catch (error) {
            toast.error(`Lỗi khi tải dữ liệu sự kiện: ${error}`);
            setEvents([]);
        } finally {
            setIsLoadingEvents(false);
        }
    }, [activeTab, categoryFilter, currentPage, dateFrom, dateTo, itemsPerPage, searchKeyword]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const sortedEvents = sortEvents(events, sortConfig);
    const paginatedData = sortedEvents;

    const handleSort = (key: keyof EventAdminTable) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' };
            }
        });
    };

    const handleApprovalClick = (event: EventAdminTable) => {
        setSelectedEvent(event);
        setIsApprovalDialogOpen(true);
    };

    const handleConfirmApproval = async () => {
        if (selectedEvent) {
            try {
                setIsLoadingEventAction(true);
                const result = await updateEventAdmin(selectedEvent.id, {
                    isApproved: true,
                });

                if (result === false) {
                    toast.error("Duyệt sự kiện thất bại!");
                    return;
                }

                toast.success("Duyệt sự kiện thành công!");
                fetchEvents();
            } catch (error) {
                console.error("🚀 ~ handleConfirmApproval ~ error:", error)
                toast.error("Lỗi khi duyệt sự kiện");
            } finally {
                setIsLoadingEventAction(false);
            }
        }
    };

    const handleSupspendClick = (event: EventAdminTable) => {
        setSelectedEvent(event);
        setIsSupspendDialogOpen(true);
    };

    const handleConfirmSupspend = async () => {
        if (selectedEvent) {
            try {
                setIsLoadingEventAction(true);
                const result = await updateEventAdmin(selectedEvent.id, {
                    isApproved: false,
                });

                if (result === false) {
                    toast.error("Đình chỉ sự kiện thất bại!");
                    return;
                }

                toast.success("Đình chỉ sự kiện thành công!");
                fetchEvents();
            } catch (error) {
                console.error("🚀 ~ handleConfirmSupspend ~ error:", error)
                toast.error("Lỗi khi đình chỉ sự kiện");
            } finally {
                setIsLoadingEventAction(false);
            }
        }
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

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleTransferCategory = (cat: string): string => {
        switch (cat) {
            case 'music': return 'Âm nhạc'
            case 'theaterstandard': return 'Sân khấu & Nghệ thuật'
            case 'sport': return 'Thể thao'
            default: return 'Khác'
        }
    }

    return (
        isLoadingEvents ? (
            <EventTableSkeleton />
        ) : (
            <>
                <div className="table-event-management overflow-x-auto rounded-xl shadow-md mt-6">
                    <table className="min-w-full border border-gray-200">
                        <thead>
                            <tr className="bg-[#0C4762] text-center text-white text-xs rounded-t-lg">
                                <th className="px-4 py-3 cursor-pointer min-w-[64px]" onClick={() => handleSort('id')}>
                                    ID <SortIcon field="id" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 min-w-[85px]">Hình ảnh</th>
                                <th className="px-4 py-3 cursor-pointer min-w-[160px]" onClick={() => handleSort('title')}>
                                    Tên sự kiện <SortIcon field="name" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[100px]">
                                    Thể loại
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[140px]">
                                    Địa điểm
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[118px]" onClick={() => handleSort('organizerId')}>
                                    Người tạo <SortIcon field="organizerId" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[102px]" onClick={() => handleSort('createdAt')}>
                                    Ngày tạo <SortIcon field="createdAt" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer">
                                    Trạng thái
                                </th>
                                {activeTab !== "deleted" && <th className="px-4 py-3 cursor-pointer min-w-[82px]">Thao tác</th>}
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((event) => (
                                    <tr key={event.id} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                        <td className="px-4 py-3 text-center border-r border-gray-200">{event.id}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 text-center">
                                            <Image
                                                className="rounded-md object-cover transition duration-300 transform hover:scale-150"
                                                alt="Event Poster"
                                                src={event.Images_Events_imgPosterIdToImages?.imageUrl ||
                                                    "https://res.cloudinary.com/de66mx8mw/image/upload/v1744458011/defaultImgEvent_spjrst.png"}
                                                width={50}
                                                height={50}
                                            />
                                        </td>
                                        <td onClick={() => router.push(`/admin/event-management/${event.id}`)} className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                            <div className="line-clamp-2 leading-snug" title={event.title}>
                                                {event.title}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200 max-w-[200px]">
                                            <div className="line-clamp-3 leading-snug" title={event.categories.map(c => c.name).join(", ")}>
                                                {event.categories.map(c => handleTransferCategory(c.name)).join(", ")}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">
                                            <div className="line-clamp-2 leading-snug" title={event.venue ?? ''}>
                                                {event.venue}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">{event.organizerId}</td>
                                        <td className="px-4 py-3 text-center border-r border-gray-200">
                                            {new Date(event.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200 text-center">
                                            <span className={`min-w-[90px] inline-block px-4 py-1 rounded-full text-xs font-semibold border
                                            ${event.deleteAt
                                                    ? 'bg-gray-200 text-gray-500 border-gray-500'
                                                    : event.isApproved
                                                        ? 'bg-teal-100 text-teal-500 border-teal-500'
                                                        : 'bg-yellow-100 text-yellow-500 border-yellow-500'
                                                }`}>
                                                {event.deleteAt ? "Đã xóa" : event.isApproved ? "Đã duyệt" : "Chờ duyệt"}
                                            </span>
                                        </td>
                                        {!event.deleteAt && (
                                            <td className="px-4 py-3 border-r border-gray-200 text-center">
                                                <div className="flex justify-center items-center gap-x-2">
                                                    {!event.deleteAt && !event.isApproved && (
                                                        <Check className="p-1 bg-teal-400 text-white rounded w-6 h-6 cursor-pointer"
                                                            onClick={() => handleApprovalClick(event)} />
                                                    )}

                                                    {!event.deleteAt && event.isApproved && (
                                                        <CalendarOff className="p-1 bg-yellow-400 text-white rounded w-6 h-6 cursor-pointer"
                                                            onClick={() => handleSupspendClick(event)} />
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-4 text-gray-500">
                                        Không có sự kiện nào khớp với tìm kiếm
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPrevious={handlePrevious}
                    onNext={handleNext} />

                {selectedEvent && (
                    <>
                        <ConfirmApprovalDialog
                            open={isApprovalDialogOpen}
                            onClose={() => setIsApprovalDialogOpen(false)}
                            onConfirm={handleConfirmApproval}
                            isLoading={isLoadingEventAction}
                        />
                        <ConfirmSupspendDialog
                            open={isSupspendDialogOpen}
                            onClose={() => setIsSupspendDialogOpen(false)}
                            onConfirm={handleConfirmSupspend}
                            isLoading={isLoadingEventAction}
                        />
                        <ConfirmDeleteDialog
                            open={isDeleteDialogOpen}
                            onClose={() => setIsDeleteDialogOpen(false)}
                            onConfirm={handleConfirmDelete}
                            isLoading={isLoadingEventAction}
                        />
                    </>
                )}
            </>
        )
    )
}