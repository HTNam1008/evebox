"use client";

/* Package System */
import { useState } from "react";

/* Package Application */
import FilterForm from "./filterForm";
import CreateNewForm from "./createNewForm";
import FormList from "./formTemplate/formList";
import { Form } from "../../../libs/interface/question.interface";

export default function FormQuestionClient({ onNextStep, btnValidate4 }: { onNextStep: () => void, btnValidate4: string }) {
    const [selectedCategory, setSelectedCategory] = useState("sample");
    const [isCreateNewOpen, setIsCreateNewOpen] = useState(false);

    //Dữ liệu cứng test form mẫu
    const sampleForms: Form[] = [
        {
            id: 12608,
            name: "Information Form",
            createdBy: null,
            FormInput: [
                { id: 104, fieldName: "Your name", type: "text", required: true, regex: null, options: null },
                { id: 105, fieldName: "Your address", type: "text", required: false, regex: null, options: null },
                { id: 106, fieldName: "Your email", type: "email", required: true, regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", options: null },
                { id: 107, fieldName: "Your phone", type: "phone", required: true, regex: "^0\\d{9,10}$", options: null }
            ]
        }
    ]

    //Dữ liệu cứng test form đã tạo
    const createdForms: Form[] = [
        {
            id: 12472,
            name: "23742-form",
            createdBy: null,
            FormInput: [
                { id: 99, fieldName: "Tôi đồng ý Ticketbox & Ban Tổ Chức sử dụng thông tin đặt vé nhằm mục đích vận hành sự kiện", type: "2", required: true, regex: null, options: [{ optionText: "Có" }] },
                { id: 100, fieldName: "Email của bạn?", type: "1", required: true, regex: null, options: [] },
                { id: 101, fieldName: "Số điện thoại của bạn?", type: "1", required: true, regex: null, options: [] },
                { id: 102, fieldName: "Họ và tên của bạn ?", type: "1", required: true, regex: null, options: [] },
                { id: 103, fieldName: "Giới tính của bạn ?", type: "3", required: true, regex: null, options: [{ optionText: "Nam" }, { optionText: "Nữ" }] }
            ]
        }
    ]

    const forms = selectedCategory === "sample" ? sampleForms : createdForms;
    const [selectedForms, setSelectedForms] = useState<number | null>(null);

    const handleSelectForm = (formId: number) => {
        setSelectedForms((prevSelected) => (prevSelected === formId ? null : formId));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: boolean } = {};

        if (Object.keys(newErrors).length === 0) {
            // Nếu nút là "Save"
            if (btnValidate4 === "Save") {
                alert("Form hợp lệ!");
            }
            // Nếu nút là "Continue"
            else if (btnValidate4 === "Continue") {
                alert("Form hợp lệ! Chuyển sang bước tiếp theo...");
                onNextStep();
            }
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center w-full mb-6">
                <div className="w-full max-w-4xl mx-auto flex items-center justify-between h-full mb-4">
                    <FilterForm selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

                    <button className="w-40 text-sm border-2 border-[#2DC275] text-white font-bold py-2 px-4 rounded bg-[#2DC275] hover:bg-[#7DF7B8] hover:border-[#7DF7B8] hover:text-green-600 transition-all"
                        onClick={() => setIsCreateNewOpen(true)}>
                        Tạo form mới
                    </button>
                </div>


                <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit} id="ques-form">
                    {isCreateNewOpen && 
                        <CreateNewForm open={isCreateNewOpen} onClose={() => setIsCreateNewOpen(false)}/>}

                    <FormList forms={forms} selectedForms={selectedForms} handleSelectForm={handleSelectForm} />
                </form >
            </div >
        </>
    )
}