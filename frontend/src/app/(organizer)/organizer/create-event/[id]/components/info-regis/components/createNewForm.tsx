'use client';

/* Package System */
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CirclePlus, Equal, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";
import { useState, ChangeEvent } from "react";

/* Package Application */
import InputCountField from "../../common/form/inputCountField";
import MultipleAnswer from "../../common/form/multipleAns";
import OneAnswer from "../../common/form/oneAns";
import { handleOneAddOption, handleOneDelete, toggleOneChecked } from "../../../libs/functions/question/oneAnswer";
import { handleAddOption, handleDelete, toggleChecked } from "../../../libs/functions/question/multipleAnswer";
import GroupRadioButton from "./groupRadioButton";
import GroupRadioOption from "./groupRadioOption";
import { FormInput } from "../../../libs/interface/question.interface";
import { Form } from "../../../libs/interface/question.interface";

export default function CreateNewForm({ newForms, setNewForms, open, onClose }: { newForms: Form[], setNewForms: (forms: Form[]) => void, open: boolean; onClose: () => void }) {
    const [newForm, setNewForm] = useState<Form>(
        {
            id: 1, //Tạm gán cứng
            name: "New Form",
            createdBy: null, //Khi imple sẽ để tên người tạo
            FormInput: [
                {
                    id: 1, //Tạm thời gán cứng sau này sẽ lấy từ db để tạo id 
                    fieldName: "Họ và tên",
                    type: "text",
                    required: true,
                    regex: null,
                    options: [],
                }
            ]
        }
    )

    const [questions, setQuestions] = useState<FormInput[]>(newForm.FormInput); // Lấy câu hỏi từ form

    const [eventScopeSelected, setEventScopeSelected] = useState("all");
    const [quesText, setQuesText] = useState("quesText");
    const [errors,] = useState<{ [key: string]: boolean }>({});
    const [expandedQuestions, setExpandedQuestions] = useState<{ [key: number]: boolean }>({
        1: true, 
    });
    

    const toggleExpand = (id: number) => {
        setExpandedQuestions((prev) => ({
            ...prev,
            [id]: !prev[id], 
        }));
    };

    // One Answer
    const [oneTexts, setOneTexts] = useState<string[]>(["", "", ""]);
    const [oneCheckedItems, setOneCheckedItems] = useState<boolean[]>([false, false, false]); // Trạng thái checked của mỗi input

    // Multiple Answer
    const [texts, setTexts] = useState<string[]>(["", "", ""]);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false]); // Trạng thái checked của mỗi input

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number, field: string) => {
        const value = e.target.value;

        setQuestions((prevQuestions) =>
            prevQuestions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
        );

        setNewForm((prevForm) => ({
            ...prevForm,
            FormInput: prevForm.FormInput.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
        }));
    };

    const handleDeleteQuestion = (id: number) => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));

        setNewForm((prevForm) => ({
            ...prevForm,
            FormInput: prevForm.FormInput.filter((q) => q.id !== id),
        }));
    };

    // const [checkedStates, setCheckedStates] = useState<{ [key: number]: boolean }>({});
    const handleAddQuestion = () => {
        const newQuestion: FormInput = {
            id: questions.length + 1, // Tạo id động
            fieldName: `Câu hỏi ${questions.length + 1}`,
            type: "text",
            required: false,
            regex: null,
            options: [],
        };

        setQuestions([...questions, newQuestion]);

        setNewForm((prevForm) => ({
            ...prevForm,
            FormInput: [...prevForm.FormInput, newQuestion], // Thêm câu hỏi mới vào FormInput
        }));
    };

    // Hàm thêm newForm vào newForms
    const handleSaveForm = () => {
        setNewForms([...newForms, newForm]); // Cập nhật danh sách newForms
        onClose(); // Đóng modal sau khi thêm
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
                                        <Equal className="text-[#51DACF]" onClick={() => toggleExpand(question.id)} />

                                        <div className="ml-2">
                                            <div className="relative flex items-center space-x-2">
                                                <label className="text-base font-bold"> Câu {question.id} </label>
                                            </div>

                                            {quesText === "quesText" && <span>Câu hỏi dạng văn bản</span>}
                                            {quesText === "oneAns" && <span>Câu hỏi một lựa chọn</span>}
                                            {quesText === "multAns" && <span>Câu hỏi nhiều lựa chọn</span>}

                                        </div>

                                        <Trash2 className="ml-auto p-2 bg-red-500 text-white rounded w-8 h-8 cursor-pointer"
                                            onClick={() => handleDeleteQuestion(question.id)} />
                                    </div>

                                    {expandedQuestions[question.id] && (<>
                                        {/* Input Question */}
                                        <div className="flex flex-wrap items-center -mx-3 mt-4">
                                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                                                <label className="block text-sm font-bold mb-2 text-right">
                                                    <span className="text-red-500">* </span> Câu hỏi
                                                </label>
                                            </div>

                                            <div className="w-full md:w-5/6 px-3 mb-6 md:mb-0">
                                                <InputCountField
                                                    label="" placeholder={question.fieldName} value={question.fieldName}
                                                    onChange={(e) => handleInputChange(e, question.id, "fieldName")}
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
                                                    label="" placeholder="Mô tả" value={question.regex || ""}
                                                    onChange={(e) => handleInputChange(e, question.id, "regex")} maxLength={250}
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

                            <button  onClick={handleSaveForm} className="w-60 border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all">
                                Lưu
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}