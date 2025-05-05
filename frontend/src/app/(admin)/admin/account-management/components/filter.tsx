"use client";

/* Package System */
import { ChevronDown, Filter, RotateCcw } from "lucide-react";
import { useState } from "react";

/* Package Application */
import { FilterProps } from "../lib/interface/acctable.interface";
import { UserRole } from "../lib/enum/acctable.enum";

export default function FilterBar({
    roleFilter, onRoleChange,
    dateFrom, dateTo,
    onDateFromChange, onDateToChange,
    onReset
}: FilterProps) {
    const roles = Object.values(UserRole).map(role => role);

    const [showDateFilter, setShowDateFilter] = useState(false);

    return (
        <div className="filter-account-management flex items-center gap-4 bg-white border rounded-lg px-4 py-4 shadow-sm text-sm">
            {/* Filter Icon */}
            <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Filter size={18} />
                Filter By
            </div>

            {/* Filter - Vai trò */}
            <div className="filter-role flex items-center gap-1 border-l pl-4 pr-2">
                <span className="text-black font-semibold mr-1">Vai trò</span>

                <select value={roleFilter} className="border px-2 py-1 rounded-md"
                    onChange={(e) => onRoleChange(e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {roles.map(role => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

             {/* Filter - Ngày tạo */}
             <div className="filter-created relative border-l pl-4 pr-2">
                <div className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setShowDateFilter(!showDateFilter)}
                >
                    <span className="text-black font-semibold">Ngày tạo</span>
                    <ChevronDown size={16} />
                </div>

                {showDateFilter && (
                    <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 flex flex-col gap-3 z-10 border w-60">
                        <div className="flex items-center gap-2">
                            <label className="text-black font-semibold">Từ ngày</label>
                            <input type="date" className="border px-2 py-1 rounded-md"
                                value={dateFrom}
                                onChange={(e) => onDateFromChange(e.target.value)}   
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-black font-semibold">Đến ngày</label>
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