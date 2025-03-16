'use client'
import { useState, useEffect } from "react";

export default function QuestionList({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [agree, setAgree] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isFormValid = phone.trim() !== "" && email.trim() !== "" && agree;
        setIsValid(isFormValid);
        onValidationChange(isFormValid); // Truyền trạng thái form lên component cha
    }, [phone, email, agree, onValidationChange]);

    useEffect(() => {
        // save email and address and phone to local storage
        if (phone.trim() !== "") {
            localStorage.setItem("phone", phone);
        }
        if (email.trim() !== "") {
            localStorage.setItem("email", email);
        }
        if (address.trim() !== "") {
            localStorage.setItem("address", address);
        }
    }, [phone, email, address]);

    return (
        <div className="col-7">
            <div className='container'>
                <form className="row g-3 needs-validation" noValidate>
                    <div className="alert alert-info bg-alert">
                        <i className="bi bi-exclamation-circle mr-2"></i>
                        Vé điện tử sẽ được gửi đến địa chỉ email của bạn, vui lòng đảm bảo địa chỉ email
                        của bạn là chính xác.
                    </div>

                    {!isValid && (
                        <div className="alert alert-danger">
                            <i className="bi bi-exclamation-triangle-fill mr-2"></i>
                            Vui lòng điền đầy đủ thông tin để tiếp tục
                        </div>
                    )}

                    <div className="col-md-12">
                        <label htmlFor="phone" className="form-label d-flex justify-content-start">
                            <b><span className='red-star'>*</span> Số điện thoại của bạn</b>
                        </label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            id="phone"
                            placeholder="Điền câu trả lời của bạn"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="address" className="form-label d-flex justify-content-start">
                            <b>Địa điểm nhận quà (nếu có)</b>
                        </label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            id="address"
                            placeholder="Điền câu trả lời của bạn"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                                checked={agree}
                                onChange={() => setAgree(!agree)}
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
    )
}