'use client'
import Image from 'next/image';
import React from "react";

interface EventProps {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
}

interface TicketInformationProps {
    event: EventProps | null;
    totalTickets: number;
    totalAmount: number;
}



export default function TicketInformation({ event, totalTickets, totalAmount }: TicketInformationProps) {
    return (
        <div className="col-5 border-start" style={{ borderLeft: '1px solid #ddd' }}>
            <div className='container'>
                <p className='title-event'>Chi tiết sự kiện</p>
                <div className='row mt-3 text-start'>
                    <div className="col-md-4">
                        <Image
                            src='/images/dashboard/presentation_pic.png'
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
                                {event.location}
                            </p>
                            <p className='d-flex justify-content-start'>
                                <i className="bi bi-calendar2-event mr-2"></i>
                                {event.date}
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
                    <div className="col-md-4 d-flex justify-content-end">
                        <p>Chọn lại vé</p>
                    </div>
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
                            <span style={{ display: "block" }}>Early Bird Ticket</span>
                            <span style={{ display: "block" }}>599.000đ</span>
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
                        <p>{totalAmount}</p>
                    </div>
                </div>
                <div className='row mt-2 mb-4'>
                    <p>Vui lòng trả lời tất cả câu hỏi để tiếp tục</p>
                </div>
                <div className='row'>
                    <button className='btn-order-disable'>Thanh toán</button>
                </div>
            </div>
        </div>
    )
}