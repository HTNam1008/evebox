'use client'

/* Package System */
import { useState } from "react";
import PaymentInfoDialog from "./dialogs/paymentInfoDialog";
import QRPaymentDialog from "./dialogs/QRPaymenDialog";
import TimeOutDialog from "./dialogs/timeOutDialog";

/* Package Application */
import '@/../public/styles/events/payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PaymentMethod() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
    const [isTimeOutOpen, setIsTimeOutOpen] = useState(false);

    const handleOpenInfoDialog = () => {
        setIsDialogOpen(true);
    };

    // const handleOpenQRDialog = () => {
    //     setIsQRDialogOpen(true);
    // };

    // const handleOpenTimeOutDialog = () => {
    //     setIsTimeOutOpen(true);
    // }

    return (
        // <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
        // <h1 className="text-2xl font-bold mb-6">Điền thông tin</h1>

        // <div className="flex space-x-4">
        //     <button
        //         onClick={handleOpenInfoDialog}
        //         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        //     >   
        //         Thông tin nhận vé
        //     </button>

        //     <button
        //         onClick={handleOpenQRDialog}
        //         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        //     >
        //         Quét QR
        //     </button>

        //     <button
        //         onClick={handleOpenTimeOutDialog}
        //         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        //     >
        //         Thời gian hết
        //     </button>
        // </div>

        //     <PaymentInfoDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        //     <QRPaymentDialog open={isQRDialogOpen} onClose={() => setIsQRDialogOpen(false)} amount={100000} qrImage="/images/sample-qr.png" />
        //     <TimeOutDialog open={isTimeOutOpen} onClose={() => setIsTimeOutOpen(false)} />
        // </div>
        <>
            <div className="col-7">
                <div className='container'>
                    <form className="row g-3 needs-validation" noValidate>
                        <div className="flex items-start alert alert-info bg-alert">
                            <i className="bi bi-exclamation-circle mr-2"></i>
                            Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi vui lòng&nbsp;<a onClick={handleOpenInfoDialog}>cập nhật tại đây</a>.
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
                        <div className="col-12 text-start">
                            <label htmlFor="address" className="form-label">
                                <b><span className='red-star'>*</span> Vui lòng kiểm tra lại ĐỊA ĐIỂM của sự kiện trước khi thanh toán</b>
                            </label>
                            <div className="form-check d-flex justify-content-start">
                                <input
                                    className="form-check-input mr-2"
                                    type="radio"
                                    id="checkAgree"
                                    defaultValue=""
                                    style={{ border: '1px solid black' }}
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
            </div>
            <PaymentInfoDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
            <QRPaymentDialog open={isQRDialogOpen} onClose={() => setIsQRDialogOpen(false)} amount={100000} qrImage="/images/sample-qr.png" />
            <TimeOutDialog open={isTimeOutOpen} onClose={() => setIsTimeOutOpen(false)} />
        </>
    );
}