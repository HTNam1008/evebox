"use client";

/* Package System */
import { useState } from "react";
import { CirclePlus, Equal, Trash2 } from "lucide-react";

/* Package Application */
import RadioOption from "./common/form/radioOption";
import InputCountField from "./common/form/inputCountField";
import CustomRadioButton from "./common/form/customRadioButton";
import MultipleAnswer from "./common/form/multipleAns";
import OneAnswer from "./common/form/oneAns";

export default function FormQuestionClient() {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [eventScopeSelected, setEventScopeSelected] = useState("all");
    const [quesText, setQuesText] = useState("quesText");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    // One Answer
    const [oneTexts, setOneTexts] = useState<string[]>([""]);
    const [oneCheckedItems, setOneCheckedItems] = useState<boolean[]>([false]); // Trạng thái checked của mỗi input

    const handleOneAddOption = () => {
        setOneTexts([...oneTexts, ""]);
        setOneCheckedItems([...oneCheckedItems, false]); // Thêm trạng thái checked mới
    };
    
    const handleOneDelete = (index: number) => {
        setOneTexts(oneTexts.filter((_, i) => i !== index));
        setOneCheckedItems(oneCheckedItems.filter((_, i) => i !== index)); // Xóa trạng thái checked tương ứng
    };

    const toggleOneChecked = (index: number) => {
        const newChecked = [...oneCheckedItems];
        newChecked[index] = !newChecked[index]; // Đảo trạng thái checked
        setOneCheckedItems(newChecked);
    };

    // Multiple Answer
    const [texts, setTexts] = useState<string[]>([""]);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false]); // Trạng thái checked của mỗi input

    const handleAddOption = () => {
        setTexts([...texts, ""]);
        setCheckedItems([...checkedItems, false]); // Thêm trạng thái checked mới
    };
    
    const handleDelete = (index: number) => {
        setTexts(texts.filter((_, i) => i !== index));
        setCheckedItems(checkedItems.filter((_, i) => i !== index)); // Xóa trạng thái checked tương ứng
    };

    const toggleChecked = (index: number) => {
        const newChecked = [...checkedItems];
        newChecked[index] = !newChecked[index]; // Đảo trạng thái checked
        setCheckedItems(newChecked);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;
        if (field === "name") setName(value);
        if (field === "des") setDes(value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: boolean } = {};

        if (Object.keys(newErrors).length === 0) {
            alert("Form hợp lệ! Gửi dữ liệu...");
        }
    };

    return (
        <>
            <div className="flex justify-center w-full">
                <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
                    <div className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
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

                    {/* Questions */}
                    <div className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-3" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                        <div className="flex items-center justify-between w-full">
                            <Equal className="text-[#51DACF]" />

                            <div className="ml-2">
                                <div className="relative flex items-center space-x-2">
                                    <label className="text-base font-bold">
                                        Câu 1
                                    </label>
                                </div>

                                <span>Câu hỏi dạng văn bản</span>
                            </div>

                            <Trash2 className="ml-auto p-2 bg-red-500 text-white rounded w-8 h-8 cursor-pointer" />
                        </div>

                        {/* Input Question */}
                        <div className="flex flex-wrap items-center -mx-3 mb-6 mt-4">
                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2 text-right">
                                    <span className="text-red-500">* </span> Câu hỏi
                                </label>
                            </div>

                            <div className="w-full md:w-5/6 px-3 mb-6 md:mb-0">
                                <InputCountField
                                    label=""
                                    placeholder="Họ và tên"
                                    value={name}
                                    onChange={(e) => handleInputChange(e, "name")}
                                    error={errors.name}
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        {/* Description of Question */}
                        <div className="flex flex-wrap items-center -mx-3 mb-6 mt-4">
                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2 text-right">
                                    Mô tả
                                </label>
                            </div>

                            <div className="w-full md:w-5/6 px-3 mb-6 md:mb-0">
                                <InputCountField
                                    label=""
                                    placeholder="Mô tả"
                                    value={des}
                                    onChange={(e) => handleInputChange(e, "des")}
                                    maxLength={250}
                                />
                            </div>

                            <div className="w-full ml-4 mr-4">
                                <div className="TypeOfQuestion flex justify-between items-center w-full mt-2 mb-2">
                                    <div className="flex-1 flex justify-start">
                                        <CustomRadioButton
                                            value="quesText"
                                            selectedValue={quesText}
                                            onChange={setQuesText}
                                            label="Thêm câu hỏi dạng văn bản"
                                        />
                                    </div>

                                    <div className="flex-1 flex justify-center">
                                        <CustomRadioButton
                                            value="oneAns"
                                            selectedValue={quesText}
                                            onChange={setQuesText}
                                            label="Thêm câu hỏi 'một câu trả lời'"
                                        />
                                    </div>

                                    <div className="flex-1 flex justify-end">
                                        <CustomRadioButton
                                            value="multAns"
                                            selectedValue={quesText}
                                            onChange={setQuesText}
                                            label="Thêm câu hỏi ‘nhiều câu trả lời’"
                                        />
                                    </div>
                                </div>

                                {quesText === "oneAns" && (<div className="border border-gray-400 p-4 rounded bg-white w-full mt-4">
                                    {oneTexts.map((text, index) => (
                                        <OneAnswer
                                            key={index}
                                            value={text}
                                            checked={oneCheckedItems[index]} // Truyền trạng thái checked xuống component con
                                            onChange={(newValue) => {
                                                const newTexts = [...oneTexts];
                                                newTexts[index] = newValue;
                                                setOneTexts(newTexts);
                                            }}
                                            onToggle={() => toggleOneChecked(index)} // Hàm xử lý chọn/bỏ chọn
                                            onDelete={() => handleOneDelete(index)}
                                        />
                                    ))}

                                    <div className="ml-2">
                                        <button
                                            type="button"
                                            className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                                            onClick={handleOneAddOption}
                                        >
                                            <CirclePlus size={20} /> Thêm tùy chọn
                                        </button>
                                    </div>
                                </div>
                                )}

                                {quesText === "multAns" && (<div className="border border-gray-400 p-4 rounded bg-white w-full mt-4">
                                    {texts.map((text, index) => (
                                        <MultipleAnswer
                                            key={index}
                                            value={text}
                                            checked={checkedItems[index]} // Truyền trạng thái checked xuống component con
                                            onChange={(newValue) => {
                                                const newTexts = [...texts];
                                                newTexts[index] = newValue;
                                                setTexts(newTexts);
                                            }}
                                            onToggle={() => toggleChecked(index)} // Hàm xử lý chọn/bỏ chọn
                                            onDelete={() => handleDelete(index)}
                                        />
                                    ))}

                                    <div className="ml-2">
                                        <button
                                            type="button"
                                            className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                                            onClick={handleAddOption}
                                        >
                                            <CirclePlus size={20} /> Thêm tùy chọn
                                        </button>
                                    </div>
                                </div>
                                )}

                                <div className="flex justify-end mt-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 border border-black" />
                                        <span className="text-sm">Yêu cầu trả lời</span>
                                    </label>
                                </div>
                            </div>
                        </div>
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