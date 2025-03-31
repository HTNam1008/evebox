'use client';

/* Package System */
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CirclePlus, Equal, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";
import { useState } from "react";

/* Package Application */
import InputCountField from "../../common/form/inputCountField";
import MultipleAnswer from "../../common/form/multipleAns";
import OneAnswer from "../../common/form/oneAns";
import { handleOneAddOption, handleOneDelete, toggleOneChecked } from "../../../libs/functions/question/oneAnswer";
import { handleAddOption, handleDelete, toggleChecked } from "../../../libs/functions/question/multipleAnswer";
import GroupRadioButton from "./groupRadioButton";
import GroupRadioOption from "./groupRadioOption";
import { FormInput } from "../../../libs/interface/question.interface";

export default function CreateNewForm({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [eventScopeSelected, setEventScopeSelected] = useState("all");
    const [quesText, setQuesText] = useState("quesText");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [isExpanded, setIsExpanded] = useState(true);
    const [questions, setQuestions] = useState<FormInput[]>([
        {
            id: 1, 
            fieldName: "Họ và tên",
            type: "text",
            required: true,
            regex: null,
            options: [],
        }
    ]);
    

    // One Answer
    const [oneTexts, setOneTexts] = useState<string[]>(["", "", ""]);
    const [oneCheckedItems, setOneCheckedItems] = useState<boolean[]>([false, false, false]); // Trạng thái checked của mỗi input

    // Multiple Answer
    const [texts, setTexts] = useState<string[]>(["", "", ""]);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false]); // Trạng thái checked của mỗi input

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;
        if (field === "name") setName(value);
        if (field === "des") setDes(value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleDeleteQuestion = (id: number) => {
        setQuestions(questions.filter((question) => question.id !== id));
    };

    const handleAddQuestion = () => {
        const newQuestion: FormInput = {
            id: questions.length + 1, 
            fieldName: "Câu hỏi mới",
            type: "2",
            required: true,
            regex: null,
            options: [{ optionText: "Có" }],
        };
    
        setQuestions([...questions, newQuestion]); // Cập nhật state
    };
    

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
                <div className="text-white dialog-header px-6 py-2 pb-4  justify-center items-center flex relative" style={{ background: '#0C4762' }}>
                    <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">Tạo form mới</DialogTitle>
                    <button onClick={onClose} className="absolute right-2 top-2 px-1 py-1 close-btn">
                        <Icon icon="ic:baseline-close" width="20" height="20" />
                    </button>
                </div>

                <DialogContent sx={{ overflowY: "auto", maxHeight: "90vh" }}>
                    <div className="content mx-4">
                        <GroupRadioOption eventScopeSelected={eventScopeSelected} setEventScopeSelected={setEventScopeSelected} />
                        {questions.length > 0 &&
                            questions.map((question) => (
                                <div key={question.id} className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-3" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                                    <div className="flex items-center justify-between w-full">
                                        <Equal className="text-[#51DACF]" onClick={() => setIsExpanded((prev) => !prev)} />

                                        <div className="ml-2">
                                            <div className="relative flex items-center space-x-2">
                                                <label className="text-base font-bold"> Câu {question.id} </label>
                                            </div>

                                            {quesText === "quesText" && <span>Câu hỏi dạng văn bản</span>}
                                            {quesText === "oneAns" && <span>Câu hỏi một lựa chọn</span>}
                                            {quesText === "multAns" && <span>Câu hỏi nhiều lựa chọn</span>}

                                        </div>

                                        <Trash2 className="ml-auto p-2 bg-red-500 text-white rounded w-8 h-8 cursor-pointer" 
                                                onClick={() => handleDeleteQuestion(question.id)}/>
                                    </div>

                                    {isExpanded && (<>
                                        {/* Input Question */}
                                        <div className="flex flex-wrap items-center -mx-3 mt-4">
                                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                                                <label className="block text-sm font-bold mb-2 text-right">
                                                    <span className="text-red-500">* </span> Câu hỏi
                                                </label>
                                            </div>

                                            <div className="w-full md:w-5/6 px-3 mb-6 md:mb-0">
                                                <InputCountField
                                                    label="" placeholder="Họ và tên" value={name}
                                                    onChange={(e) => handleInputChange(e, "name")}
                                                    error={errors.name} maxLength={100}
                                                />
                                            </div>
                                        </div>

                                        {/* Description of Question */}
                                        <div className="flex flex-wrap items-center -mx-3 mt-4">
                                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                                                <label className="block text-sm font-bold mb-2 text-right"> Mô tả </label>
                                            </div>

                                            <div className="w-full md:w-5/6 px-3 mb-6 md:mb-0">
                                                <InputCountField
                                                    label="" placeholder="Mô tả" value={des}
                                                    onChange={(e) => handleInputChange(e, "des")} maxLength={250}
                                                />
                                            </div>

                                            <div className="w-full ml-4 mr-4">
                                                <GroupRadioButton quesText={quesText} setQuesText={setQuesText} />

                                                {quesText === "oneAns" && (<div className="border border-gray-400 p-4 rounded bg-white w-full mt-4">
                                                    {oneTexts.map((text, index) => (
                                                        <OneAnswer
                                                            key={index} value={text}
                                                            checked={oneCheckedItems[index]} // Truyền trạng thái checked xuống component con
                                                            onChange={(newValue) => {
                                                                const newTexts = [...oneTexts];
                                                                newTexts[index] = newValue;
                                                                setOneTexts(newTexts);
                                                            }}
                                                            onToggle={() => toggleOneChecked(index, oneCheckedItems, setOneCheckedItems)} // Hàm xử lý chọn/bỏ chọn
                                                            onDelete={() => handleOneDelete(index, setOneTexts, setOneCheckedItems, oneTexts, oneCheckedItems)}
                                                        />
                                                    ))}

                                                    <div className="ml-2">
                                                        <button type="button" className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                                                            onClick={() => handleOneAddOption(setOneTexts, setOneCheckedItems, oneTexts, oneCheckedItems)}
                                                        >
                                                            <CirclePlus size={20} /> Thêm tùy chọn
                                                        </button>
                                                    </div>
                                                </div>
                                                )}

                                                {quesText === "multAns" && (<div className="border border-gray-400 p-4 rounded bg-white w-full mt-4">
                                                    {texts.map((text, index) => (
                                                        <MultipleAnswer
                                                            key={index} value={text}
                                                            checked={checkedItems[index]} // Truyền trạng thái checked xuống component con
                                                            onChange={(newValue) => {
                                                                const newTexts = [...texts];
                                                                newTexts[index] = newValue;
                                                                setTexts(newTexts);
                                                            }}
                                                            onToggle={() => toggleChecked(index, checkedItems, setCheckedItems)} // Hàm xử lý chọn/bỏ chọn
                                                            onDelete={() => handleDelete(index, setTexts, setCheckedItems, texts, checkedItems)}
                                                        />
                                                    ))}

                                                    <div className="ml-2">
                                                        <button type="button" className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                                                            onClick={() => handleAddOption(setTexts, setCheckedItems, texts, checkedItems)}
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
                                    </>)}
                                </div>
                            )
                            )
                        }

                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="flex justify-center mb-6">
                            <button type="button" className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                                    onClick={handleAddQuestion}>
                                <CirclePlus size={20} /> Tạo câu hỏi
                            </button>
                        </div>

                        <div className="flex justify-center gap-10 mt-4 mb-6">
                            <button onClick={onClose} className="w-60 border-2 border-gray-500 text-gray-500 font-bold py-2 px-4 rounded bg-white hover:bg-gray-500 hover:text-white transition-all">
                                Hủy
                            </button>

                            <button className="w-60 border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all">
                                Lưu
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}