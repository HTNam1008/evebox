"use client";

/* Package System */
import { useState } from "react";

/* Package Application */


const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "pending", label: "Chờ duyệt" },
    { id: "approved", label: "Đã duyệt" },
    { id: "deleted", label: "Đã xóa" }
];

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="flex justify-end space-x-4 mt-6 text-sm">
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
    );
}