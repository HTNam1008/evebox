'use client'

/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import EventSpecialTable from './eventSpecialTable';

export default function EventSpecialPage() {
    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Sự kiện đặc biệt</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <EventSpecialTable/>
        </>
    )
}