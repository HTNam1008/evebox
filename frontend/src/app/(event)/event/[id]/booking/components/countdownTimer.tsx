'use client';

//Package System
import { useState, useEffect } from 'react';

//Package App
import TimeOutDialog from '../payment/components/dialogs/timeOutDialog';

export default function CountdownTimer() {
    const initialMinutes = 15;
    const initialSeconds = 0;
    const totalInitialTime = initialMinutes * 60 + initialSeconds;
    
    const [isTimeout, setIsTimeout] = useState(false);
    const [timeLeft, setTimeLeft] = useState(totalInitialTime);
    
    useEffect(() => {
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
    }, []); // Chỉ chạy một lần khi component mount

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="mt-3 bg-[#DDF9F5] border border-[#52D1C9] rounded-xl p-4 text-center shadow-md flex flex-col items-center">
            <p className="text-black mb-2">Hoàn tất đặt vé trong</p>
            <div className="w-24 h-12 flex items-center justify-center bg-[#52D1C9] text-black text-xl font-bold rounded-md mt-2">
                {formatTime(timeLeft)}
            </div>
            <TimeOutDialog open={isTimeout} onClose={() => setIsTimeout(false)} />
        </div>
    );
}