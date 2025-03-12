import SidebarOrganizer from "../components/sidebarOrganizer";
import DateRangePicker from "./components/dateRangePicker";

import 'tailwindcss/tailwind.css';
import "react-datepicker/dist/react-datepicker.css";
import TrafficChart from "../marketing/components/trafficChart";


function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white">
                <SidebarOrganizer />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-[#0C4762]">LiveShow ca nhạc</h1>
                <p className="text-sm text-[#51DACF] pt-2">20:00 - 23:00, 25 tháng 10, 2024</p>

                <div className="border-t-2 border-[#0C4762] mt-2"></div>

                <div className="flex items-center justify-between mb-6">
                    <h3 className="mt-4 text-xl font-bold text-[#0C4762] mb-6">Công cụ & Báo cáo Marketing</h3>

                    {/* Filter Section */}
                    <DateRangePicker />

                    {/* <button className="bg-blue-900 text-white px-4 py-2 rounded-md">Xác nhận</button> */}
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {['Số lượt truy cập', 'Người dùng', 'Người mua', 'Tỉ lệ chuyển đổi'].map((title, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <p className="text-3xl font-bold">562</p>
                            <p className="text-gray-500">{title}</p>
                        </div>
                    ))}
                </div>

                {/* Traffic Chart */}
                <div className="mb-6">
                    <TrafficChart />
                </div>

                {/* Traffic Source Table */}

                <table className="w-full mt-2 border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-[#0C4762] text-white">
                            <th className="border px-4 py-2 text-left">Nguồn truy cập</th>
                            <th className="border px-4 py-2 text-left">Tổng lượt truy cập</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">evebox-homepage</td>
                            <td className="border px-4 py-2">10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
