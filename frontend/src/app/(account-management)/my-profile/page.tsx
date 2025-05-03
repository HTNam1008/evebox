"use client";

/* Package System */
import "tailwindcss/tailwind.css";
import { useState, ChangeEvent } from "react";

/* Package Application */
import AvatarUpload from "./components/avatarUpload";
import { OrganizerDetail } from "./lib/interface/favorite.interface";
import MyFavoritePage from "./components/myFavoritePage";

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

    //Call API truyền dữ liệu các sự kiện yêu thích vào
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
                    <div className="profile-page max-w-3xl mx-auto mb-10">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mt-8 mb-4">Quản lý thông tin tài khoản</h2>
                                <h5 className="text-sm text-gray-700">
                                    Quản lý và cập nhật thông tin cá nhân cho tài khoản của bạn
                                </h5>
                            </div>

                            {/* Avatar Upload */}
                            <AvatarUpload />
                        </div>

                        <hr className="my-6 border-gray-700" />

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Họ và tên */}
                            <div>
                                <label className="block text-gray-700 font-medium">Họ và tên</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Nhập họ và tên của bạn"
                                        className="w-full border p-2 rounded-md mt-1 bg-gray-100 focus:bg-white"
                                    />
                                    {/* <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-400">
                                            <Pencil size={18} />
                                        </button> */}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 font-medium">Địa chỉ email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    disabled
                                    className="w-full border p-2 rounded-md mt-1 bg-gray-200 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Ngày tháng năm sinh */}
                            <div>
                                <label className="block text-gray-700 font-medium">Ngày tháng năm sinh</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="dob"
                                        value={form.dob}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-md mt-1 bg-gray-100 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <button className="w-full bg-[#51DACF] text-[#0C4762] px-4 py-2 rounded-md mt-2 hover:bg-teal-300 transition">
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
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
