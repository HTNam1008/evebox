import React from 'react';
import { Slide } from './libs/interface/dashboard.interface';
import NavigationBar from './components/common/navigation-bar';
import ImageSlider from './components/dashboard/ImageSlider';
import SearchControls from './components/dashboard/SearchControls';
import 'tailwindcss/tailwind.css';
import '../styles/admin/pages/Dashboard.css';
import Footer from './components/common/footer';

// server componet - SSR
async function fetchData() {
    try {
        const resSlides = await fetch('http://localhost:3001/api/discovery/banner');
        const slides: Slide[] = await resSlides.json();
        const mockData = [
            {
                image: "../../../images/dashboard/presentation_pic.png",
                title: "MADE FOR THOSE",
                subtitle: "WHO DO"
            },
            {
                image: "../../../images/dashboard/presentation_pic.png",
                title: "DISCOVER EVENTS",
                subtitle: "NEAR YOU"
            },
            {
                image: "../../../images/dashboard/presentation_pic.png",
                title: "JOIN THE",
                subtitle: "COMMUNITY"
            }
        ];
        return Array.isArray(slides) ? slides : mockData;
    } catch (err) {
        console.error('Failed to fetch data:', err);
        return [];
    }
}

const Dashboard: React.FC = async () => {
    const slides = await fetchData();

    return (
        <div className="min-h-screen flex flex-col">
            <NavigationBar />
            <main className="flex-1">
                <div className="w-full flex justify-center flex-col items-center px-4 md:mt-8">
                    <div className="w-full md:w-5/6 relative">
                        <ImageSlider slides={slides} />
                        <div className="absolute left-0 right-0 -bottom-20 mx-auto w-full md:w-11/12 px-4">
                            <SearchControls />
                        </div>
                    </div>
                </div>

                <div className="mt-36"></div>

                {/* Events Section */}
                <div className="flex justify-center mt-8 px-4">
                    <div className="w-full md:w-5/6">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <h2 className="text-xl md:text-2xl font-bold">
                                Sự kiện <span className="text-teal-400">Đặc biệt</span>
                            </h2>
                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                <select className="px-4 py-2 border rounded-md text-sm w-full md:w-auto">
                                    <option>Ngày trong tuần</option>
                                </select>
                                <select className="px-4 py-2 border rounded-md text-sm w-full md:w-auto">
                                    <option>Loại sự kiện</option>
                                </select>
                                <select className="px-4 py-2 border rounded-md text-sm w-full md:w-auto">
                                    <option>Thể loại</option>
                                </select>
                            </div>
                        </div>

                        {/* Event Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
                            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-center aspect-[13/9] overflow-hidden">
                                        <img
                                            src="/images/dashboard/card_pic.png"
                                            alt="Event"
                                            className="w-11/12 h-11/12 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-left text-base mb-3 line-clamp-2 leading-tight">
                                            Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trường
                                        </h3>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-sm">
                                            <time className="text-left text-teal-500">20:00 - 23:00, 25 tháng 10, 2024</time>
                                            <span className={`rounded-lg bg-emerald-200 px-4 font-medium text-sky-950 text-center md:text-left`}>
                                                {index % 2 === 0 ? 'Miễn phí' : '950.000đ'}
                                            </span>
                                        </div>
                                        <p className="mt-3 text-left text-xs text-gray-400">
                                            SỰ KIỆN TRỰC TUYẾN - Tham dự ở bất cứ đâu
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <div className="flex justify-center mt-8">
                            <button className="px-6 py-2 bg-teal-400 text-sky-950 rounded-md hover:bg-teal-300 transition-colors">
                                Xem thêm...
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;

