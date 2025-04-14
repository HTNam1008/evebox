'use client'

/* Package System */
import 'tailwindcss/tailwind.css';
import { useState } from "react";

/* Package Application */
import EventTable from './eventTable';
import Tabs from "./common/tab";
import SearchBar from './common/searchBar';

export default function EventPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Sự kiện</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <div className="flex justify-between items-center mt-6 mb-2">
                <SearchBar onSearch={setSearchKeyword} />
            </div>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <EventTable activeTab={activeTab} searchKeyword={searchKeyword}/>
        </>
    )
}