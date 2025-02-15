'use client';

import { useState } from "react";

const TicketDetails = () => {
    const [isTicketInfoExpanded, setIsTicketInfoExpanded] = useState(false);
    const [isTicketNoteExpanded, setIsTicketNoteExpanded] = useState(false);

    return (
        <>
            <div className="flex justify-center mt-8 ml-2" id="info-ticket">
                <div className="w-full md:w-5/6">
                    <h2 className="text-xl md:text-2xl font-bold">
                        Thông tin vé
                    </h2>
                    <div className="card mt-3">
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
                    <p className="card-text mt-2">
                        Vui lòng truy cập <a href="#">www.sneakypeeks.com</a> và tham khảo phần Câu hỏi thường gặp để biết thêm chi tiết
                    </p>
                </div>
            </div>
        </>
    )
};

export default TicketDetails;