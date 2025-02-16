'use client'

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import '@/styles/admin/pages/Dashboard.css';
import '@/styles/admin/pages/BookingQuestionForm.css'


interface EventProps {
    title: string;
    description: string;
    date: string;
    location: string;
}

export default function QuestionForm({ event }: { event: EventProps }) {
    return (
        <div className="mt-5 mb-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <i className="bi bi-arrow-left-square icon-back"></i>
                    </div>
                    <div className="col">
                        <p className='title-page'>Bảng câu hỏi</p>
                    </div>
                    <div className="col">
                        3 of 3
                    </div>
                </div>

                <div className="row align-items-start mt-4">
                    <div className="col-7">
                        <form className="row g-3 needs-validation" noValidate>
                            <div className="alert alert-info bg-alert">
                                <i className="bi bi-exclamation-circle mr-2"></i>
                                Vé điện tử sẽ được gửi đến địa chỉ email của bạn, vui lòng đảm bảo địa chỉ email
                                của bạn là chính xác.
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="phone" className="form-label">
                                    <b><span className='red-star'>*</span> Số điện thoại của bạn</b>
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="phone"
                                    placeholder="Điền câu trả lời của bạn"
                                    required
                                />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="mail" className="form-label">
                                    <b><span className='red-star'>*</span> Email của bạn</b>
                                </label>
                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    id="mail"
                                    placeholder="Điền câu trả lời của bạn"
                                    required
                                />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="address" className="form-label">
                                    <b><span className='red-star'>*</span> Địa điểm nhận quà (nếu có)</b>
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="address"
                                    placeholder="Điền câu trả lời của bạn"
                                    required
                                />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="address" className="form-label">
                                    <b><span className='red-star'>*</span> Vui lòng kiểm tra lại ĐỊA ĐIỂM của sự kiện trước khi thanh toán</b>
                                </label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="checkAgree"
                                        defaultValue=""
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="checkAgree">
                                        Tôi đồng ý
                                    </label>
                                    <div className="invalid-feedback">You must agree before submitting.</div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-5">
                        <p className='title-event'>Chi tiết sự kiện</p>
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                            <p>Drive In Senja: Back to the Future</p>
                            <p>Đường Nguyễn Huệ, Quận 1, TP.HCM</p>
                            <p>20:00 - 23:00, 25 tháng 10, 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}