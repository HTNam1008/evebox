"use client";

/* Package System */
import { ChevronDown, ChevronUp, CirclePlus } from "lucide-react";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

/* Package Application */
import DateTimePicker from "../common/form/dateTimePicker";
import CreateTypeTicketDailog from "../dialogs/createTicketsDailog";

export default function FormTimeTypeTicketClient() {
    const [month, setMonth] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const months = ["Tất cả", "Tháng 1", "Tháng 2", "Tháng 3"];
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        const value = e.target.value;
        if (field === "month") setMonth(value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const validateTimeSelection = () => {
        if (!startDate || !endDate) {
            setErrors((prev) => ({
                ...prev,
                startDate: !startDate,
                endDate: !endDate,
            }));
            toast.error("Vui lòng chọn thời gian bắt đầu và kết thúc");
            return false;
        }
        return true;
    };


    const handleSubmit = async () => {
        if (!month || !startDate || !endDate) {
            setErrors({
                month: !month,
                startDate: !startDate,
                endDate: !endDate,
            });
            return;
        }

        // Gửi dữ liệu lên Server Action
        const response = await fetch("/api/save-time", {
            method: "POST",
            body: JSON.stringify({ month, startDate, endDate }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            alert("Dữ liệu đã được lưu!");
        } else {
            alert("Lỗi khi lưu dữ liệu.");
        }
    };

    return (
        <>
            <Toaster position="top-center" />

            <form className="w-full max-w-4xl mx-auto">
                <div className="relative flex items-center">
                    <label className="text-xl font-bold mr-4">Thời gian</label>
                    <div className="relative ml-auto">
                        <select
                            className={`text-base block appearance-none w-40 border py-3 px-4 pr-8 rounded leading-tight focus:outline-black-400 
                                    ${month === "" ? "text-gray-400" : "text-black"}`}
                            value={month}
                            onChange={(e) => handleSelectChange(e, "month")}
                        >
                            <option value="" disabled hidden>Chọn tháng</option>
                            {months.map((item, index) => (
                                <option value={item} key={index} className="text-black">
                                    {item}
                                </option>
                            ))}
                        </select>
                        <div className="text-gray-400 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <ChevronDown size={20} />
                        </div>
                    </div>
                </div>

                <div className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-4" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                    <div className="relative flex items-center mb-4">
                        <ChevronUp size={20} />
                        <label className="text-lg font-medium ml-2">Ngày sự kiện</label>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        {/* Thời gian bắt đầu */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <DateTimePicker
                                label="Thời gian bắt đầu"
                                selectedDate={startDate}
                                setSelectedDate={setStartDate}
                                popperPlacement="bottom-end"
                            />
                        </div>

                        {/* Thời gian kết thúc */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <DateTimePicker
                                label="Thời gian kết thúc"
                                selectedDate={endDate}
                                setSelectedDate={setEndDate}
                                popperPlacement="bottom-start"
                            />
                        </div>
                    </div>

                    <label className="block text-lg font-medium mb-2">
                        <span className="text-red-500">* </span>Loại vé
                    </label>

                    <div className="flex justify-center">
                        <button type="button" className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                        onClick={() => {
                            if (validateTimeSelection()) {
                                setShowDialog(true);
                            }
                        }}>
                            <CirclePlus size={20} /> Tạo loại vé mới
                        </button>

                        {showDialog && <CreateTypeTicketDailog open={showDialog} onClose={() => setShowDialog(false)} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>}
                    </div>

                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                    >
                        <CirclePlus size={20} /> Tạo suất diễn
                    </button>                    
                </div>


                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
                    >
                        Lưu thông tin
                    </button>
                </div>
            </form>
        </>
    );
}
