'use client';

//Package System

//Package App

export default function Navigation({ title }: { title: string }) {
    const steps = [
        { number: 1, label: "Thông tin sự kiện", active: true },
        { number: 2, label: "Thời gian & loại vé", active: false },
        { number: 3, label: "Cài đặt", active: false },
        { number: 4, label: "Thông tin thanh toán", active: false },
    ];

    return (
        <div className="flex flex-col items-center justify-center p-10 relative">
            <h1 className="text-3xl font-semibold mb-6">{title}</h1>

            {/* Stepper */}
            <div className="w-full flex justify-center">
                <ol className="flex space-x-8">
                    {steps.map((step, index) => (
                        <li key={index} className={`flex items-center space-x-2.5 ${step.active ? 'text-black-600' : 'text-gray-500'}`}>
                            <span className={`text-sm mb-2 flex items-center justify-center w-8 h-8 border rounded-full ${step.active ? 'border-[#51DACF] bg-[#51DACF] text-white' : 'border-gray-500'}`}>
                                {step.number}
                            </span>

                            {/* Title + underline */}
                            <div className="relative flex flex-col items-center">
                                <h3 className="text-sm font-medium leading-tight mb-2">{step.label}</h3>

                                {step.active && (
                                    <div className="absolute left-0 bottom-[-6px] w-full h-1 bg-[#51DACF]"></div>
                                )}
                            </div>
                        </li>
                    ))}

                    <div className="flex gap-4 mt-4 mb-6">
                        <button
                            className="text-sm w-20 border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all"
                        >
                            Lưu
                        </button>
                    </div>

                    <div className="flex gap-4 mt-4 mb-6">
                        <button
                            className="text-sm w-30 border-2 border-[#51DACF] text-[#0C4762] font-bold py-2 px-4 rounded bg-[#51DACF] hover:bg-[#0C4762] hover:border-[#0C4762] hover:text-white transition-all"
                        >
                            Tiếp tục
                        </button>
                    </div>
                </ol>
            </div>
        </div>
    );
}
