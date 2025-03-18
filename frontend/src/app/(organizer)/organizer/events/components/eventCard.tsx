"use client";
import { BarChart3, Users, Package, LayoutGrid, Edit } from "lucide-react";
import Link from "next/link";

interface Event {
    id: number;
    title: string;
    time: string;
    location: string;
    address: string;
    image: string;
}

export default function EventCard({ event }: { event: Event }) {
    return (
        <div className="bg-[#0C4762] p-4 rounded-xl shadow-lg text-white flex flex-col">
            <div className="flex">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-40 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p className="text-sm flex items-center mt-3 text-[#51DACF]">
                        📅 {event.time}
                    </p>
                    <p className="text-sm flex items-center mt-2">
                        📍{event.location} <br />
                        {event.address}
                    </p>
                </div>
            </div>
            <hr className="border-t border-white opacity-30 my-4" />
            <div className="flex justify-center space-x-14 text-center">
                <Link href={`/organizer/events/${event.id}/summary-revenue`} className="flex flex-col items-center">
                    <BarChart3 size={18} />
                    <span className="text-sm mt-1">Tổng quan</span>
                </Link>
                <Link href={`/organizer/events/${event.id}/member`} className="flex flex-col items-center">
                    <Users size={18} />
                    <span className="text-sm mt-1">Thành viên</span>
                </Link>
                <Link href={`/organizer/events/${event.id}/orders`} className="flex flex-col items-center">
                    <Package size={18} />
                    <span className="text-sm mt-1">Đơn hàng</span>
                </Link>
                <Link href={`/organizer/events/${event.id}/seating`} className="flex flex-col items-center">
                    <LayoutGrid size={18} />
                    <span className="text-sm mt-1">Sơ đồ ghế</span>
                </Link>
                <Link href={`/organizer/events/${event.id}/edit`} className="flex flex-col items-center">
                    <Edit size={18} />
                    <span className="text-sm mt-1">Chỉnh sửa</span>
                </Link>
            </div>
        </div>
    );
}
