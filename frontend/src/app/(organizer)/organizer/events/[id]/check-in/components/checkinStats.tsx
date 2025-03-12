import { FaUsers, FaWalking, FaCheckCircle } from "react-icons/fa";

export default function CheckinStats() {
    return (
        <div className="flex">
            {/* Đã check-in */}
            <div className="flex-1 bg-[#0C4762] text-white p-6 rounded-xl flex items-center justify-center">
                <div className="flex items-center gap-4">
                    <FaCheckCircle className="w-16 h-16 text-[#51DACF] text-5xl" />
                    <div>
                        <p className="text-sm">Đã check-in</p>
                        <p className="text-2xl font-bold">0 vé</p>
                        <p className="text-sm">Đã bán 0 vé</p>
                    </div>
                </div>
            </div>
            
            {/* Phần bên phải */}
            <div className="flex-1 flex flex-col ml-6">
                <div className="flex-1 bg-[#0C4762] text-white p-4 rounded-xl flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <FaUsers className="text-[#51DACF] text-lg mr-2" />
                        <p>Trong sự kiện</p>
                    </div>
                    <p className="text-lg font-semibold">0</p>
                </div>
                <div className="flex-1 bg-[#0C4762] text-white p-4 rounded-xl flex justify-between items-center">
                    <div className="flex items-center">
                        <FaWalking className="text-[#FD7139] text-lg mr-2" />
                        <p>Đã ra ngoài</p>
                    </div>
                    <p className="text-lg font-semibold">0</p>
                </div>
            </div>
        </div>
    );
}
