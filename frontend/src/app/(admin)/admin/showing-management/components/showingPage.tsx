'use client'

/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import ShowingTable from './showingTable';

export default function ShowingPage() {
    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Showing</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <ShowingTable />
        </>
    )
}