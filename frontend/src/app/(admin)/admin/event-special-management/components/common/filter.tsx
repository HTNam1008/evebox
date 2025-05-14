"use client";

/* Package System */
import { Filter, RotateCcw } from "lucide-react";

/* Package Application */
import { FilterProps } from "../../lib/interface/eventSpecialTable";
import { OptionType } from "../../lib/interface/eventSpecialTable";

export default function FilterBar({
    categoryFilter, onCategoryChange,
    onReset
}: FilterProps) {
    //Call api để lấy ra các categories

    const fullOptions: OptionType[] = [
        { label: "Chỉ trên EveBox", value: "__onlyOnEve" },
        { label: "Sự kiện đặc biệt", value: "__special" },
        { label: "Âm nhạc", value: 1 },
        { label: "Sân khấu & Nghệ thuật", value: 2 },
        { label: "Thể thao", value: 3 },
        { label: "Khác", value: 4 },
    ];

    return (
        <div className="filter-event-management flex items-center gap-2 bg-white border rounded-lg px-2 py-4 shadow-sm text-sm">
            {/* Filter Icon */}
            <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Filter size={18} />
                Filter By
            </div>

            {/* Filter - Loại sự kiện */}
            <div className="filter-type-btn flex items-center gap-1 border-l pl-4 pr-2">
                <span className="text-black font-semibold mr-1">Loại sự kiện</span>

                <select value={categoryFilter} className="border px-2 py-1 rounded-md"
                    onChange={(e) => {
                        const rawValue = e.target.value;

                        if (rawValue === "") {
                            onCategoryChange("");
                        } else if (rawValue === "__onlyOnEve" || rawValue === "__special") {
                            onCategoryChange(rawValue as "__onlyOnEve" | "__special");
                        } else {
                            onCategoryChange(Number(rawValue)); // map string to number
                        }
                    }}
                >
                    <option value="">Tất cả</option>
                    {fullOptions.map(opt => (
                        <option
                            key={opt.value + opt.label}
                            value={opt.value}
                            disabled={opt.isSeparator}
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reset Filter */}
            <div onClick={onReset} className="reset-filter-btn flex items-center gap-1 border-l pl-4 pr-2 text-red-500 cursor-pointer hover:underline ml-auto">
                <RotateCcw size={16} />
                <span>Reset Filter</span>
            </div>
        </div>
    )
}