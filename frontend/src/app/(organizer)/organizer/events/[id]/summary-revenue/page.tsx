"use client";

import { useState, useCallback } from "react";
import SidebarOrganizer from "../components/sidebarOrganizer";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import 'tailwindcss/tailwind.css';
import OverviewCard from "./components/overviewCard";
import TicketTable from "./components/ticketTable";
import { Menu } from "lucide-react";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const Summary = () => {
  const [selectedOption, setSelectedOption] = useState("24h");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = (option: "24h" | "30ngay"): void => {
    setSelectedOption(option);
  };


  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const data = {
    labels: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05", "Week 06", "Week 07", "Week 08", "Week 09", "Week 10"],
    datasets: [
      {
        label: "Doanh thu",
        data: [2, 4, 3, 6, 5, 8, 7, 6, 9, 8],
        borderColor: "#0369a1",
        backgroundColor: "#0369a1",
        tension: 0.4,
      },
      {
        label: "Số vé bán",
        data: [1, 3, 4, 5, 6, 7, 6, 7, 8, 9],
        borderColor: "#64748b",
        backgroundColor: "#64748b",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex min-h-screen">
      {/* Nút mở Sidebar trên mobile */}

      {/* Sidebar */}
      <div
        className={`inset-y-0 left-0 w-64 bg-gray-900 transition-transform duration-300 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex-shrink-0`}
      >
        <SidebarOrganizer onClose={() => toggleSidebar()}/>
      </div>

      {/* Phần nội dung chính */}
      <div className="flex-1 p-6 md-64 w-full">
        <h1 className="text-2xl font-bold text-[#0C4762]">
          <button
            className="top-4 left-4 z-50 md:hidden bg-[#0C4762] text-white p-2 rounded-md shadow-md"
            onClick={toggleSidebar}
          >
            <Menu size={16} />
          </button>
          LiveShow ca nhạc</h1>
        <p className="text-sm text-[#51DACF] pt-2">20:00 - 23:00, 25 tháng 10, 2024</p>
        <div className="border-t-2 border-[#0C4762] mt-2"></div>

        <OverviewCard />

        <div className="mt-6 flex flex-wrap justify-between items-center">
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
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              className={`px-4 py-2 rounded-full border border-[#0C4762] ${selectedOption === "24h" ? "bg-[#9EF5CF] text-black" : "bg-white text-black"
                }`}
              onClick={() => handleClick("24h")}
            >
              24 giờ
            </button>
            <button
              className={`px-4 py-2 rounded-full border border-[#0C4762] ${selectedOption === "30ngay" ? "bg-green-300 text-black" : "bg-white text-black"
                }`}
              onClick={() => handleClick("30ngay")}
            >
              30 ngày
            </button>
          </div>
        </div>

        <div className="mt-6 shadow-lg rounded-lg p-4 w-full overflow-x-auto">
          <Line data={data} />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-[#0C4762] mb-2">Chi tiết</h3>
          <h4 className="text-lg font-bold text-[#0C4762] mb-2">Vé đã bán</h4>
          <div className="overflow-x-auto">
            <TicketTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
