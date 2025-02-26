'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
interface Ticket {
    originalPrice: number;
    maxQtyPerOrder: number;
    minQtyPerOrder: number;
    effectiveFrom: string;
    effectiveTo: string;
    status: string;
    imageUrl?: string;
    isHidden: boolean;
  }
  
interface Event {
    id: number;
    title: string;
    description: string;
    startDate: string;
    venue: string;
    tickets?: Ticket[];
    Images_Events_imgPosterIdToImages?: { imageUrl: string };
  }

  // Function to remove <img> tags from HTML content
  const extractFirstParagraph = (html: string) => {
    // Match the first <p>...</p> and extract its content
    const match = html.match(/<p[^>]*>(.*?)<\/p>/);
    return match ? match[1] : ''; // Return content inside first <p> or empty string
  };

export default function EventBox({ event }: { event: Event }) {
    const router = useRouter(); // Sử dụng useRouter

    return (
        <div className="d-flex justify-content-center px-4">
            <div className="eve-image d-flex justify-content-center align-items-center">
                {/* Mask phủ lên hình ảnh */}
                <div
    className="mask mask-img"
    style={{
        backgroundImage: `url(${event.Images_Events_imgPosterIdToImages?.imageUrl || '/images/default-mask.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.5, // Adjust opacity for the overlay effect
    }}
></div>

                {/* Nút "Quay lại" */}
                <div className="back-button-wrapper position-absolute mt-4">
                    <button type="button" className="btn-back" onClick={() => router.back()}>
                        <i className="bi bi-chevron-left mr-2" style={{ fontSize: '14px' }}></i>
                        Quay lại
                    </button>
                </div>

                <div className="mt-8 eve-padding">
                    <div className="row justify-content-between">
                        {/* Thông tin sự kiện */}
                        <div className="col-lg-7 col-md-12 mt-4mt-4 p-0 d-flex align-items-center text-left" style={{ zIndex: 2 }}>
                            <div>
                                <p className="txt-name-event-title">{event.title}</p>
                                <div
                                    className="card-text  text-white prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: extractFirstParagraph(event.description) }}
                                />
                                <p className="mt-4 card-text view-location" onClick={() => document.getElementById('event-location')?.scrollIntoView({ behavior: 'smooth' })}>
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
                                        {event.startDate}
                                        {/* <button
                                            type="button" className="btn btn-outline-dark ml-6 mt-2 mb-2 btn-date"
                                            onClick={() => document.getElementById('info-ticket')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            + 4 ngày khác
                                        </button> */}
                                    </p>
                                    <p className="card-text text-add p-0">Thêm vào lịch</p>

                                    <h5 className="card-title mt-2 title-box">Địa điểm</h5>
                                    <p className="card-text text-body-secondary mb-3">
                                        <i className="bi bi-geo-alt mr-2"></i>
                                        {event.venue}
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
