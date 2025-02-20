'use client'

/* Package System */
import { useState } from "react";
import Image from "next/image";
import PaymentInfoDialog from "./dialogs/paymentInfoDialog";

/* Package Application */
import '@/../public/styles/events/payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PaymentMethod() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [selectedMethod, setSelectedMethod] = useState("shopeepay");

    const paymentMethods = [
        { id: "shopeepay", name: "ShopeePay Wallet", image: "/images/shopeepay.png" },
        { id: "momo", name: "Momo Wallet", image: "/images/momo.png" },
        { id: "credit", name: "International Credit/Debit Card", image: "/images/visa.png" },
        { id: "atm", name: "ATM Card/Internet Banking", image: "/images/atm.png" },
    ];

    const handleOpenInfoDialog = () => {
        setIsDialogOpen(true);
    };

    return (
        <>
            <div className="col-7">
                <div className="container bg-white rounded-lg p-4 shadow-lg">
                    {/* Lưu ý cập nhật thông tin */}
                    <div className="alert alert-info bg-alert text-sm d-flex align-items-center">
                        <i className="bi bi-exclamation-circle mr-2"></i>
                        Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi vui lòng&nbsp;
                        <a onClick={handleOpenInfoDialog} className="fw-bold text-primary">
                            cập nhật tại đây
                        </a>
                    </div>

                    {/* Thông tin nhận vé */}
                    <div className="mt-3 flex flex-col items-start">
                        <h2 className="fw-bold">Thông tin nhận vé</h2>
                        <p className="mb-1">Nguyễn Thanh Huệ &nbsp;&nbsp; +84123390876</p>
                        <p className="text-muted">customer@gmail.com</p>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="mt-4 flex flex-col">
                        <h4 className="fw-bold self-start">Phương thức thanh toán</h4>
                        <div className="rounded-lg mt-5">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className={`d-flex align-items-center h-14 justify-content-between border rounded-lg pl-3 pr-3 mb-2 cursor-pointer transition-all duration-300 
                                ${selectedMethod === method.id ? 'border-2 border-black shadow-[4px_4px_0px_0px_#0022BA]' : 'border-2 border-gray-300'}`}
                                    onClick={() => setSelectedMethod(method.id)}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={selectedMethod === method.id}
                                            onChange={() => setSelectedMethod(method.id)}
                                            className="me-2"
                                        />
                                        <span className="fw-bold">{method.name}</span>
                                    </div>
                                    <Image className={`method-img rounded-lg ${method.id !== 'shopeepay' ? 'max-w-[107px] justify-end max-h-[38px] object-contain' : ''}`} src={method.image} alt={method.name} width={107} height={21.5} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <PaymentInfoDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </>
    );
}