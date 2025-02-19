'use client'

export default function QuestionList() {
    return (
        <div className="col-7">
            <div className='container'>
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
    )
}