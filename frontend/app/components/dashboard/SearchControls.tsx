"use client"

import { ChevronDown, Search } from 'lucide-react';


export default function SearchControls() {
    return (
        <div className="bg-sky-900 text-white p-4 md:p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 text-left">
                    <label className="text-sm font-medium mb-2">Loại sự kiện</label>
                    <div className="mt-2 relative">
                        <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                            <option>Chọn địa điểm</option>
                            <option>Hà Nội</option>
                            <option>TP.HCM</option>
                            <option>Đà Nẵng</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="flex-1 text-left">
                    <label className="text-sm font-medium mb-2">Địa điểm</label>
                    <div className="mt-2 relative">
                        <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                            <option>Chọn địa điểm</option>
                            <option>Hà Nội</option>
                            <option>TP.HCM</option>
                            <option>Đà Nẵng</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="flex-1 text-left">
                    <label className="text-sm font-medium mb-2">Thời gian</label>
                    <div className="mt-2 relative">
                        <select className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8">
                            <option>Chọn ngày và giờ</option>
                            <option>Hôm nay</option>
                            <option>Tuần này</option>
                            <option>Tháng này</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="flex md:items-end">
                    <button className="w-full md:w-14 h-10 bg-teal-400 hover:bg-teal-300 rounded flex items-center justify-center">
                        <Search size={20} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}