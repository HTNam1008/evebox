'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation';

/* Package Application */
import AccountDetailForm from './accountDetail';
import { User } from '../../lib/interface/acctable.interface';

export default function AccountDetailPage() {
    const router = useRouter();
    const { id } = useParams();

    const data: User[] = [
        {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '01234234178',
            role: 'Chủ sự kiện',
            createdAt: '2024-10-01T00:00:00.000Z',
            status: 'Active',
        },
        {
            id: '2',
            name: 'Nguyễn Thành Long',
            email: 'nguyentlong@gmail.com',
            phone: '0938167243',
            role: 'Quản lý',
            createdAt: '2025-10-01T00:00:00.000Z',
            status: 'Deactivated',
        },
        {
            id: '3',
            name: 'Hồ Văn Nam',
            email: 'hovannam@gmail.com',
            phone: '1357122318',
            role: 'Khách hàng',
            createdAt: '2024-10-25T00:00:00.000Z',
            status: 'Active',
        },
    ];

    const user = data.find((u) => u.id === id);

    if (!user) return <div>Không tìm thấy người dùng.</div>;

    return (
        <>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762]" />
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin chi tiết</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <AccountDetailForm user={user} />
        </>
    )
}