'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react"

/* Package Application */

export default function AccountDetailPage() {
    const router = useRouter();

    return (
        <>
            {/* Page Content */}
            <div className="flex-1 p-6 bg-gray-100 text-black">
                <div className="flex items-center space-x-2">
                    <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762]" />
                    <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin chi tiết</h1>
                </div>
                <div className="border-t-2 border-[#0C4762] mt-2"></div>
            </div>
        </>
    )
}