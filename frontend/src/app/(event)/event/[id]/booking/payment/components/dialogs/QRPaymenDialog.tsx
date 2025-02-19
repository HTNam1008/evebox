'use client';

import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import Image from "next/image";

interface QRPaymentDialogProps {
    open: boolean;
    onClose: () => void;
    amount: number;
    qrImage: string;
}

export default function QRPaymentDialog({ open, onClose, amount, qrImage }: QRPaymentDialogProps) {
    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (open) {
            setMinutes(15);
            setSeconds(0);
            timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        return 59;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [open]);
    
    // 👇 Thêm useEffect riêng để cập nhật phút
    useEffect(() => {
        if (seconds === 59 && minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
        }
    }, [seconds]); 

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <div className="bg-white rounded-lg p-4">
                <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                    <div className="d-flex align-items-center">
                        <Image src="/images/shopee-pay.png" alt="ShopeePay" width="100" height="100" />
                        <span className="fw-bold text-lg">ShopeePay Wallet</span>
                    </div>
                    <button className="text-teal-500 border-0 bg-transparent fw-bold">
                        Đổi phương thức khác
                    </button>
                </div>

                <div className="px-5 py-4">
                    <h3 className="text-center fw-bold mb-4">Quét mã QR để thanh toán</h3>
                    <div className="d-flex justify-content-center align-items-start">
                        <div className="bg-teal-100 p-3 rounded">
                            <Image src={qrImage} alt="QR Code" width="200" height="200" />
                            <div className="d-flex justify-content-between fw-bold px-2 mt-2">
                                <span>Tổng tiền</span>
                                <span>{amount.toLocaleString()}đ</span>
                            </div>
                        </div>

                        <div className="ms-4">
                            <ol className="list-unstyled">
                                {["Mở ứng dụng ShopeePay trên điện thoại của bạn", "Chọn icon Scan & Pay trên ứng dụng ShopeePay", "Quét mã QR", "Áp dụng mã khuyến mãi ShopeePay (nếu có) và hoàn tất thanh toán"].map((text, index) => (
                                    <li key={index} className="d-flex align-items-center mb-2">
                                        <div className="rounded-circle bg-teal-500 text-white d-flex align-items-center justify-content-center me-2" style={{ width: "24px", height: "24px" }}>
                                            {index + 1}
                                        </div>
                                        <span className="fw-bold">{text}</span>
                                    </li>
                                ))}
                            </ol>

                            {/* Đồng hồ đếm ngược */}
                            <div className="bg-teal-100 p-2 rounded d-flex justify-content-center align-items-center mt-3">
                                <span className="fw-bold">Giao dịch sẽ kết thúc sau</span>
                                <span className="bg-teal-500 text-white px-2 mx-1 rounded">{minutes}</span>
                                <span>:</span>
                                <span className="bg-teal-500 text-white px-2 mx-1 rounded">{seconds < 10 ? `0${seconds}` : seconds}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}