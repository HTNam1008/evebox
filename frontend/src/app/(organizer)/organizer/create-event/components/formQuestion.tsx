"use client";

/* Package System */
import { useState } from "react";
import { CirclePlus } from "lucide-react";

/* Package Application */
import RadioOption from "./common/form/radioOption";

export default function FormQuestionClient() {
    // const [eventName, setEventName] = useState("name-of-event");
    const [eventScopeSelected, setEventScopeSelected] = useState("all");
    // const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    //     const value = e.target.value;
    //     if (field === "eventName") setEventName(value);

    //     if (errors[field]) {
    //         setErrors((prev) => ({ ...prev, [field]: false }));
    //     }
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: boolean } = {};

        // if (!eventName.trim()) newErrors.eventName = true;

        // setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Form hợp lệ! Gửi dữ liệu...");
        }
    };


    return (
        <>
            <div className="flex justify-center w-full">
                <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
                    <div className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-3" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                        <div className="relative flex items-center space-x-2">
                            <label className="text-base font-bold">
                                Phạm vi áp dụng
                            </label>
                        </div>

                        <RadioOption
                            value="all"
                            selectedValue={eventScopeSelected}
                            onChange={setEventScopeSelected}
                            icon=""
                            title="Cho cả đơn hàng"
                            description="Người mua vé sẽ chỉ cần trả lời tất cả câu hỏi 1 lần duy nhất với mỗi đơn hàng"
                        />

                        <RadioOption
                            value="ticket"
                            selectedValue={eventScopeSelected}
                            onChange={setEventScopeSelected}
                            icon=""
                            title="Cho từng vé"
                            description="Người mua vé sẽ cần trả lời tất cả câu hỏi với số lần tương ứng với số vé trong đơn hàng"
                        />
                    </div>

                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                        >
                            <CirclePlus size={20} /> Tạo câu hỏi
                        </button>
                    </div>

                    <div className="flex justify-center mt-4 mb-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition"
                        >
                            Nộp
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}