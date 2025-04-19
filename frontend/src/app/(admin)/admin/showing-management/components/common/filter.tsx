"use client";

/* Package System */
import { ChevronDown, Filter, RotateCcw } from "lucide-react";
import { useState } from "react";

/* Package Application */
import { FilterProps } from "../../lib/interface/showingtable.interface";

export default function FilterBar({
    dateFrom, dateTo,
    onDateFromChange, onDateToChange,
    onReset
}: FilterProps) {
    const [showDateFilter, setShowDateFilter] = useState(false);

    return (
        <div className="filter-showing-management flex items-center gap-2 bg-white border rounded-lg px-2 py-4 shadow-sm">
            {/* Filter Icon */}
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Filter size={18} />
                Filter By
            </div>

            {/* Filter - Ngày bắt đầu - kết thúc */}
            <div className="filter-created-btn relative border-l pl-4 pr-2">
                <div className="flex items-center gap-1 cursor-pointer text-sm"
                    onClick={() => setShowDateFilter(!showDateFilter)}
                >
                    <span className="text-black font-semibold">Ngày diễn</span>
                    <ChevronDown size={16} />
                </div>

                {showDateFilter && (
                    <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 flex flex-col gap-3 z-10 border w-60 text-xs">
                        <div className="flex items-center gap-2">
                            <label className="text-black font-semibold">Ngày bắt đầu</label>
                            <input type="date" className="border px-2 py-1 rounded-md"
                                value={dateFrom}
                                onChange={(e) => onDateFromChange(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-black font-semibold">Ngày kết thúc</label>
                            <input type="date" value={dateTo} className="border px-2 py-1 rounded-md"
                                onChange={(e) => onDateToChange(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Reset Filter */}
            <div onClick={onReset} className="reset-filter-btn flex items-center gap-1 border-l pl-4 pr-2 text-red-500 cursor-pointer hover:underline ml-auto">
                <RotateCcw size={16} />
                <span>Reset Filter</span>
            </div>
        </div>
    )
}