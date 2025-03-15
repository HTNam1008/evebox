"use client";
import { useState } from "react";

const tabs = [
    { id: "sap-toi", label: "Sắp tới" },
    { id: "da-qua", label: "Đã qua" },
    { id: "cho-duyet", label: "Chờ duyệt" },
    { id: "nhap", label: "Nháp" }
];

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("sap-toi");

    return (
        <div className="flex space-x-4 mt-6">
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
