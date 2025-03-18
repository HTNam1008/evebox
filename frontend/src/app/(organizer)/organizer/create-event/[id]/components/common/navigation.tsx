'use client';


//Package System
import { Check } from 'lucide-react';

//Package App

export default function Navigation({ step }: { step: number }) {
    const steps = [
        { number: 1, label: "Thông tin sự kiện", active: true },
        { number: 2, label: "Thời gian & loại vé", active: false },
        { number: 3, label: "Cài đặt", active: false },
        { number: 4, label: "Thông tin đăng ký", active: false },
        { number: 5, label: "Thông tin thanh toán", active: false },
    ];

    return (
        <>
            {/* Stepper */}
            {steps.map((s, index) => {
                const isCompleted = s.number < step; // Bước đã hoàn thành
                const isActive = s.number === step; // Kiểm tra bước hiện tại
                return (
                    <li key={index} className={`flex items-center space-x-2.5 ${isActive ? 'text-black-600' : 'text-gray-500'}`}>
                        <span className={`text-xs mb-2 flex items-center justify-center w-8 h-8 border rounded-full 
                                    ${isActive ? 'border-[#51DACF] bg-[#51DACF] text-white' : 'border-gray-500'}
                                    ${isCompleted ? 'border-green-500 bg-green-100 text-green-600' : ''}`}>

                            {isCompleted ? <Check size={20} color="green" /> : s.number}
                        </span>

                        {/* Title + underline */}
                        <div className="relative flex flex-col items-center">
                            <span className="text-xs font-medium leading-tight mb-2">{s.label}</span>

                            {isActive && (
                                <div className="absolute left-0 bottom-[-6px] w-full h-1 bg-[#51DACF]"></div>
                            )}
                        </div>
                    </li>
                );
            })}
        </>
    );
}
