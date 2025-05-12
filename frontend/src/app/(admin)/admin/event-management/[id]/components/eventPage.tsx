'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, House } from "lucide-react"
import Image from 'next/image';
import toast from 'react-hot-toast';
// import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

/* Package Application */
import ShowingTable from './showingTable';
import { EventDetail } from '../../lib/interface/eventTable.interface';
import { getEventDetail } from '@/services/event.service';

export default function EventDetailPage({ eventId }: { eventId: number }) {
    const router = useRouter();

    const [event, setEvent] = useState<EventDetail | null>(null);
    const [isLoadingEvent, setIsLoadingEvent] = useState<boolean>(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                if (eventId) {
                    const res = await getEventDetail(eventId);

                    setEvent(res);
                } else {
                    throw new Error('Invalid event ID');
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu sự kiện', error);
                toast.error('Lỗi khi tải dữ liệu sự kiện')
            } finally {
                setIsLoadingEvent(false);
            }
        }

        fetchEventDetails();
    }, [eventId]);

    const handleTransferCategory = (cat: string): string => {
        switch (cat) {
            case 'music': return 'Âm nhạc'
            case 'theaterstandard': return 'Sân khấu & Nghệ thuật'
            case 'sport': return 'Thể thao'
            default: return 'Khác'
        }
    }

    return (
        <>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762] cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin Sự kiện</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            {isLoadingEvent ? (
                <div className="animate-pulse max-w-4xl mx-auto px-8 py-6">
                    {/* Title Skeleton */}
                    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-6" />

                    {/* Poster Skeleton */}
                    <div className="w-full h-60 bg-gray-200 rounded-lg mb-6" />

                    {/* Info Skeleton */}
                    <div className="space-y-4 mb-6">
                        {[...Array(7)].map((_, idx) => (
                            <div key={idx} className="h-4 bg-gray-200 rounded w-2/3" />
                        ))}
                    </div>

                    {/* Trạng thái Skeleton */}
                    <div className="h-6 w-32 bg-gray-300 rounded-full" />

                    {/* Subheading for Showing Table */}
                    <div className="h-5 bg-gray-300 rounded w-48 mt-10 mb-4" />

                    {/* Table Skeleton */}
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-7 gap-2 p-4 bg-gray-50 text-xs font-semibold text-gray-500">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                            ))}
                        </div>
                        {Array.from({ length: 3 }).map((_, rowIndex) => (
                            <div key={rowIndex} className="grid grid-cols-7 gap-2 p-4 border-t border-gray-100">
                                {Array.from({ length: 7 }).map((_, colIndex) => (
                                    <div key={colIndex} className="h-3 bg-gray-100 rounded w-full" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-semibold text-center mt-6">{event?.title}</h1>

                    <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-12 mt-6 mb-10">
                        <div className="flex justify-center mb-6">
                            <Image className="rounded-md" alt="Event Logo"
                                src={event?.Images_Events_imgPosterIdToImages?.imageUrl || "https://res.cloudinary.com/de66mx8mw/image/upload/v1744458011/defaultImgEvent_spjrst.png"}
                                width={300} height={200}
                            />
                        </div>
                        <div className="mt-6">
                            {/* <p className="mt-2 flex items-center gap-1">
                                <Calendar size={18} /> 
                            </p> */}
                            <p className="mt-2 flex items-center gap-1">
                                <House size={18} /> {event?.venue}
                            </p>
                            <p className="mt-2 flex items-center gap-1">
                                <MapPin size={18} /> {event?.orgDescription}
                            </p>
                            <div className="mt-2">
                                <span className="font-semibold">Mô tả: </span>
                                <div
                                    className="prose prose-sm max-w-none pl-10"
                                    dangerouslySetInnerHTML={{ __html: event?.description || "" }}
                                />
                            </div>
                            <p className="mt-2">
                                <span className="font-semibold">ID sự kiện: </span> {event?.id}
                            </p>
                            <p className="mt-2">
                                <span className="font-semibold">Loại sự kiện: </span>
                                {event?.isOnline ? "Online" : "Offline"}
                            </p>
                            <p className="mt-2">
                                <span className="font-semibold">Thể loại: </span>
                                {event?.categories.map(cat => handleTransferCategory(cat.name)).join(", ")}
                            </p>
                            <p className="mt-2">
                                <span className="font-semibold">Người tạo: </span> {event?.organizerId}
                            </p>
                            <p className="mt-2">
                                <span className="font-semibold">Thời gian tạo: </span>
                                {event?.createdAt ? new Date(event.createdAt).toLocaleString() : "N/A"}
                            </p>
                            <p className="mt-2">
                                <span className="font-semibold">Trạng thái: </span>
                                <span className={`text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border                                                               
                                            ${event?.deleteAt ? 'bg-gray-200 text-gray-500 border-gray-500'
                                        : event?.isApproved
                                            ? 'bg-teal-100 text-teal-500 border-teal-500'
                                            : 'bg-yellow-100 text-yellow-500 border-yellow-500'
                                    }`}>
                                    {event?.deleteAt ? "Đã xóa" : event?.isApproved ? "Đã duyệt" : "Chờ duyệt"}
                                </span>
                            </p>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mt-6 mb-3 px-8">Quản lý suất diễn sự kiện</h2>

                    {event && (
                        <ShowingTable eventId={eventId} eventTitle={event.title ?? ''} />
                    )}
                </>
            )}
        </>
    )
}