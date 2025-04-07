"use client";

import { ChevronDown, Filter, RotateCcw } from "lucide-react";

export default function FilterBar() {
    return (
        <div className="flex items-center gap-4 bg-white border rounded-lg px-4 py-4 shadow-sm text-sm">
            {/* Filter Icon */}
            <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Filter size={18} />
                Filter By
            </div>

            {/* Filter - Vai trò */}
            <div className="flex items-center gap-1 border-l pl-4 pr-2">
                <span className="text-black font-semibold">Vai trò</span>
                <ChevronDown size={16} />
            </div>

            {/* Filter - Ngày tạo */}
            <div className="flex items-center gap-1 border-l pl-4 pr-2">
                <span className="text-black font-semibold">Ngày tạo</span>
                <ChevronDown size={16} />
            </div>

            {/* Reset Filter */}
            <div className="flex items-center gap-1 border-l pl-4 pr-2 text-red-500 cursor-pointer hover:underline ml-auto">
                <RotateCcw size={16} />
                <span>Reset Filter</span>
            </div>
        </div>
    )
}