"use client";

/* Package System */
import { ArrowLeft, ClipboardList, Phone, RefreshCcw } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

/* Package Application */

interface EventProps {
    id: number;
    title: string;
    startTime: string;
}

export default function QueuePage() {
    //Gán cứng sự kiện
    const event:EventProps = {
        id: 1,
        title: "[CONCERT] ANH TRAI VƯỢT NGÀN CHÔNG GAI DAY 5, DAY 6",
        startTime: "18:00 14 tháng 6, 2024"
    }

    const router = useRouter();
    const totalPeople = 135; //Tổng số người đứng trước trong hàng đợi

    const [peopleAhead, setPeopleAhead] = useState(totalPeople);
    const [percentage, setPercentage] = useState(0);
    const [queueId] = useState(346);
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setPeopleAhead(prev => {
                const newPeopleAhead = Math.max(0, prev - 1);
                const newPercentage = Math.round(((totalPeople - newPeopleAhead) / totalPeople) * 100);
                setPercentage(newPercentage);
                setLastUpdated(new Date().toLocaleTimeString());

                if (newPeopleAhead === 0) clearInterval(interval); // dừng lại khi xong
                return newPeopleAhead;
            });
        }, 1000); // mỗi giây

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="queue-container bg-gray-100">
            <div className="back-btn flex items-center ml-10">
                <div onClick={() => router.back()} className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200 mt-4">
                    <ArrowLeft size={18} className="mr-1" />
                    Quay lại
                </div>
            </div>

            <p className="text-xl font-medium text-center text-[#0C4762] mt-2 mb-8">Bạn Đang Trong Hàng Chờ!</p>

            <div className="flex justify-center bg-[rgba(81,218,207,0.15)]">
                <div className="max-w-4xl bg-white rounded-md shadow-md flex flex-col sm:flex-row justify-between mt-12 mb-12">
                    {/* Progress */}
                    <div className="circle-progress flex flex-col items-center w-full sm:w-1/3 p-8">
                        <div className="relative w-28 h-28 drop-shadow-lg">
                            <svg className="w-full h-full rotate-[-90deg]">
                                <circle cx="56" cy="56" r="50" stroke="#E5F4F6" strokeWidth="12" fill="none" />
                                <circle cx="56" cy="56" r="50" stroke="#2FC1C9" strokeWidth="12" strokeDasharray={314}
                                    strokeDashoffset={(100 - percentage) / 100 * 314} fill="none"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-semibold text-teal-500">{percentage}%</span>
                            </div>
                        </div>
                        <p className="mt-4 text-[#0C4762] text-sm">Số người đứng trước bạn</p>
                        <p className="text-2xl font-bold text-[#2FC1C9]">{peopleAhead}</p>
                        <p className="font-semibold mt-1">Eve<span className="text-teal-500">Box</span></p>
                    </div>

                    <div className="hidden sm:block w-px bg-gray-300" />

                    {/* Detail */}
                    <div className="detail-queue flex flex-col justify-center w-full sm:w-2/3 text-center p-10">
                        <div className="border border-gray-500 rounded-md p-4 shadow-md">
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm mt-1 text-gray-500">{event.startTime}</p>
                        </div>
                        <p className="mt-4 text-sm">
                            <span className="font-bold">Chú ý:</span> Khi đến lượt, chúng tôi sẽ đưa bạn sang trang mua vé. Bạn có tổng cộng 10 phút để hoàn tất việc mua hàng
                        </p>
                        <p className="text-sm mt-2"><strong>Queue ID:</strong> {queueId}</p>
                        <p className="text-sm mt-2"><strong>Lần cuối cập nhật:</strong> {lastUpdated}</p>
                    </div>
                </div>
            </div>

            <hr className="border-[#0C4762] border-1" />

            {/* Note in queue */}
            <div className="note-queue p-10">
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm mb-10">
                    <div className="flex items-start gap-3">
                        <p>
                            <div className="flex items-center space-x-2 text-[#0C4762]">
                                <ClipboardList size={20} />
                                <strong>Chỉ Mua Một Đơn Hàng</strong>
                            </div>
                            <div className="ml-7">Mua một đơn hàng mỗi lần bạn xếp hàng. Nếu muốn mua thêm vé, vui lòng hoàn tất giao dịch hiện tại và quay lại hàng chờ. Việc mua nhiều đơn cùng lúc có thể khiến đơn hàng bị hủy.</div>
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <p>
                            <div className="flex items-center space-x-2 text-[#0C4762]">
                                <RefreshCcw size={20} />
                                <strong>Tự Động Cập Nhật</strong>
                            </div>
                            <div className="ml-7">Vị trí của bạn trong hàng chờ sẽ được hệ thống cập nhật tự động. Vui lòng không làm mới trang để tránh ảnh hưởng tới thứ tự của bạn.</div>
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <p>
                            <div className="flex items-center space-x-2 text-[#0C4762]">
                                <Phone size={20} />
                                <strong>Chỉ Dùng Một Thiết Bị</strong>
                            </div>
                            <div className="ml-7">Tham gia hàng đợi từ một trình duyệt trên một thiết bị. Việc cố gắng vượt rào có thể khiến bạn bị loại khỏi hàng đợi</div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}