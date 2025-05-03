"use client";

/* Package System */
import "tailwindcss/tailwind.css";
import { useState, ChangeEvent } from "react";

/* Package Application */
import { OrganizerDetail } from "./lib/interface/favorite.interface";
import MyFavoritePage from "./components/myFavoritePage";
import ProfileInfoForm from "./components/profileInfoForm";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("info");

    const [form, setForm] = useState({
        name: "Van A",
        email: "nguyenvana@gmail.com",
        dob: "2003-05-14",
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //Call API truyền dữ liệu các sự kiện yêu thích vào -> truyền vào EventSlider giống ở trang Dashboard
    const events = {
        favoriteEvents: [],
    };

    //Call API truyền dữ liệu nhà tổ chức yêu thích
    const favoriteOrganizers: OrganizerDetail[] = [
        {
            id: 1,
            Images_Events_imgLogoIdToImages: {
                imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/03/21/08/2aff26681043246ebef537f075e2f861.png",
            },
            orgName: "TechFest Vietnam",
            orgDescription: "<p>TechFest Vietnam là nơi quy tụ những startup hàng đầu Việt Nam và khu vực.</p>",
        },
        {
            id: 2,
            Images_Events_imgLogoIdToImages: {
                imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/03/21/08/2aff26681043246ebef537f075e2f861.png",
            },
            orgName: "UX Lovers",
            orgDescription: "<p>UX Lovers là cộng đồng dành cho các nhà thiết kế đam mê trải nghiệm người dùng.</p>",
        }
    ];

    //Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = favoriteOrganizers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const paginatedData = favoriteOrganizers.slice(startItem - 1, endItem);

    const tabs = [
        { key: "info", label: "Thông tin cá nhân" },
        { key: "favorites", label: "Danh sách yêu thích" },
    ];

    return (
        <>
            <div className="bg-white min-h-screen -mt-16 mb-10">
                {/* Banner Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white">
                    <div className="max-w-4xl mx-auto flex items-center gap-6">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                            <img src="/default-avatar.png" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm">Tài khoản của</p>
                            <h1 className="text-2xl font-bold">{form.name}</h1>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="profile-favorite-tab border-b border-gray-200 bg-white shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 flex space-x-6">
                        {tabs.map((tab) => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                                className={`py-3 border-b-2 transition-all duration-200 text-sm font-medium whitespace-nowrap ${activeTab === tab.key
                                    ? "border-teal-400 text-teal-400"
                                    : "border-transparent text-gray-400 hover:text-teal-400"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === "info" && (
                    <ProfileInfoForm form={form} handleChange={handleChange} />
                )}

                {activeTab === "favorites" && (
                    <MyFavoritePage
                        events={events}
                        favoriteOrganizers={favoriteOrganizers}
                        paginatedData={paginatedData}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                )}
            </div>
        </>
    );
}
