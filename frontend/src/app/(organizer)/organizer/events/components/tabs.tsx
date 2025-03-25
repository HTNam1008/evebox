"use client";

import EventCard from "./eventCard";

import { useState } from "react";
import { Search } from "lucide-react";


const events = [
    {
        id: 1,
        title: "Nhớ Trịnh Công Sơn 1 - Quang Dũng - Cẩm Vân - Khắc Triệu",
        time: "20:00 - 23:00, 25 tháng 10, 2024",
        location: "Đình Hoa Sơn",
        address: "123 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
        image: "/images/event.png"
    },
    {
        id: 2,
        title: "Nhớ Trịnh Công Sơn 2 - Quang Dũng - Cẩm Vân",
        time: "20:00 - 23:00, 25 tháng 10, 2024",
        location: "Đình Hoa Sơn",
        address: "123 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
        image: "/images/event.png"
    },
    {
        id: 3,
        title: "Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trương",
        time: "20:00 - 23:00, 25 tháng 10, 2024",
        location: "Đình Hoa Sơn",
        address: "123 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
        image: "/images/event.png"
    }
];

const tabs = [
    { id: "sap-toi", label: "Sắp tới" },
    { id: "da-qua", label: "Đã qua" },
    { id: "cho-duyet", label: "Chờ duyệt" },
    { id: "nhap", label: "Nháp" }
];

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("sap-toi");

    const [searchQuery, setSearchQuery] = useState("");

    // Lọc sự kiện theo địa điểm
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Thanh tìm kiếm và các tab */}
            <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-1/3 bg-white">
                    <input
                        type="text"
                        className="w-full px-3 py-2 outline-none"
                        placeholder="Tìm kiếm sự kiện"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-[#51DACF] px-3 py-2 border-l border-gray-300 transition duration-200 hover:bg-[#3AB5A3]">
                        <Search size={24} color="white" />
                    </button>
                </div>
                <div className="flex space-x-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`px-6 py-2 rounded-full ${activeTab === tab.id ? 'bg-[#0C4762] text-[#9EF5CF]' : 'bg-[#9EF5CF] text-gray-700'}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Danh sách sự kiện */}
            <div className="mt-6 space-y-6">
                {activeTab === "cho-duyet" ? (
                    filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))
                ) : (
                    <p className="text-center text-gray-500">Không có sự kiện nào.</p>
                )}
            </div>
        </div>
    );
}