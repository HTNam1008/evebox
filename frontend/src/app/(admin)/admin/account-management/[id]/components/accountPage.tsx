'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react"
import { useParams } from 'next/navigation';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';

/* Package Application */
import AccountDetailForm from './accountDetail';
import { User } from '../../lib/interface/acctable.interface';
import { gatewayService } from '@/services/instance.service';
import Loading from '../loading';
import Error from '../error';

export default function AccountDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await gatewayService.get(`/api/user/${id}`);
                
                if (response.status !== 200) {
                    // throw new Error(`Error: ${response.status}`);
                    setError('Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.');
                }
                
                const userData = await response.data.data;
                setUser(userData);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                setError('Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <> <Error /> </>;
    }

    if (!user) {
        return <div>Không tìm thấy người dùng.</div>;
    }

    return (
        <>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762] cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin chi tiết</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <AccountDetailForm user={user} />
        </>
    );
}