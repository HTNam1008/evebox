'use client'

/* Package System */
import 'tailwindcss/tailwind.css';
import { useState } from "react";

/* Package Application */
import ShowingTable from './showingTable';
import SearchBar from './common/searchBar';

export default function ShowingPage() {
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Showing</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <div className="flex justify-between items-center mt-6 mb-2">
                <SearchBar onSearch={setSearchKeyword} />
            </div>

            <ShowingTable searchKeyword={searchKeyword} />
        </>
    )
}