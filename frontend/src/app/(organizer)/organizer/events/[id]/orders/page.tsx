

import 'tailwindcss/tailwind.css';
import Dropdown, { DropdownWrapper } from './components/dropdown';
import SidebarOrganizer from '../components/sidebarOrganizer';
import OrderTabs from './components/ordersTab';

export default function Home() {

    const months = ['01/2025', '02/2025', '03/2025'];
    const dates = ['11/01/2025 (19:00)', '12/01/2025 (19:00)'];

    return (
        <main>
            <div className="flex min-h-screen bg-gray-100">
                <div className="w-64 bg-gray-900 text-white">
                    <SidebarOrganizer />
                </div>
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold text-[#0C4762]">LiveShow ca nhạc</h1>
                    <p className="text-sm text-[#51DACF] pt-2">20:00 - 23:00, 25 tháng 10, 2024</p>
                    <div className="border-t-2 border-[#0C4762] mt-2"></div>
                    <div className="py-6  flex items-center space-x-6">
                        <h2 className="text-xl font-semibold text-[#0C4762] whitespace-nowrap">
                            Danh sách buổi biểu diễn
                        </h2>
                        <DropdownWrapper months={months} dates={dates} />
                    </div>
                    <OrderTabs />
                </div>
            </div>
        </main>
    );
}