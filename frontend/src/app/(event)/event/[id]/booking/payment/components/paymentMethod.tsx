'use client'

/* Package System */
import { useEffect, useState } from "react";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';

/* Package Application */
import PaymentInfoDialog from "./dialogs/paymentInfoDialog";
import '@/../public/styles/events/payment.css';

interface PaymentMethod {
    paymentMethod: string;
    status: string;
}

interface PaymentMethodProps {
    onMethodSelected: (method: string) => void;
}

export default function PaymentMethod({ onMethodSelected }: PaymentMethodProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [selectedMethod, setSelectedMethod] = useState("");

    const [isLoadingMethods, setIsLoadingMethods] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

    const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const data = localStorage.getItem('submittedForm');
        if (data) {
            setSubmittedAnswers(JSON.parse(data));
        }
    }, []);

    const userData = localStorage.getItem('verifyData');
    const user = userData ? JSON.parse(userData) : null;

    const handleOpenInfoDialog = () => {
        setIsDialogOpen(true);
    };

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setIsLoadingMethods(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_TICKET_SVC_URL}/api/payment/getPaymentMethodStatus`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch payment methods: ${response.statusText}`);
                }

                const data = await response.json();
                setPaymentMethods(data?.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu phương thức thanh toán:", error);
            } finally {
                setIsLoadingMethods(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    const handleSelectMethod = (method: string) => {
        setSelectedMethod(method);
        onMethodSelected(method);
    }

    return (
        <>
            <div className="col-7">
                <div className="container bg-white rounded-lg p-4 shadow-lg">
                    {/* Lưu ý cập nhật thông tin */}
                    <div className="alert alert-info bg-alert text-sm d-flex align-items-center">
                        <i className="bi bi-exclamation-circle mr-2"></i>
                        Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi vui lòng&nbsp;
                        <a
                            // onClick={handleOpenInfoDialog} 
                            className="fw-bold text-primary cursor-pointer hover:underline"
                        >
                            cập nhật tại đây
                        </a>
                    </div>

                    {/* Thông tin nhận vé */}
                    <div className="mt-3 flex flex-col items-start">
                        <h2 className="fw-bold">Thông tin nhận vé</h2>
                        {Object.entries(submittedAnswers).map(([formInputId, value]) => (
                            !value.includes("Tôi") && (
                                <p key={formInputId} className="mb-1">{value}</p>
                            )
                        ))}
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="mt-4 flex flex-col">
                        <h4 className="fw-bold self-start">Phương thức thanh toán</h4>
                        <div className="rounded-lg mt-5">
                            {!isLoadingMethods && paymentMethods?.map((method) => (
                                <div
                                    key={method.paymentMethod}
                                    className={`d-flex align-items-center h-14 justify-content-between border rounded-lg pl-3 pr-3 mb-2 cursor-pointer transition-all duration-300 
                                ${selectedMethod === method.paymentMethod ? 'border-2 border-black shadow-[4px_4px_0px_0px_#0022BA]' : 'border-2 border-gray-300'}`}
                                    onClick={() => handleSelectMethod(method.paymentMethod)}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.paymentMethod}
                                            checked={selectedMethod === method.paymentMethod}
                                            onChange={() => handleSelectMethod(method.paymentMethod)}
                                            className="me-2"
                                        />
                                        <span className="fw-bold">{method.paymentMethod}</span>
                                    </div>
                                    <Image className={`method-img rounded-lg max-w-[107px] justify-end max-h-[38px] object-contain`} src={`/images/${method.paymentMethod}-logo.svg`} alt={method.paymentMethod} width={107} height={21.5} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <PaymentInfoDialog open={isDialogOpen} user={user} onClose={handleOpenInfoDialog} />
        </>
    );
}