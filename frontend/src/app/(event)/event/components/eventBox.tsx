'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface EventProps {
    title: string;
    description: string;
    date: string;
    location: string;
}

export default function EventBox({ event }: { event: EventProps }) {
    const router = useRouter(); // Sử dụng useRouter

    return (
        <div className="d-flex justify-content-center px-4">
            <div className="eve-image d-flex justify-content-center align-items-center">
                {/* Mask phủ lên hình ảnh */}
                <div className="mask mask-img"></div>

                {/* Nút "Quay lại" */}
                <div className="back-button-wrapper position-absolute mt-4">
                    <button type="button" className="btn-back" onClick={() => router.back()}>
                        <i className="bi bi-chevron-left mr-2" style={{ fontSize: '14px' }}></i>
                        Quay lại
                    </button>
                </div>

                <div className="eve-padding">
                    <div className="row justify-content-between">
                        {/* Thông tin sự kiện */}
                        <div className="col-lg-7 col-md-12 p-0 d-flex align-items-center text-left" style={{ zIndex: 2 }}>
                            <div>
                                <p className="txt-name-event-title">{event.title}</p>
                                <p className="card-text" style={{ color: 'white' }}>{event.description}</p>
                                <p className="card-text view-location" onClick={() => document.getElementById('event-location')?.scrollIntoView({ behavior: 'smooth' })}>
                                    <i className="bi bi-geo-alt mr-2"></i>
                                    Xem bản đồ
                                </p>
                            </div>
                        </div>

                        {/* Thông tin ngày & giờ, địa điểm */}
                        <div className="col-lg-5 col-md-12 p-0 d-flex justify-content-end align-items-center" style={{ zIndex: 2 }}>
                            <div className="card" style={{ width: '385px' }}>
                                <div className="card-body px-4 mt-2 mb-3">
                                    <h5 className="card-title title-box">Ngày & giờ</h5>
                                    <p className="card-text m-0 text-body-secondary">
                                        <i className="bi bi-calendar2-event mr-2"></i>
                                        {event.date}
                                        <button
                                            type="button" className="btn btn-outline-dark ml-6 mt-2 mb-2 btn-date"
                                            onClick={() => document.getElementById('info-ticket')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            + 4 ngày khác
                                        </button>
                                    </p>
                                    <p className="card-text text-add p-0">Thêm vào lịch</p>

                                    <h5 className="card-title mt-2 title-box">Địa điểm</h5>
                                    <p className="card-text text-body-secondary mb-3">
                                        <i className="bi bi-geo-alt mr-2"></i>
                                        {event.location}
                                    </p>

                                    <hr />

                                    <div className="d-flex justify-content-center align-items-center mt-3 mb-2">
                                        <h5 className="card-title title-box text-center w-100">
                                            Giá từ
                                            <span className="ml-2 text-teal-400" style={{ cursor: "pointer" }}>
                                                350.000đ
                                                <i className="bi bi-chevron-right ml-1" style={{ fontSize: 18 }} />
                                            </span>
                                        </h5>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn-buy-now" onClick={() => document.getElementById('info-ticket')?.scrollIntoView({ behavior: 'smooth' })}>
                                            Mua vé ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
