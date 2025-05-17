'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";

/* Package Application */
import { Showing } from "../../../showing-management/lib/interface/showingTable.interface"
import SortIcon from '../../../account-management/components/sortIcon';
import { sortShowingData } from '../../lib/function/sortShowing';
import { getShowingsOfEvent } from '@/services/event.service';

export default function ShowingTable({ eventId, eventTitle }: { eventId: number, eventTitle: string }) {
    //Tạm thời gán cứng -> Truyền thêm ID của event và fetch API showing theo ID của event đó
    const [showingData, setShowingData] = useState<Showing[] | null>(null);
    const [isLoadingShowing, setIsLoadingShowing] = useState<boolean>(true);

    useEffect(() => {
        const fetchShowings = async () => {
            try {
                if (eventId) {
                    const res = await getShowingsOfEvent(eventId);

                    setShowingData(res);
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu suất diễn', error);
                toast.error('Lỗi khi tải dữ liệu suất diễn')
            } finally {
                setIsLoadingShowing(false);
            }
        }

        fetchShowings();
    }, [eventId])

    const router = useRouter();
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

    const sortedData = sortShowingData(showingData ?? [], sortConfig);

    return (
        <>
            <div className='px-8'>
                <div className="table-showing-management overflow-x-auto rounded-xl shadow-md mt-3 mb-10">
                    <table className="min-w-full border border-gray-200">
                        <thead>
                            <tr className="bg-[#0C4762] text-center text-white text-xs rounded-t-lg">
                                <th className="px-4 py-3 cursor-pointer min-w-[64px]" onClick={() => handleSort("id")}>
                                    ID <SortIcon field="id" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer min-w-[160px]" onClick={() => handleSort("event")}>
                                    Tên sự kiện <SortIcon field="event" sortConfig={sortConfig} />
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
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {isLoadingShowing ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-4 text-gray-500">
                                        Đang tải dữ liệu...
                                    </td>
                                </tr>
                            ) : (
                                sortedData && sortedData.length !== 0 ? (
                                    sortedData.map((showing, index) => (
                                        <tr key={showing.id ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                            <td className="px-4 py-3 text-center border-r border-gray-200">{showing.id}</td>
                                            <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                                <div className="line-clamp-2 leading-snug" title={eventTitle}>
                                                    {eventTitle}
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
                                            Sự kiện này không có suất diễn
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}