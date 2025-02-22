// booking/components/navigation.tsx
'use client';

//Package System
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';

//Package App
import TimeOutDialog from '../payment/components/dialogs/timeOutDialog';

export default function Navigation({ title }: { title: string }) {
    const router = useRouter();
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    const initialMinutes = 15;
    const initialSeconds = 0;

    const totalInitialTime = initialMinutes * 60 + initialSeconds;

    const [isTimeout, setIsTimeout] = useState(false);
    const [timeLeft, setTimeLeft] = useState(totalInitialTime);
    useEffect(() => {
        if (pathname === "/event/1/booking/select-ticket") return; // Không hiển thị trên trang này

        const storedTime = localStorage.getItem('timeLeft');
        const storedTimestamp = localStorage.getItem('timestamp');

        if (storedTime && storedTimestamp) {
            const elapsedTime = Math.floor((Date.now() - Number(storedTimestamp)) / 1000);
            const remainingTime = Math.max(Number(storedTime) - elapsedTime, 0);
            setTimeLeft(remainingTime);

            if (remainingTime === 0) {
                setIsTimeout(true);
                return;
            }
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsTimeout(true);
                    localStorage.setItem('timeLeft', '0');
                    return 0;
                }
                localStorage.setItem('timeLeft', String(prevTime - 1));
                localStorage.setItem('timestamp', String(Date.now()));
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [pathname]);

    // Format thời gian còn lại thành MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const formattedTime = formatTime(timeLeft);

    return (
        <div className="flex items-center justify-center p-10 relative">
            <button onClick={() => router.back()} className="p-1.5 border-2 border-[#0C4762] rounded-md hover:bg-gray-200 absolute left-16">
                <ArrowLeft size={20} className="text-[#0C4762]" />
            </button>
            <h1 className="text-3xl font-semibold">{title}</h1>

            {/* Ẩn bộ đếm nếu đang ở trang `/select-ticket` */}
            {pathname !== "/event/1/booking/select-ticket" && (
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#DDF9F5] border border-[#52D1C9] rounded-xl p-4 text-center shadow-md flex flex-col items-center">
                    <p className="text-black mb-2">Hoàn tất đặt vé trong</p>
                    <div className="w-24 h-12 flex items-center justify-center bg-[#52D1C9] text-black text-xl font-bold rounded-md mt-2">
                        {formattedTime}
                    </div>
                </div>
            )}

            {/* Hiển thị TimeOutDialog khi hết thời gian */}
            <TimeOutDialog open={isTimeout} onClose={() => setIsTimeout(false)} />
        </div>
    );
}
