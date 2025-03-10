import 'tailwindcss/tailwind.css';

import SidebarOrganizer from "../components/sidebarOrganizer";
import TicketTable from "../summary-revenue/components/ticketTable";
import CheckinStats from "./components/checkinStats";

export default function CheckinInfo() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64 bg-gray-900 text-white">
                <SidebarOrganizer />
            </div>
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-[#0C4762]">LiveShow ca nhạc</h1>
                <p className="text-sm text-[#51DACF] pt-2">20:00 - 23:00, 25 tháng 10, 2024</p>
                <div className="border-t-2 border-[#0C4762] mt-2"></div>

                {/* Check-in */}
                <h2 className="text-xl font-semibold mb-4 mt-6">Check-in</h2>
                <CheckinStats />

                {/* Chi tiết vé */}
                <h2 className="text-xl font-semibold mt-6 mb-2">Chi tiết</h2>
                <div className="overflow-x-auto">
                    <TicketTable />
                </div>
            </div>
        </div>
    );
}
