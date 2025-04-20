'use client'

/* Package System */
import { useState } from "react";
import { useRouter } from 'next/navigation';

/* Package Application */
import { Event } from "../lib/interface/eventspecialtable.interface";
import ToggleSpecialButton from "./toggleSpecialButton";
import ToggleOnlyOnEveButton from "./toggleOnlyOnEveButton";
import ToggleCategoryButton from "./toggleCategoryButton";
import { Category } from "../../event-management/lib/interface/eventtable.interface";
import Pagination from "./common/pagination";
import { EventSpecialTableProps } from "../lib/interface/eventspecialtable.interface";
import SortIcon from "../../account-management/components/sortIcon";
import { sortEvents } from "../lib/function/sortEvents";

export default function EventSpecialTable({ searchKeyword, categoryFilter }: EventSpecialTableProps) {
    const data: Event[] = [
        {
            id: 1,
            title: 'SÂN KHẤU NO.1 | VỞ KỊCH | MẶT NẠ DA NGƯỜI',
            Images_Events_imgPosterIdToImages: {
                id: 1,
                url: 'https://fastly.picsum.photos/id/513/200/200.jpg?hmac=xMRZhdrttvlfIvOf0Qm9J4texbmA0HS2pBNVM-Pho-U',
            },
            isOnlyOnEve: true,
            isSpecial: false,
            categories: [
                {
                    id: 1,
                    name: "Âm nhạc"
                }
            ]
        },
        {
            id: 2,
            title: 'Tech4Good Conference',
            Images_Events_imgPosterIdToImages: {
                id: 2,
                url: 'https://fastly.picsum.photos/id/82/200/200.jpg?hmac=ATNAhTLN2dA0KmTzSE5D9XiPe3GMX8uwxpFlhU7U5OY',
            },
            isOnlyOnEve: false,
            isSpecial: false,
            categories: [
                {
                    id: 2,
                    name: "Sân khấu & Nghệ thuật"
                },
                {
                    id: 4,
                    name: "Khác"
                }
            ]
        },
        {
            id: 3,
            title: 'AI Startup Pitching',
            Images_Events_imgPosterIdToImages: null,
            isOnlyOnEve: true,
            isSpecial: true,
            categories: [
                {
                    id: 3,
                    name: "Thể thao"
                }
            ]
        },
        {
            id: 4,
            title: '(Hà Nội) Piano solo - David Greilsammer | Du hành cùng Satie ',
            Images_Events_imgPosterIdToImages: null,
            isOnlyOnEve: false,
            isSpecial: false,
            categories: [
                {
                    id: 4,
                    name: "Khác"
                }
            ]
        },
        {
            id: 5,
            title: 'VUI TẾT THIẾU NHI CÙNG NHẠC NƯỚC VAN PHUC WATER SHOW',
            Images_Events_imgPosterIdToImages: {
                id: 5,
                url: "https://fastly.picsum.photos/id/442/200/200.jpg?hmac=S-yNCNr30GK97ulUYoey_Fh2-czIf7YnNgcKp7zrEoE"
            },
            isOnlyOnEve: false,
            isSpecial: true,
            categories: [
                {
                    id: 1,
                    name: "Âm nhạc"
                },
                {
                    id: 2,
                    name: "Sân khấu & Nghệ thuật"
                }
            ]
        },
    ]

    const router = useRouter();
    const [events, setEvents] = useState<Event[]>(data);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Event; direction: 'asc' | 'desc' } | null>(null);

    const handleSort = (key: keyof Event) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' }; // Mặc định là asc
            }
        });
    };

    //Thêm hoặc bỏ khỏi Sự kiện đặc biệt
    const handleToggleSpecial = (eventId: number, newIsSpecial: boolean) => {
        setEvents((prevEvents) =>
            prevEvents.map((ev) =>
                ev.id === eventId ? { ...ev, isSpecial: newIsSpecial } : ev
            )
        );
    };

    //Thêm hoặc bỏ khỏi Sự kiện chỉ có trên EveBox
    const handleToggleOnlyOnEve = (eventId: number, newIsOnlyOnEve: boolean) => {
        setEvents((prevEvents) =>
            prevEvents.map((ev) =>
                ev.id === eventId ? { ...ev, isOnlyOnEve: newIsOnlyOnEve } : ev
            )
        );
    };

    //Thêm hoặc bỏ khỏi Categories
    const handleToggleCategory = (eventId: number, newCategories: Category[]) => {
        setEvents((prevEvents) =>
            prevEvents.map((ev) =>
                ev.id === eventId ? { ...ev, categories: newCategories } : ev
            )
        );
    };

    const filteredEvents = events.filter(event => {
        const matchSearch = event.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            event.id.toString().includes(searchKeyword);

        let matchCategory = true;
        if (categoryFilter === "__onlyOnEve") {
            matchCategory = event.isOnlyOnEve === true;
        } else if (categoryFilter === "__special") {
            matchCategory = event.isSpecial === true;
        } else if (categoryFilter) {
            matchCategory = event.categories.some(cat => cat.name === categoryFilter);
        }

        return matchSearch && matchCategory;
    });

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

    const sortedEvents = sortEvents(filteredEvents, sortConfig);
    const paginatedData = sortedEvents.slice(startItem - 1, endItem);

    return (
        <>
            <div className="table-event-special-management overflow-x-auto rounded-xl shadow-md mt-6">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-[#0C4762] text-center text-white text-xs rounded-t-lg">
                            <th className="px-4 py-3 cursor-pointer min-w-[65px]" onClick={() => handleSort('id')}>
                                ID <SortIcon field="id" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3 min-w-[84px]">Hình ảnh</th>
                            <th className="px-4 py-3 cursor-pointer min-w-[155px]" onClick={() => handleSort('title')}>
                                Tên sự kiện <SortIcon field="title" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3 cursor-pointer min-w-[130px]">Sự kiện đặc biệt</th>
                            <th className="px-4 py-3 cursor-pointer min-w-[140px]">Chỉ có trên EveBox</th>
                            <th className="px-4 py-3 cursor-pointer min-w-[100px]">Âm nhạc</th>
                            <th className="px-4 py-3 cursor-pointer min-w-[90px]">Sân khấu & Nghệ thuật</th>
                            <th className="px-4 py-3 cursor-pointer min-w-[100px]">Thể thao</th>
                            <th className="px-4 py-3 cursor-pointer min-w-[82px]">Khác</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((event, index) => (
                                <tr key={event.id ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                    <td className="px-4 py-3 text-center border-r border-gray-200">{event.id}</td>
                                    <td className="px-4 py-3 border-r border-gray-200 cursor-pointer text-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img className="rounded-md object-cover transition duration-300 transform hover:scale-150" alt="Event Logo"
                                            src={event.Images_Events_imgPosterIdToImages?.url || "https://res.cloudinary.com/de66mx8mw/image/upload/v1744458011/defaultImgEvent_spjrst.png"}
                                            width={50} height={50}
                                        />
                                    </td>
                                    <td onClick={() => router.push(`/admin/event-management/${event.id}`)} className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        <div className="line-clamp-2 leading-snug" title={event.title}>
                                            {event.title}
                                        </div>
                                    </td>
                                    <ToggleSpecialButton event={event} onToggle={handleToggleSpecial} />
                                    <ToggleOnlyOnEveButton event={event} onToggle={handleToggleOnlyOnEve} />
                                    <td className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
                                        <ToggleCategoryButton event={event} fullCategory={{ id: 1, name: "Âm nhạc" }} onToggle={handleToggleCategory} />
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-gray-200">
                                        <ToggleCategoryButton event={event} fullCategory={{ id: 2, name: "Sân khấu & Nghệ thuật" }} onToggle={handleToggleCategory} />
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-200 text-center cursor-pointer">
                                        <ToggleCategoryButton event={event} fullCategory={{ id: 3, name: "Thể thao" }} onToggle={handleToggleCategory} />
                                    </td>
                                    <td className="action-btn px-4 py-3 border-r border-gray-200 text-center">
                                        <ToggleCategoryButton event={event} fullCategory={{ id: 4, name: "Khác" }} onToggle={handleToggleCategory} />
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
                totalItems={data.length}
                itemsPerPage={itemsPerPage}
                onPrevious={handlePrevious}
                onNext={handleNext} />
        </>
    )
}