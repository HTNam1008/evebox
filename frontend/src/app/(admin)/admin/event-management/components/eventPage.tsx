'use client'

/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import EventTable from './eventTable';
import Tabs from "./tab";

export default function EventPage() {
    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Sự kiện</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>
            
            <Tabs />
            <EventTable />
        </>
    )
}