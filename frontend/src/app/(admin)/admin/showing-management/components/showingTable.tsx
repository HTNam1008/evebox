'use client'

/* Package System */
import { Eye } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

/* Package Application */
import { Showing } from "../lib/interface/showingTable.interface";
import Pagination from "./common/pagination";
import { ShowingTableProps } from "../lib/interface/showingTable.interface";
import SortIcon from "../../account-management/components/sortIcon";
import { sortShowings } from "../lib/function/sortShowings";
import { getShowingsManagement } from "@/services/event.service";
import ShowingTableSkeleton from "./common/showingTableSkeleton";

export default function ShowingTable({ searchKeyword, dateFrom, dateTo }: ShowingTableProps) {
    const [showings, setShowings] = useState<Showing[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const [sortConfig, setSortConfig] = useState<{ key: keyof Showing; direction: 'asc' | 'desc' } | null>(null);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchShowings = useCallback(async () => {
        try {
            setShowings([]);
            setIsLoading(true);

            const res = await getShowingsManagement({
                page: currentPage,
                limit: itemsPerPage,
                startTime: dateFrom || undefined,
                endTime: dateTo || undefined,
                search: searchKeyword ?? ""
            });

            setShowings(res.data);
            setTotalItems(res.meta.totalCount);
            setTotalPages(res.meta.totalPages);
        } catch (error) {
            toast.error(`Lỗi khi tải dữ liệu suất diễn ${error}`);
            setShowings([]);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, dateFrom, dateTo, itemsPerPage, searchKeyword]);

    useEffect(() => {
        fetchShowings();
    }, [fetchShowings]);

    const handleSort = (key: keyof Showing) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' }; // Mặc định là asc
            }
        });
    };


    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const sortedShowings = sortShowings(showings, sortConfig);
    const paginatedData = sortedShowings;

    return (
        isLoading ? (
            <ShowingTableSkeleton />
        ) : (
            <>
                <div className="table-showing-management overflow-x-auto rounded-xl shadow-md mt-6">
                    <table className="min-w-full border border-gray-200">
                        <thead>
                            <tr className="bg-[#0C4762] text-center text-white text-xs rounded-t-lg">
                                <th className="px-4 py-3 cursor-pointer min-w-[64px]" onClick={() => handleSort("id")}>
                                    ID<SortIcon field="id" sortConfig={sortConfig} />
                                </th >
                                <th className="px-4 py-3 cursor-pointer min-w-[160px]" onClick={() => handleSort("event")}>
                                    Tên sự kiện <SortIcon field="eventTitle" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[100px]" onClick={() => handleSort("startTime")}>
                                    Ngày-giờ bắt đầu <SortIcon field="startTime" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[140px]" onClick={() => handleSort("endTime")}>
                                    Ngày-giờ kết thúc <SortIcon field="endTime" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[118px]" onClick={() => handleSort("seatMapId")}>
                                    Seat map <SortIcon field="seatMapId" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[102px]" onClick={() => handleSort("ticketTypes")}>
                                    Số loại vé <SortIcon field="numTicketType" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[82px]">Thao tác</th>
                            </tr >
                        </thead >
                        <tbody className="text-xs">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((showing, index) => (
                                    <tr key={showing.id ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                        <td className="px-4 py-3 text-center border-r border-gray-200">{showing.id}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                            <div className="line-clamp-2 leading-snug" title={showing.event.title}>
                                                {showing.event.title}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                            <div className="line-clamp-3 leading-snug text-center">
                                                <span>{`${new Date(showing.startTime).toLocaleDateString('vi-VN')} - ${new Date(showing.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}`}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                            <div className="line-clamp-2 leading-snug text-center">
                                                <span>{`${new Date(showing.endTime).toLocaleDateString('vi-VN')} - ${new Date(showing.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}`}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center border-r border-gray-200">
                                            {showing.seatMapId === 0 ? "Không" : "Có"}
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200 text-center cursor-pointer">
                                            {showing.ticketTypes.length} loại vé
                                        </td>
                                        <td className="action-btn px-4 py-3 border-r border-gray-200 text-center">
                                            <div className="flex justify-center items-center gap-x-2">
                                                <div title="Xem chi tiết" onClick={() => router.push(`/admin/showing-management/${showing.id}`)}>
                                                    <Eye className="approve-btn p-1 bg-teal-400 text-white rounded w-6 h-6 cursor-pointer" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-4 text-gray-500">
                                        Không có suất diễn nào khớp với từ khóa tìm kiếm
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table >
                </div >

                {/* Phân trang */}
                < Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPrevious={handlePrevious}
                    onNext={handleNext} />
            </>
        )
    )
}