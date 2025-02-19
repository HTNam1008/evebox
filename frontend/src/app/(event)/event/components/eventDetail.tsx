'use client'

import { useState } from "react";
import React from 'react';
import '@/styles/admin/pages/EventDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import '@/styles/admin/pages/Dashboard.css';

interface EventProps {
    title: string;
    description: string;
    date: string;
    location: string;
}

// Client component
export default function EventDetailClient({ event }: { event: EventProps }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const [isTicketInfoExpanded, setIsTicketInfoExpanded] = useState(false);

    const [isTicketNoteExpanded, setIsTicketNoteExpanded] = useState(false);

    return (
        <div className="mt-5 mb-5">
            {/* Event Box */}
            <div className="d-flex justify-content-center px-4">
                <div className="eve-image d-flex justify-content-center align-items-center">
                    {/* Mask phủ lên hình ảnh */}
                    <div className="mask mask-img"></div>
                    {/* Nút "Quay lại" */}
                    <div className="back-button-wrapper position-absolute mt-4">
                        <button type="button" className="btn-back">
                            <i className="bi bi-chevron-left mr-2" style={{ fontSize: '14px' }}></i>
                            Quay lại
                        </button>
                    </div>
                    <div className="eve-padding">
                        <div className="row justify-content-between">
                            <div className="col-lg-7 col-md-12 p-0 d-flex align-items-center text-left" style={{ zIndex: 2 }}>
                                <div >
                                    <p className="txt-name-event-title">
                                        {event.title}
                                    </p>
                                    <p className="card-text" style={{ color: 'white' }}>
                                        {event.description}
                                    </p>
                                    <p className="card-text view-location" onClick={() => document.getElementById('event-location')?.scrollIntoView({ behavior: 'smooth' })}>
                                        <i className="bi bi-geo-alt mr-2"></i>
                                        Xem bản đồ
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-12 p-0 d-flex justify-content-end align-items-center" style={{ zIndex: 2 }}>
                                <div className="card" style={{ width: '385px' }}>
                                    <div className="card-body px-4 mt-3 mb-3">
                                        <h5 className="card-title">Ngày & giờ</h5>
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
                                        <p className="card-text p-0"><small style={{ color: '#51DACF' }}>Thêm vào lịch</small></p>
                                        <h5 className="card-title">Địa điểm</h5>
                                        <p className="card-text text-body-secondary">
                                            <i className="bi bi-geo-alt mr-2"></i>
                                            {event.location}
                                        </p>
                                        <hr></hr>
                                        <div className="d-flex justify-content-center mb-2">
                                            <h5 className="card-title">
                                                Giá từ
                                                <span className="ml-2 text-teal-400"
                                                    onClick={() => document.getElementById('info-ticket')?.scrollIntoView({ behavior: 'smooth' })}
                                                    style={{ cursor: 'pointer' }}>
                                                    350.000đ
                                                    <i className="bi bi-chevron-right ml-1" style={{ fontSize: '16px' }}></i>
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

            <div>
                <div className="row align-items-start">
                    <div className="col-lg-8 col-md-12 custom-col-left ">
                        {/* Description */}
                        <div className="flex justify-center mt-8 ml-2">
                            <div className="w-full md:w-5/6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Mô tả
                                </h2>
                                <p className="card-text">
                                    DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM.
                                    The workshop taught participants the magic of creating stunning 3D models and animations using Blender.
                                    It was suitable for both beginners and experienced users.
                                    The event was followed by a blender-render competition, which added to the excitement.
                                    It was suitable for both beginners and experienced users.
                                    The event was followed by a blender-render competition, which added to the excitement.
                                    <span id="dots">{!isDescriptionExpanded ? "..." : ""}</span>
                                    <span style={{ display: isDescriptionExpanded ? "inline" : "none" }}>
                                        The workshop taught participants the magic of creating stunning 3D models and animations using Blender.
                                        It was suitable for both beginners and experienced users.
                                    </span>
                                </p>
                                <div
                                    className="d-flex justify-content-center div-more"
                                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                >
                                    {isDescriptionExpanded ? (
                                        <i className="bi bi-chevron-up"></i>
                                    ) : (
                                        <i className="bi bi-chevron-down"></i>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Ticket details */}
                        <div className="flex justify-center mt-8 ml-2" id="info-ticket">
                            <div className="w-full md:w-5/6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Thông tin vé
                                </h2>
                                <div className="card">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item li-ticket">
                                            <div className="d-flex justify-content-between align-items-center">
                                                {/* Nút toggle */}
                                                <div className="d-flex text-ticket">
                                                    <div className="mr-2" onClick={() => setIsTicketInfoExpanded(!isTicketInfoExpanded)}>
                                                        {isTicketInfoExpanded ? (<i className="bi bi-chevron-down"></i>)
                                                            : (<i className="bi bi-chevron-right"></i>)}
                                                    </div>
                                                    20:00 - 23:00, 25 tháng 1, 2024
                                                </div>
                                                <button type="button" className="btn-buy">Mua vé ngay</button>
                                            </div>

                                            {/* Phần mở rộng "Vé" */}
                                            {isTicketInfoExpanded && (
                                                <ul className="ul-ticket-item">
                                                    <hr></hr>
                                                    <li className="list-group-item li-ticket-item p-0">
                                                        <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                                                            <div className="d-flex ml-4 text-ticket" >
                                                                Vé thường
                                                            </div>
                                                            <div className="d-flex flex-column align-items-end">
                                                                <p className="price mb-0">308.000đ</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <hr></hr>
                                                    <li className="list-group-item li-ticket-item p-0">
                                                        <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                                                            <div className="d-flex ml-3 text-ticket" >
                                                                <div className="mr-2" onClick={() => setIsTicketNoteExpanded(!isTicketNoteExpanded)}>
                                                                    {isTicketNoteExpanded ? (<i className="bi bi-chevron-down"></i>)
                                                                        : (<i className="bi bi-chevron-right"></i>)}
                                                                </div>
                                                                Vé ưu đãi
                                                            </div>
                                                            <div className="d-flex flex-column align-items-end">
                                                                <p className="price mb-0">278.000đ</p>
                                                            </div>
                                                        </div>
                                                        {/* Phần mở rộng "Vé ưu đãi" */}
                                                        {isTicketNoteExpanded && (
                                                            <ul className="ul-ticket-item">
                                                                <li className="list-group-item li-ticket-item p-0">
                                                                    <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                                                                        <p className="card-text ml-3" style={{ color: '#F4EEEE' }}>
                                                                            Vé ưu đãi giảm 10% dành cho nhóm khách đăng ký trên 4 slot
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                        <li className="list-group-item li-ticket">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex mr-2 text-ticket">
                                                    <i className="bi bi-chevron-right mr-2"></i>
                                                    20:00 - 23:00, 25 tháng 10, 2024
                                                </div>
                                                <div className="d-flex flex-column align-items-end">
                                                    <p className="price-sold-out mb-2">250.000đ</p>
                                                    <button type="button" className="btn-sold-out">Hết vé</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item li-ticket">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex mr-2 text-ticket">
                                                    <i className="bi bi-chevron-right mr-2"></i>
                                                    20:00 - 23:00, 25 tháng 8, 2024
                                                </div>
                                                <button type="button" className="btn-disable">Vé chưa mở bán</button>
                                            </div>
                                        </li>
                                        <li className="list-group-item li-ticket">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex mr-2 text-ticket">
                                                    <i className="bi bi-chevron-right mr-2"></i>
                                                    20:00 - 23:00, 25 tháng 10, 2025
                                                </div>
                                                <button type="button" className="btn-disable">Vé ngừng bán</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="flex justify-center mt-8 ml-2">
                            <div className="w-full md:w-5/6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Liên hệ người tổ chức
                                </h2>
                                <p className="card-text">
                                    Vui lòng truy cập <a href="#">www.sneakypeeks.com</a> và tham khảo phần Câu hỏi thường gặp để biết thêm chi tiết
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12" id="event-location">
                        {/* Location */}
                        <div className="flex mt-8 mr-2">
                            <div className="w-full md:w-5/6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Địa điểm sự kiện
                                </h2>
                                <div className="ratio ratio-16x9">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117996.95037632967!2d-74.05953969406828!3d40.75468158321536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20Nowy%20Jork%2C%20Stany%20Zjednoczone!5e1!3m2!1spl!2spl!4v1672242444695!5m2!1spl!2spl" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <h5 className="card-title mt-2">Dream world wide in jakatra</h5>
                                <p className="card-text mt-2">
                                    <i className="bi bi-geo-alt mr-2"></i>
                                    Đường Nguyễn Huệ, Quận 1, TP.HCM
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex mt-8 mr-2">
                            <div className="w-full md:w-5/6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Tags
                                </h2>
                                <div>
                                    <a className="txt-tags mr-4" href="#">Indonesia event</a>
                                    <a className="txt-tags mr-4" href="#">Seminar</a>
                                    <a className="txt-tags mr-4" href="#">Hot</a>
                                    <a className="txt-tags mr-4" href="#">Music</a>
                                </div>
                            </div>
                        </div>

                        {/* Share with friends */}
                        <div className="flex mt-8 mr-2">
                            <div className="w-full md:w-5/6">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Chia sẻ với bạn bè
                                </h2>

                                <div className="row-app mt-3">
                                    <img className="img-app mr-2" src='../../images/detail/Facebook.png' />
                                    <img className="img-app mr-2 ml-2" src='../../images/detail/WhatsApp.png' />
                                    <img className="img-app mr-2 ml-2" src='../../images/detail/LinkedIn.png' />
                                    <img className="img-app ml-2" src='../../images/detail/Twitter.png' />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment */}
            <div className="flex justify-center mt-8">
                <div className="w-full cmt-pad">
                    <h2 className="text-xl md:text-2xl font-bold">
                        Bình luận
                    </h2>
                    <div className="d-flex justify-content-center mt-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-start align-items-center">
                                    <img
                                        className="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                        alt="avatar"
                                        width={60}
                                        height={60}
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-1" style={{ color: "#0C4762" }}>Lily Coleman</h6>
                                        <p className="text-muted small mb-0">
                                            Shared publicly - Jan 2020
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-3 mb-4 pb-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip consequat.
                                </p>
                                <div className="small d-flex justify-content-start">
                                    <a href="#!" className="d-flex align-items-center me-3" style={{ textDecoration: "none" }}>
                                        <i className="bi bi-hand-thumbs-up mr-2"></i>
                                        <p className="mb-0">Thích</p>
                                    </a>
                                    <a href="#!" className="d-flex align-items-center me-3" style={{ textDecoration: "none" }}>
                                        <i className="bi bi-chat-dots mr-2"></i>
                                        <p className="mb-0">Bình luận</p>
                                    </a>
                                    <a href="#!" className="d-flex align-items-center me-3" style={{ textDecoration: "none" }}>
                                        <i className="bi bi-share-fill mr-2"></i>
                                        <p className="mb-0">Chia sẻ</p>
                                    </a>
                                </div>
                            </div>
                            <div
                                className="card-footer py-3 border-0"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <div className="d-flex align-items-start w-100">
                                    {/* Avatar */}
                                    <img
                                        className="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                        alt="avatar" width={40} height={40}
                                    />

                                    <div className="w-100">
                                        <textarea
                                            className="form-control mb-2"
                                            id="textAreaExample"
                                            style={{ background: "#fff", resize: "none", height: "100px" }}
                                            placeholder="Nhập bình luận của bạn"
                                            defaultValue={""}
                                        />

                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-type-bold me-2" style={{ cursor: "pointer" }}></i>
                                                <i className="bi bi-type-italic me-2" style={{ cursor: "pointer" }}></i>
                                                <i className="bi bi-type-strikethrough me-3" style={{ cursor: "pointer" }}></i>

                                                <label
                                                    htmlFor="imageUpload"
                                                    className="d-inline-flex align-items-center"
                                                    style={{ cursor: "pointer", marginTop: "2px" }}
                                                >
                                                    <i className="bi bi-upload"></i>
                                                </label>
                                                <input type="file" id="imageUpload" className="d-none" accept="image/*" />
                                            </div>
                                            <div className='mt-2'>
                                                <button className="btn-post btn-sm me-2">Post comment</button>
                                                <button className="btn-cancel btn-sm">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Events Section */}
            <div className="flex mt-8 justify-content-center">
                <div className="w-full cmt-pad">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2 className="text-xl md:text-2xl font-bold">
                            Các sự kiện khác bạn có thể thích
                        </h2>
                    </div>

                    {/* Event Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center aspect-[13/9] overflow-hidden">
                                    <img
                                        src="/images/dashboard/card_pic.png"
                                        alt="Event"
                                        className="w-11/12 h-11/12 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-left text-base mb-3 line-clamp-2 leading-tight">
                                        Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trường
                                    </h3>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-sm">
                                        <time className="text-left text-teal-500">20:00 - 23:00, 25 tháng 10, 2024</time>
                                        <span className={`rounded-lg bg-emerald-200 px-4 font-medium text-sky-950 text-center md:text-left`}>
                                            {index % 2 === 0 ? 'Miễn phí' : '950.000đ'}
                                        </span>
                                    </div>
                                    <p className="mt-3 text-left text-xs text-gray-400">
                                        SỰ KIỆN TRỰC TUYẾN - Tham dự ở bất cứ đâu
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center mt-8">
                        <button className="px-6 py-2 bg-teal-400 text-sky-950 rounded-md hover:bg-teal-300 transition-colors">
                            Xem thêm...
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}