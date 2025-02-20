'use client'

/* Package System */
import Image from 'next/image';
import { useState } from 'react';

/* Package Application */
import QRPaymentDialog from "./dialogs/QRPaymenDialog";
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
    const [promoCode, setPromoCode] = useState('');
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);

    const handleOpenQRDialog = () => {
        setIsQRDialogOpen(true);
    };

    return (
        <div className="col-5 border-start" style={{ borderLeft: '1px solid #ddd' }}>
            <div className='container'>
                <p className='title-event'>Chi tiết sự kiện</p>
                <div className='row mt-3 mb-3 text-start'>
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
                <div className='row pt-4 pb-4'>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p className='title-info'>Thông tin đặt vé</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <p>Chọn lại vé</p>
                    </div>
                </div>
                <div className='row fw-bold pt-2 pb-2'>
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
                <div className='row flex flex-col pt-2 pb-3'>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p className='fw-bold'>Mã khuyến mãi</p>
                    </div>
                    <div className="col-md-12 flex flex-row">
                        <input 
                            value={promoCode} 
                            onChange={(e) => setPromoCode(e.target.value)}
                            type="text"
                            className='form-control mr-4 mt-4 h-12 w-[60%]' 
                            placeholder='MÃ GIẢM GIÁ' 
                        />
                        <button disabled={promoCode === ''} className={`btn mt-4 h-12 w-[40%] ${promoCode !== '' ? 'btn-primary' : 'btn-disabled bg-[#dedede]'}`}>Áp dụng</button>
                    </div>
                </div>
                <hr className="custom-hr" />
                <div className='row pt-2 pb-3'>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p>Tạm tính</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <p>{totalAmount}</p>
                    </div>
                </div>
                <hr className="custom-hr" />
                <div className='row pt-2 pb-3'>
                    <div className="col-md-8 d-flex justify-content-start">
                        <p style={{color: '#0C4762'}} className='fw-bold'>Tổng tiền</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <p style={{color: '#0C4762'}} className='fw-bold'>{totalAmount}</p>
                    </div>
                </div>
                <div className='row mt-2 mb-4'>
                    <p>Bằng việc tiến hành đặt mua</p><br/>
                    <p>Bạn đã đồng ý với các <a href='#' style={{color: '#0C4762',textDecoration:'underline'}}>Điều Kiện Giao Dịch Chung</a></p>
                </div>
                <div className='row'>
                    <button onClick={handleOpenQRDialog} className='h-11 rounded bg-[#51DACF] text-[#0C4762] font-bold hover:bg-[#3BB8AE]'>Thanh toán</button>
                </div>
            </div>
            <QRPaymentDialog open={isQRDialogOpen} onClose={() => setIsQRDialogOpen(false)} amount={totalAmount} qrImage="/images/sample-qr.png" />
        </div>
    )
}