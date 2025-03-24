"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Line } from "react-chartjs-2";

import OverviewCard from "./overviewCard";

import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

// TODO: chart can't show data when run build & start, but run dev, chart is ok
 
export const data = {
    labels: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05", "Week 06", "Week 07", "Week 08", "Week 09", "Week 10"],
    datasets: [
        {
            id: 1,
            label: "Doanh thu",
            data: [2, 4, 3, 6, 5, 8, 7, 6, 9, 8],
            borderColor: "#0369a1",
            backgroundColor: "#0369a1",
            tension: 0.4,
        },
        {
            id: 2,
            label: "Số vé bán",
            data: [1, 3, 4, 5, 6, 7, 6, 7, 8, 9],
            borderColor: "#64748b",
            backgroundColor: "#64748b",
            tension: 0.4,
        },
    ],
    
};

const SummaryControls = () => {
    const [activeTab, setActiveTab] = useState("24h");

    /** TODO: Handle toggle sidebar in mobile
     * 
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };
     */

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762]">
                <button
                    className="top-4 left-4 z-50 md:hidden bg-[#0C4762] text-white p-2 rounded-md shadow-md"
                // TODO: Handle toggle sidebar in mobile
                // onClick={toggleSidebar}
                >
                    <Menu size={16} />
                </button>
                LiveShow ca nhạc
            </h1>
            <p className="text-sm text-[#51DACF] pt-2">20:00 - 23:00, 25 tháng 10, 2024</p>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <OverviewCard />

            {/* Tabs */}
            <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#0369a1] rounded-full"></div>
                        <span className="text-sm">Doanh thu</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#64748b] rounded-full"></div>
                        <span className="text-sm">Số vé bán</span>
                    </div>
                </div>

                {/* Tab Buttons */}
                <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                        className={`px-4 py-2 rounded-full border border-[#0C4762] ${activeTab === "24h" ? "bg-[#9EF5CF] text-black" : "bg-white text-black"
                            }`}
                        onClick={() => setActiveTab("24h")}
                    >
                        24 giờ
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full border border-[#0C4762] ${activeTab === "30 ngày" ? "bg-green-300 text-black" : "bg-white text-black"
                            }`}
                        onClick={() => setActiveTab("30 ngày")}
                    >
                        30 ngày
                    </button>
                </div>
            </div>

            {/* Nội dung thay đổi theo tab */}
            <div>
                {activeTab === "24h" ?
                    <div className="mt-6 shadow-lg rounded-lg p-4 w-full overflow-x-auto">
                        <Line datasetIdKey='id' data={data} />
                    </div>
                    :
                    <div className="mt-6 shadow-lg rounded-lg p-4 w-full overflow-x-auto">
                        <Line data={data} />
                    </div>}
            </div>
        </>
    );
};

export default SummaryControls;
