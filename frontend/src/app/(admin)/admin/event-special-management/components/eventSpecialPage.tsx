'use client'

/* Package System */
import 'tailwindcss/tailwind.css';
import { useState } from "react";

/* Package Application */
import EventSpecialTable from './eventSpecialTable';
import FilterBar from './common/filter';

export default function EventSpecialPage() {
    const [categoryFilter, setCategoryFilter] = useState('');

    const handleResetFilter = () => {
        setCategoryFilter('');
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Sự kiện đặc biệt</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <div className="flex justify-between items-center mt-6 mb-2">
                <FilterBar
                    categoryFilter={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                    onReset={handleResetFilter}
                />
            </div>

            <EventSpecialTable categoryFilter={categoryFilter}/>
        </>
    )
}