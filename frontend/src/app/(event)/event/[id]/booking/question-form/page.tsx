'use client'

import React from 'react';
import Image from 'next/image';
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
                    <div className="col d-flex justify-content-start">
                        <i className="bi bi-arrow-left-square icon-back"></i>
                    </div>
                    <div className="col">
                        <p className='title-page'>Bảng câu hỏi</p>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <div className="alert alert-info bg-alert ">
                            <p>Hoàn tất đặt vé trong</p>
                            <div className='row'>
                                <div>15</div>
                                <div>:</div>
                                <div>00</div>
                            </div>
                        </div>
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
                                <label htmlFor="phone" className="form-label d-flex justify-content-start">
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
                                <label htmlFor="mail" className="form-label d-flex justify-content-start">
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
                                <label htmlFor="address" className="form-label d-flex justify-content-start">
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
                                <label htmlFor="address" className="form-label d-flex justify-content-start">
                                    <b><span className='red-star'>*</span> Vui lòng kiểm tra lại ĐỊA ĐIỂM của sự kiện trước khi thanh toán</b>
                                </label>
                                <div className="form-check d-flex justify-content-start">
                                    <input
                                        className="form-check-input mr-2"
                                        type="radio"
                                        id="checkAgree"
                                        defaultValue=""
                                        style={{border: '1px solid black'}}
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
                        <div className='row mt-3'>
                            <div className="col-md-4">
                                <Image
                                    src='/images/dashboard/presentation_pic.png'
                                    width={165}
                                    height={78}
                                    alt="Image of event"
                                />
                            </div>
                            <div className="col-md-8">
                                <p className='d-flex justify-content-start'>Drive In Senja: Back to the Future</p>
                                <p className='d-flex justify-content-start'>
                                    <i className="bi bi-geo-alt mr-2"></i>
                                    Đường Nguyễn Huệ, Quận 1, TP.HCM
                                </p>
                                <p className='d-flex justify-content-start'>
                                    <i className="bi bi-calendar2-event mr-2"></i>
                                    20:00 - 23:00, 25 tháng 10, 2024
                                </p>
                            </div>
                        </div>
                        <hr className="custom-hr" />
                        <div className='row'>
                            <div className="col-md-9 d-flex justify-content-start">
                                <p className='title-info'>Thông tin đặt vé</p>
                            </div>
                            <div className="col-md-3 d-flex justify-content-end">
                                <p>Chọn lại vé</p>
                            </div>
                        </div>
                        <div className='row' style={{ fontWeight: 'bold' }}>
                            <div className="col-md-9 d-flex justify-content-start">
                                <p>Loại vé</p>
                            </div>
                            <div className="col-md-3 d-flex justify-content-end">
                                <p>Số lượng</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-9 d-flex justify-content-start">
                                <p>Early Bird Ticket</p>
                                <p>599.000đ</p>
                            </div>
                            <div className="col-md-3 d-flex justify-content-end">
                                <p>02</p>
                            </div>
                        </div>
                        <hr className="custom-hr" />
                        <div className='row'>
                            <div className="col-md-9 d-flex justify-content-start">
                                <p>Tạm tính</p>
                            </div>
                            <div className="col-md-3 d-flex justify-content-end">
                                <p>1.198.000đ</p>
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
            </div>
        </div>
    )
}