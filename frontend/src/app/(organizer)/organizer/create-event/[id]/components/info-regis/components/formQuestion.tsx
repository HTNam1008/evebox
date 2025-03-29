"use client";

/* Package System */
import { useState } from "react";

/* Package Application */
import FilterForm from "./filterForm";
import CreateNewForm from "./createNewForm";

export default function FormQuestionClient({ onNextStep, btnValidate4 }: { onNextStep: () => void, btnValidate4: string }) {
    const [isCreateNewForm, setIsCreateNewForm] = useState(false);

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
                    <FilterForm />

                    <button className="w-40 text-sm border-2 border-[#2DC275] text-white font-bold py-2 px-4 rounded bg-[#2DC275] hover:bg-[#7DF7B8] hover:border-[#7DF7B8] hover:text-green-600 transition-all"
                            onClick={() => setIsCreateNewForm(true)}>
                        Tạo form mới
                    </button>
                </div>


                <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit} id="ques-form">
                    {isCreateNewForm && <CreateNewForm />}
                </form>
            </div>
        </>
    )
}