'use client';

/* Package System */
import { useState } from 'react';
import Image from 'next/image';
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

/* Package Application */
import ConfirmDialog from './dialogs/confirmDialog';
import { TicketType } from '@/app/(event)/event/libs/event.interface';

interface EventProps {
    id: number;
    title: string;
    description: string;
    // startDate: string;
    startTime: string;
    venue: string;
    Images_Events_imgPosterIdToImages?: { imageUrl: string };
    locationsString: string;
}

interface TicketInformationProps {
    event: EventProps | null;
    totalTickets: number;
    totalAmount: number;
    isFormValid: boolean;
    ticketType?: TicketType | null;
    formData: { [formInputId: number]: string };
    formId: number | null;
    showingId?: string;
}

export default function TicketInformation({ event, totalTickets, totalAmount, isFormValid, ticketType, formData, showingId, formId }: TicketInformationProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handlePayment = async () => {
        // router.push(`/event/${event?.id}/booking/payment`);
        if (!session?.user?.accessToken || !event || !formId) return;

        setLoading(true);

        try {
            const answers = Object.entries(formData).map(([formInputId, value]) => ({
                formInputId: Number(formInputId),
                value,
            }));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_TICKET_SVC_URL}/api/ticket/submitForm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.accessToken}`,
                },
                body: JSON.stringify({
                    formId: formId,
                    showingId: showingId,
                    answers: answers,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Lỗi gửi form. Vui lòng kiểm tra lại.");
                return;
            }

            localStorage.setItem('submittedForm', JSON.stringify(formData));
            // ✅ Success → redirect
            router.push(`/event/${event.id}/booking/payment`);
        } catch (error) {
            console.error("Gửi form thất bại:", error);
            alert("Lỗi hệ thống. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="col-5 border-start" style={{ borderLeft: '1px solid #ddd' }}>
            <div className='container'>
                <p className='title-event'>Chi tiết sự kiện</p>
                <div className='row mt-3 text-start'>
                    <div className="col-md-4">
                        <Image
                            src={`${event?.Images_Events_imgPosterIdToImages?.imageUrl ?? ''}` || '/images/event.png'}
                            width={165}
                            height={110}
                            alt="Image of event"
                            style={{ width: "165px", height: "76px", objectFit: "cover" }}
                        />
                    </div>
                    {event ? (
                        <div className="col-md-8">
                            <p className='d-flex justify-content-start'>{event.title}</p>
                            <p className='d-flex justify-content-start'>
                                <i className="bi bi-geo-alt mr-2"></i>
                                {event.venue}
                            </p>
                            <p className='d-flex justify-content-start'>
                                <i className="bi bi-calendar2-event mr-2"></i>
                                {new Date(event?.startTime).toLocaleString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    ) : (
                        <p>Đang tải dữ liệu...</p>
                    )}
                </div>
                <hr className="custom-hr" />
                <div className='row'>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p className='title-info'>Thông tin đặt vé</p>
                    </div>
                    {event && (
                        <div className="col-md-4 d-flex justify-content-end">
                            <p style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setOpenDialog(true)}>
                                Chọn lại vé
                            </p>
                        </div>
                    )}
                </div>
                <div className='row' style={{ fontWeight: 'bold' }}>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p>Loại vé</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <p>Số lượng</p>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p className='text-start'>
                            <span style={{ display: "block" }}>{ticketType?.name}</span>
                            <span style={{ display: "block" }}>{ticketType?.price?.toLocaleString("vi-VN")}</span>
                        </p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <p>{totalTickets}</p>
                    </div>
                </div>
                <hr className="custom-hr" />
                <div className='row'>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p>Tạm tính</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <p>{totalAmount?.toLocaleString("vi-VN")}đ</p>
                    </div>
                </div>
                <div className='row mt-2 mb-4'>
                    <p>Vui lòng trả lời tất cả câu hỏi để tiếp tục</p>
                </div>
                <div className='row'>
                    {/* <button onClick={handlePayment} className='h-11 rounded bg-[#51DACF] text-[#0C4762] font-bold hover:bg-[#3BB8AE]'>Thanh toán</button> */}
                    <button onClick={handlePayment} className={isFormValid ? 'h-11 rounded bg-[#51DACF] text-[#0C4762] font-bold hover:bg-[#3BB8AE]' : 'btn-order-disable'}
                        disabled={!isFormValid || loading}>
                        {loading ? (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            `Thanh toán - ${totalAmount.toLocaleString("vi-VN")}đ`
                        )}
                    </button>
                </div>
            </div>
            <ConfirmDialog open={openDialog} onClose={() => setOpenDialog(false)} id={event?.id} />
        </div>
    );
}
