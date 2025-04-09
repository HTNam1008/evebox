'use client'
import { useState, useEffect } from "react";
import crypto from 'crypto';

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
    onRequiredFilledChange: (allRequiredFilled: boolean) => void; // New prop
}

export default function QuestionList({
    formInputs,
    onValidationChange,
    onFormChange,
    isLoadingForm,
    onRequiredFilledChange, // New prop
}: QuestionListProps) {
    const [answers, setAnswers] = useState<{ [formInputId: number]: string }>({});
    const [errors, setErrors] = useState<{ [formInputId: number]: string | null }>({});
    const [, setAllRequiredFilled] = useState<boolean>(false);

    // Hashing function
    const hashInput = (value: string): string => {
        return crypto.createHash('sha256').update(value).digest('hex');
    };

    // Validation function
    const validateInput = (value: string, regex: string | null) => {
        if (!regex) return true; // No validation needed if regex is null
        const pattern = new RegExp(regex);
        return pattern.test(value);
    };

    useEffect(() => {
        // Check if all required fields are filled
        const allFilled = formInputs.every((input) => !input.required || (answers[input.id] && answers[input.id].trim() !== ""));
        setAllRequiredFilled(allFilled);
        onRequiredFilledChange(allFilled); // Notify parent component

        // Check if all required inputs are valid
        const allValid = formInputs.every((input) => {
            const value = answers[input.id] || '';
            return input.required ? validateInput(value, input.regex) : true;
        });

        onFormChange(answers);
        onValidationChange(allValid);
    }, [answers, formInputs, onValidationChange, onFormChange, onRequiredFilledChange]);

    const handleChange = (id: number, value: string, regex: string | null, required: boolean) => {
        const hashedValue = regex ? hashInput(value) : value;

        let isValid = true;
        let errorMessage = null;

        // Check required field
        if (required && (!value || value.trim() === "")) {
            isValid = false;
            errorMessage = "This field is required.";
        } else if (regex && !validateInput(hashedValue, regex)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            isValid = false;
            errorMessage = `Invalid format:${hashedValue}`;
        }

        setAnswers((prev) => ({ ...prev, [id]: hashedValue }));
        setErrors((prev) => ({ ...prev, [id]: errorMessage }));
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
                            formInputs.map((input: FormInput) => (
                                <div className="col-md-12" key={input.id}>
                                    <label htmlFor={`input-${input.id}`} className="form-label d-flex justify-content-start">
                                        <b>{input.required && <span className="red-star">*</span>} {input.fieldName}</b>
                                    </label>
                                    {(input.type === "2" || input.type === "oneAns") ? (
                                        // Radio button handling
                                        <div className="form-check d-flex justify-content-start">
                                            {input.options && input.options.length > 0 ? (
                                                <>
                                                    <input
                                                        className="form-check-input mr-2"
                                                        type="radio"
                                                        id={`input-${input.id}`}
                                                        checked={answers[input.id] === input.options[0].optionText}
                                                        onChange={() => input.options && handleChange(input.id, input.options[0].optionText, input.regex, input.required)}
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
                                        // Other input fields
                                        <>
                                            <input
                                                type={input.type}
                                                className="form-control custom-input"
                                                id={`input-${input.id}`}
                                                placeholder="Điền câu trả lời của bạn"
                                                value={answers[input.id] || ''}
                                                onChange={(e) => handleChange(input.id, e.target.value, input.regex, input.required)}
                                                required={input.required}
                                            />
                                            {errors[input.id] && <div className="text-danger text-start mt-1">{errors[input.id]}</div>}
                                        </>
                                    )}
                                    {(input.type === "2" || input.type === "oneAns") ? (
                                        // Radio button
                                        <div className="form-check d-flex justify-content-start">
                                            {input.options && input.options.length > 0 ? (
                                                <>
                                                    <input
                                                        className="form-check-input mr-2"
                                                        type="radio"
                                                        id={`input-${input.id}`}
                                                        checked={answers[input.id] === input.options[0].optionText}
                                                        onChange={() =>
                                                            input.options && handleChange(input.id, input.options[0].optionText, input.regex, input.required)
                                                        }
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
                                    ) : input.type === "multiAns" || input.type === "4" ? (
                                        // Checkbox: nhiều lựa chọn
                                        <>
                                            {input.options && input.options.length > 0 ? (
                                                input.options.map((opt, optIdx) => (
                                                    <div className="form-check" key={optIdx}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`input-${input.id}-${optIdx}`}
                                                            checked={
                                                                answers[input.id]?.split(';').includes(opt.optionText) ?? false
                                                            }
                                                            onChange={(e) => {
                                                                const current = answers[input.id]?.split(';') || [];
                                                                const updated = e.target.checked
                                                                    ? [...current, opt.optionText]
                                                                    : current.filter(item => item !== opt.optionText);
                                                                handleChange(input.id, updated.join(';'), input.regex, input.required);
                                                            }}
                                                        />
                                                        <label className="form-check-label" htmlFor={`input-${input.id}-${optIdx}`}>
                                                            {opt.optionText}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <span>Không có lựa chọn</span>
                                            )}
                                            {errors[input.id] && <div className="text-danger text-start mt-1">{errors[input.id]}</div>}
                                        </>
                                    ) : (
                                        // Default: text/email/phone input
                                        <>
                                            <input
                                                type={input.type}
                                                className="form-control custom-input"
                                                id={`input-${input.id}`}
                                                placeholder="Điền câu trả lời của bạn"
                                                value={answers[input.id] || ''}
                                                onChange={(e) => handleChange(input.id, e.target.value, input.regex, input.required)}
                                                required={input.required}
                                            />
                                            {errors[input.id] && <div className="text-danger text-start mt-1">{errors[input.id]}</div>}
                                        </>
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
    );
}
