'use client'

/* Package System */
import { Eye } from "lucide-react";
import { useState } from "react";

/* Package Application */
import { Showing } from "../lib/interface/showingtable.interface";
import Pagination from "./common/pagination";
import { ShowingTableProps } from "../lib/interface/showingtable.interface";
import SortIcon from "../../account-management/components/sortIcon";
import { sortShowings } from "../lib/function/sortShowings";

export default function ShowingTable({ searchKeyword, dateFrom, dateTo }: ShowingTableProps) {
    const data: Showing[] = [
        {
            id: '001',
            eventTitle: {
                id: 23327,
                title: 'SÂN KHẤU NO.1 | VỞ KỊCH | MẶT NẠ DA NGƯỜI',
            },
            startTime: '2025-04-25T07:30:00.000Z',
            endTime: '2025-06-06T09:30:00.000Z',
            seatMapId: 0,
            numTicketType: [
                { id: 1 },
                { id: 2 }
            ]
        },
        {
            id: '002',
            eventTitle: {
                id: 23300,
                title: '[THE GREENERY ART] WORKSHOP "XÀ PHÒNG ĐẠI DƯƠNG - OCEAN HANDMADE SOAP"',
            },
            startTime: '2025-03-27T20:30:00.000Z',
            endTime: '2025-03-27T17:00:00.000Z',
            seatMapId: 0,
            numTicketType: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
            ]
        },
        {
            id: '003',
            eventTitle: {
                id: 30000,
                title: '(Hà Nội) Piano solo - David Greilsammer | Du hành cùng Satie',
            },
            startTime: '2025-03-27T15:00:00.000Z',
            endTime: '2025-03-27T12:30:00.000Z',
            seatMapId: 12,
            numTicketType: [
                { id: 1 },
                { id: 2 }
            ]
        },
        {
            id: '005',
            eventTitle: {
                id: 23327,
                title: 'Chương trình TỊNH KHẨU tháng 11',
            },
            startTime: '2025-03-27T10:30:00.000Z',
            endTime: '2025-03-27T12:30:00.000Z',
            seatMapId: 0,
            numTicketType: [
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ]
        },
        {
            id: '008',
            eventTitle: {
                id: 1,
                title: 'Tom Chat Liveshow No.13 - Dạ Khúc Tháng Năm',
            },
            startTime: '2024-12-27T10:30:00.000Z',
            endTime: '2025-01-01T12:30:00.000Z',
            seatMapId: 256,
            numTicketType: [
                { id: 1 }
            ]
        },
    ];

    const [showings,] = useState<Showing[]>(data);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Showing; direction: 'asc' | 'desc' } | null>(null);

    const handleSort = (key: keyof Showing) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' }; // Mặc định là asc
            }
        });
    };

    const filteredShowings = showings.filter(showing => {
        const matchSearch = showing.eventTitle.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            showing.id.toString().includes(searchKeyword);

        const startDate = new Date(showing.startTime).toISOString().split('T')[0];
        const endDate = new Date(showing.endTime).toISOString().split('T')[0];
        const matchDateFrom = dateFrom ? startDate >= dateFrom : true;
        const matchDateTo = dateTo ? endDate <= dateTo : true;

        return matchSearch && matchDateFrom && matchDateTo;
    });

    const sortedShowings = sortShowings(filteredShowings, sortConfig);

    //Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const paginatedData = sortedShowings.slice(startItem - 1, endItem);

    return (
        <>
            <div className="table-event-management overflow-x-auto rounded-xl shadow-md mt-6">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-[#0C4762] text-center text-white text-xs rounded-t-lg">
                            <th className="px-4 py-3 cursor-pointer min-w-[64px]" onClick={() => handleSort("id")}>
                                ID <SortIcon field="id" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3 cursor-pointer min-w-[160px]" onClick={() => handleSort("eventTitle")}>
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
                            <th className="px-4 py-3 cursor-pointer min-w-[102px]" onClick={() => handleSort("numTicketType")}>
                                Số loại vé <SortIcon field="numTicketType" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3 cursor-pointer min-w-[82px]">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((showing, index) => (
                                <tr key={showing.id ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                    <td className="px-4 py-3 text-center border-r border-gray-200">{showing.id}</td>
                                    <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        <div className="line-clamp-2 leading-snug" title={showing.eventTitle.title}>
                                            {showing.eventTitle.title}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        <div className="line-clamp-3 leading-snug text-center">
                                            <span>{`${new Date(showing.startTime).toLocaleDateString('vi-VN')} - ${new Date(showing.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}`}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        <div className="line-clamp-2 leading-snug text-center">
                                            <span>{`${new Date(showing.endTime).toLocaleDateString('vi-VN')} - ${new Date(showing.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}`}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-gray-200">
                                        {showing.seatMapId === 0 ? "Không" : "Có"}
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center cursor-pointer">
                                        {showing.numTicketType.length} loại vé
                                    </td>
                                    <td className="action-btn px-4 py-3 border-r border-gray-200 text-center">
                                        <div className="flex justify-center items-center gap-x-2">
                                            <div title="Xem chi tiết">
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
                </table>
            </div>

            {/* Phân trang */}
            <Pagination
                currentPage={currentPage}
                totalItems={data.length}
                itemsPerPage={itemsPerPage}
                onPrevious={handlePrevious}
                onNext={handleNext} />
        </>
    )
}