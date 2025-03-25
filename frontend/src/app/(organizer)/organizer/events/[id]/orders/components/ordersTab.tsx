"use client";

import { useState, useEffect } from "react";

import OrderSection from "./orderSection";
import TicketSection from "./TicketSection";

export default function OrderTabs() {
    const [activeTab, setActiveTab] = useState("orders");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Tránh lỗi hydration

    return (
        <div className="w-full flex flex-col items-center">
            {/* Thanh Tabs */}
            <div className="w-full flex bg-gray-200 rounded-lg overflow-hidden">
                <button
                    className={`flex-1 py-1 text-center text-lg font-medium transition-all duration-300
                        ${activeTab === "orders" 
                            ? "bg-[#0C4762] text-white" 
                            : "bg-gray-200 text-[#0C4762]"}`}
                    onClick={() => setActiveTab("orders")}
                >
                    Đơn hàng
                </button>
                <button
                    className={`flex-1 py-1 text-center text-lg font-medium transition-all duration-300
                        ${activeTab === "tickets" 
                            ? "bg-[#0C4762] text-white" 
                            : "bg-gray-200 text-[#0C4762]"}`}
                    onClick={() => setActiveTab("tickets")}
                >
                    Vé
                </button>
            </div>

            {/* Nội dung Tab */}
            <div className="w-full mt-4">
                {activeTab === "orders" ? <OrderSection /> : <TicketSection />}
            </div>
        </div>
    );
}
