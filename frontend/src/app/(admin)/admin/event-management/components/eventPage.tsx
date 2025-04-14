'use client'

/* Package System */
import 'tailwindcss/tailwind.css';
import { useState } from "react";

/* Package Application */
import EventTable from './eventTable';
import Tabs from "./common/tab";

export default function EventPage() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Sự kiện</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>
            
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <EventTable activeTab={activeTab}/>
        </>
    )
}