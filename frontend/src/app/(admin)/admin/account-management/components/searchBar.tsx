"use client";

/* Package System */
import { Search } from 'lucide-react';

export default function SearchBar() {
    return (
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-1/3 bg-white">
            <input
                type="text"
                className="w-full px-3 py-2 outline-none"
                placeholder="Tìm kiếm theo tên hoặc email"
            />
            <button className="bg-[#51DACF] px-3 py-2 border-l border-gray-300 transition duration-200 hover:bg-[#3AB5A3]">
                <Search size={24} color="white" />
            </button>
        </div>
    )
}