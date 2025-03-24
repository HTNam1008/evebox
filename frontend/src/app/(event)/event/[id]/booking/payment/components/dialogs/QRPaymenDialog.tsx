'use client';

/* Package System */
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
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    useEffect(() => {
        if (!open) return; // Nếu dialog không mở thì không làm gì cả

        // Lấy thời gian còn lại từ localStorage
        const storedTime = localStorage.getItem('timeLeft');
        const storedTimestamp = localStorage.getItem('timestamp');

        if (storedTime && storedTimestamp) {
            const elapsedTime = Math.floor((Date.now() - Number(storedTimestamp)) / 1000);
            const remainingTime = Math.max(Number(storedTime) - elapsedTime, 0);
            setTimeLeft(remainingTime);

            if (remainingTime === 0) {
                localStorage.setItem('timeLeft', '0');
                return;
            }
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    localStorage.setItem('timeLeft', '0');
                    return 0;
                }
                localStorage.setItem('timeLeft', String(prevTime - 1));
                localStorage.setItem('timestamp', String(Date.now()));
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [open]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

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
                                <span>{amount?.toLocaleString()}đ</span>
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