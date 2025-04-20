'use client'

/* Package System */
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, House, Calendar } from "lucide-react"

/* Package Application */
import ShowingTable from './showingTable';

export default function EventDetailPage() {
    const router = useRouter();
    // const { id } = router.query;

    //Gán cứng -> gọi API fetch theo id
    const event = {
        id: 2,
        title: "Tech4Good Conference",
        description: "Marty travels back in time using an eccentric time machine. However, he must make his high-school-aged parents fall in love in order to return to the present.",
        organizerId: "Trần Ngọc Hải",
        createdAt: "2024-09-20T08:15:00Z",
        venue: "Trung Tâm Hội Chợ Triển Lãm Sài Gòn SECC",
        orgDescription: "Đường 3/4, Đồi Cà Ri Dê, Phường 3, Thành phố Đà Lạt",
        isOnline: false,
        isApproved: false,
        deletedAt: null,
        Images_Events_imgPosterIdToImages: {
            id: 2,
            url: "https://fastly.picsum.photos/id/82/200/200.jpg?hmac=ATNAhTLN2dA0KmTzSE5D9XiPe3GMX8uwxpFlhU7U5OY",
        },
        categories: [
            { id: 2, name: "Sân khấu & Nghệ thuật" },
            { id: 4, name: "Khác" },
        ],
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762]" />
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Thông tin Sự kiện</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <h1 className="text-2xl font-semibold text-center mt-6">{event.title}</h1>

            <div className="detail-event max-w-4xl mx-auto bg-white rounded-xl shadow-md p-12 mt-6 mb-10">
                <div className="flex justify-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="rounded-md" alt="Event Logo"
                        src={event.Images_Events_imgPosterIdToImages?.url || "https://res.cloudinary.com/de66mx8mw/image/upload/v1744458011/defaultImgEvent_spjrst.png"}
                        width={300} height={200}
                    />
                </div>
                <div className="mt-6">
                    <p className="mt-2 flex items-center gap-1">
                        <Calendar size={18} /> 
                    </p>
                    <p className="mt-2 flex items-center gap-1">
                        <House size={18} /> {event.venue}
                    </p>
                    <p className="mt-2 flex items-center gap-1">
                        <MapPin size={18} /> {event.orgDescription}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Mô tả: </span> {event.description}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">ID sự kiện: </span> {event.id}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Loại sự kiện: </span> 
                        {event.isOnline ? "Online" : "Offline"}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thể loại: </span>
                        {event.categories.map(cat => cat.name).join(", ")}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Người tạo: </span> {event.organizerId}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Thời gian tạo: </span>
                        {new Date(event.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Trạng thái: </span>
                        <span className={`text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border                                                               
                                            ${event.deletedAt ? 'bg-gray-200 text-gray-500 border-gray-500'
                                                              : event.isApproved
                                                                ? 'bg-teal-100 text-teal-500 border-teal-500'
                                                                : 'bg-yellow-100 text-yellow-500 border-yellow-500'
                            }`}>
                            {event.deletedAt ? "Đã xóa" : event.isApproved ? "Đã duyệt" : "Chờ duyệt"}
                        </span>
                    </p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3 px-8">Quản lý suất diễn sự kiện</h2>

            <ShowingTable />
        </>
    )
}