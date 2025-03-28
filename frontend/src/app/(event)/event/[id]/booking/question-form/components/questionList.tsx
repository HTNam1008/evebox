'use client'
import { useState, useEffect } from "react";

interface FormInput {
    id: number;
    formId: number;
    fieldName: string;
    type: string;
    required: boolean;
    regex: string | null;
    options: { optionText: string }[] | null;
}

interface QuestionListProps {
    formInputs: FormInput[];
    onValidationChange: (isValid: boolean) => void;
    onFormChange: (answers: { [formInputId: number]: string }) => void;
    isLoadingForm?: boolean;
}

export default function QuestionList({
    formInputs,
    onValidationChange,
    onFormChange,
    isLoadingForm
}: QuestionListProps) {
    const [answers, setAnswers] = useState<{ [formInputId: number]: string }>({});

    useEffect(() => {
        const allRequiredAnswered = formInputs.every((input) =>
            input.required ? answers[input.id]?.trim() : true
        );
        onFormChange(answers);
        onValidationChange(allRequiredAnswered);
    }, [answers, formInputs, onValidationChange, onFormChange]);

    const handleChange = (id: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    return (
        <div className="col-7">
            <div className='container'>
                <form className="row g-3 needs-validation" noValidate>
                    <div className="alert alert-info bg-alert">
                        <i className="bi bi-exclamation-circle mr-2"></i>
                        Vé điện tử sẽ được gửi đến địa chỉ email của bạn, vui lòng đảm bảo địa chỉ email
                        của bạn là chính xác.
                    </div>

                    {!isLoadingForm ? (
                        formInputs.length > 0 ? (
                            formInputs.map((input) => (
                                <div className="col-md-12" key={input.id}>
                                    <label htmlFor={`input-${input.id}`} className="form-label d-flex justify-content-start">
                                        <b>{input.required && <span className="red-star">*</span>} {input.fieldName}</b>
                                    </label>
                                    {input.type === "2" ? (
                                        // Nếu type là "2" thì render radio
                                        <div className="form-check d-flex justify-content-start">
                                            {input.options && input.options.length > 0 ? (
                                                <>
                                                    <input
                                                        className="form-check-input mr-2"
                                                        type="radio"
                                                        id={`input-${input.id}`}
                                                        checked={answers[input.id] === input.options[0].optionText}
                                                        onChange={() => input.options && handleChange(input.id, input.options[0].optionText)}
                                                        required={input.required}
                                                    />
                                                    <label className="form-check-label" htmlFor={`input-${input.id}`}>
                                                        {input.options[0].optionText}
                                                    </label>
                                                </>
                                            ) : (
                                                <span>Không có lựa chọn</span>
                                            )}
                                        </div>
                                    ) : (
                                        // Các trường còn lại, sử dụng input với type tương ứng
                                        <input
                                            type={input.type} // "text", "email", "phone",…
                                            className="form-control custom-input"
                                            id={`input-${input.id}`}
                                            placeholder="Điền câu trả lời của bạn"
                                            value={answers[input.id] || ""}
                                            onChange={(e) => handleChange(input.id, e.target.value)}
                                            required={input.required}
                                        />
                                    )}
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                            ))
                        ) : (
                            <p>Sự kiện không yêu cầu thông tin.</p>
                        )
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Đang tải câu hỏi thông tin từ chương trình</span>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}