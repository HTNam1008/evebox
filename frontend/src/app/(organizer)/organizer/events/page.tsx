
import 'tailwindcss/tailwind.css';
import {Search } from "lucide-react";
import SidebarOrganizer from './[id]/components/sidebarOrganizer';
import Tabs from './components/tabs';
import EventCard from './components/eventCard';

const events = [
    {
        id: 1,
        title: "Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trương",
        time: "20:00 - 23:00, 25 tháng 10, 2024",
        location: "Đình Hoa Sơn",
        address: "123 Lê Văn Duyệt, Phường 01, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
        image: "/images/event.png"
    },
    {
        id: 2,
        title: "Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trương",
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

export default function Event() {

    return (
        <main>
            <div className="flex min-h-screen bg-gray-100">
                <div className="w-64 bg-gray-900 text-white">
                    <SidebarOrganizer />
                </div>
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold text-[#0C4762]">Sự kiện của tôi</h1>
                    <div className="border-t-2 border-[#0C4762] mt-2"></div>

                    {/* Thanh tìm kiếm và các tab */}
                    <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-1/3 bg-white">
                            <input
                                type="text"
                                className="w-full px-3 py-2 outline-none"
                                placeholder="Tìm kiếm sự kiện"
                            />
                            <button className="bg-[#51DACF] px-3 py-2 border-l border-gray-300 transition duration-200 hover:bg-[#3AB5A3]">
                                <Search size={24} color="white" />
                            </button>
                        </div>
                        <Tabs/>
                    </div>

                    {/* Danh sách sự kiện */}
                    <div className="mt-6 space-y-6">
                        {events.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}