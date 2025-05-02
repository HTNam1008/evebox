"use client";

import "tailwindcss/tailwind.css";
import { useState } from "react";

import AvatarUpload from "./components/avatarUpload";
import { User2Icon } from "lucide-react";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("info");
    const [favoriteTab, setFavoriteTab] = useState("events");

    const [form, setForm] = useState({
        name: "Van A",
        email: "nguyenvana@gmail.com",
        dob: "2003-05-14",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const favoriteEvents = [
        { id: 1, name: "Hội chợ Công nghệ 2025" },
        { id: 2, name: "Workshop Thiết kế UI/UX" },
    ];

    const favoriteOrganizers = [
        { id: 1, name: "TechFest Vietnam" },
        { id: 2, name: "UX Lovers Community" },
    ];

    const tabs = [
        { key: "info", label: "Thông tin cá nhân" },
        { key: "favorites", label: "Danh sách yêu thích" },
    ];

    const favoriteTabs = [
        { key: "events", label: "Sự kiện yêu thích" },
        { key: "organizers", label: "Nhà tổ chức yêu thích" },
    ];

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };

    return (
        <>
            <div className="bg-white min-h-screen -mt-16">
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
                <div className="border-b border-gray-200 bg-white shadow-sm">
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
                    <div className="max-w-3xl mx-auto mb-10">
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
                    <div className="max-w-3xl mx-auto mb-10">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold mt-8">Danh sách yêu thích của tôi</h2>
                        </div>

                        <hr className="my-6 border-gray-700" />

                        {/* Sub-tab Navigation */}
                        <div className="flex space-x-4 mb-6">
                            {favoriteTabs.map((tab) => (
                                <button key={tab.key} onClick={() => setFavoriteTab(tab.key)}
                                    className={`text-sm font-medium px-3 py-2 rounded-md transition ${favoriteTab === tab.key
                                        ? "bg-teal-400 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {favoriteTab === "events" && (
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-gray-100 rounded-md shadow-sm">Hội chợ Công nghệ 2025</div>
                                <div className="p-4 bg-gray-100 rounded-md shadow-sm">Workshop UI/UX</div>
                            </div>
                        )}

                        {favoriteTab === "organizers" && (
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-gray-100 rounded-md shadow-sm">TechFest Vietnam</div>
                                <div className="p-4 bg-gray-100 rounded-md shadow-sm">UX Lovers</div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </>
    );
}
