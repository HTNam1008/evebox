"use client";

/* Package System */
import { ChevronDown, ChevronUp, CirclePlus, PencilLine, Ticket, Trash2 } from "lucide-react";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

/* Package Application */
import DateTimePicker from "../../common/form/dateTimePicker";
import CreateTypeTicketDailog from "./dialogs/createTicketsDailog";
import EditTicketDailog from "./dialogs/editTicketDailog";
import { TicketProps } from "../../../libs/interface/dialog.interface";
import ConfirmDeleteTicketDialog from "./dialogs/confirmDeleteTicket";

export default function FormTimeTypeTicketClient({ onNextStep, btnValidate2 }: { onNextStep: () => void, btnValidate2: string }) {
    const [month, setMonth] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const months = ["Tất cả", "Tháng 1", "Tháng 2", "Tháng 3"];
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    //Lưu danh sách vé
    const [ticketList, setTicketList] = useState<TicketProps[]>([]);

    //Cập nhật danh sách vé sau khi tạo
    const addTicket = (ticket: TicketProps) => {
        setTicketList([...ticketList, ticket]);
    }

    //Chỉnh sửa vé đã tạo
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const updateTicket = (updatedTicket: TicketProps) => {
        if (editIndex !== null) {
            const updatedList = [...ticketList];
            updatedList[editIndex] = updatedTicket;
            setTicketList(updatedList);
            setEditIndex(null); // Reset index sau khi cập nhật
        }
    };

    //Xóa vé
    const handleDeleteTicket = (index: number) => {
        const updatedTickets = ticketList.filter((_, i) => i !== index);
        setTicketList(updatedTickets);
    };


    const validateStartDate = (date: Date | null) => {
        return !date || !endDate || date <= endDate; // Thời gian bắt đầu không được lớn hơn thời gian kết thúc
    };

    const validateEndDate = (date: Date | null) => {
        return !date || !startDate || date >= startDate; // Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu
    };

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

    const handleSubmit = () => {
        if (event) event.preventDefault();

        if (!month || !startDate || !endDate) {
            setErrors({
                month: !month,
                startDate: !startDate,
                endDate: !endDate,
            });
            toast.error("Vui lòng chọn đầy đủ thông tin!");
            return;
        }

        // Nếu nút là "Save"
        if (btnValidate2 === "Save") {
            alert("Form hợp lệ!");
        }
        // Nếu nút là "Continue"
        else if (btnValidate2 === "Continue") {
            alert("Form hợp lệ! Chuyển sang bước tiếp theo...");
            onNextStep();
        }
    };

    return (
        <>
            <Toaster position="top-center" />

            <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit} id="ticket-form">
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

                <div className="p-4 lg:p-4 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-4"
                    style={{
                        backgroundColor: "rgba(158, 245, 207, 0.2)",
                        border: ticketList.length === 0 ? "1px solid red" : "1.5px solid #9EF5CF"
                    }}>
                    <div className="relative flex items-center mb-4">
                        {isExpanded ? (
                            <>
                                <ChevronUp size={20} className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} />
                                <label className="text-base font-medium ml-2">Ngày sự kiện</label>
                            </>
                        ) : (
                            <>
                                <ChevronDown size={20} className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} />
                                <div>
                                    <label className={`text-base font-medium ml-2 ${ticketList.length === 0 ? "text-red-500" : "text-black"}`}>
                                        {startDate ? `${startDate.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })} - ${startDate.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`
                                            : "Vui lòng chọn thông tin xuất diễn"}
                                    </label>
                                    <br />
                                    {ticketList.length === 0 ? (
                                        startDate && <span className="text-sm ml-2">Vui lòng tạo ít nhất một loại vé</span>
                                    ) : (
                                        <span className="text-sm ml-2">{ticketList.length} Loại vé</span>
                                    )}

                                </div>
                            </>
                        )}
                    </div>

                    {isExpanded && (<>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            {/* Thời gian bắt đầu */}
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <DateTimePicker
                                    label="Thời gian bắt đầu"
                                    selectedDate={startDate}
                                    setSelectedDate={setStartDate}
                                    popperPlacement="bottom-end"
                                    validateDate={validateStartDate}
                                />
                            </div>

                            {/* Thời gian kết thúc */}
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <DateTimePicker
                                    label="Thời gian kết thúc"
                                    selectedDate={endDate}
                                    setSelectedDate={setEndDate}
                                    popperPlacement="bottom-start"
                                    validateDate={validateEndDate}
                                />
                            </div>
                        </div>

                        <label className="block text-base font-medium mb-2">
                            <span className="text-red-500">* </span>Loại vé
                        </label>

                        {/* Hiển thị các loại vé đã tạo */}
                        <div className="type_ticket ">
                            {ticketList.map((ticket, index) => (
                                <div key={index} className="flex items-center justify-between gap-2 p-4 lg:p-6 h-14 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-4" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                                    <Ticket size={20} />

                                    <span>{ticket.name}</span>

                                    <div className="ml-auto flex items-center gap-2">
                                        <PencilLine className="p-2 bg-white text-black rounded w-8 h-8 cursor-pointer"
                                            onClick={() => {
                                                setEditIndex(index);  // Lưu index của vé cần chỉnh sửa
                                                setShowEditDialog(true);  // Mở edt dialog
                                            }}
                                        />

                                        {showEditDialog && editIndex !== null &&
                                            <EditTicketDailog
                                                open={showEditDialog}
                                                onClose={() =>
                                                    setShowEditDialog(false)}
                                                endDateEvent={endDate}
                                                ticket={ticketList[editIndex]}
                                                updateTicket={updateTicket}
                                            />}

                                        <Trash2 className="p-2 bg-red-500 text-white rounded w-8 h-8 cursor-pointer"
                                            onClick={() => {
                                                setSelectedTicketIndex(index); // Cập nhật index vé cần xóa
                                                setShowConfirmDeleteDialog(true);
                                            }}
                                        />

                                        {showConfirmDeleteDialog && selectedTicketIndex !== null &&
                                            (<ConfirmDeleteTicketDialog
                                                open={showConfirmDeleteDialog}
                                                onClose={() =>
                                                    setShowConfirmDeleteDialog(false)}
                                                onConfirm={() => {
                                                    handleDeleteTicket(selectedTicketIndex);
                                                    setShowConfirmDeleteDialog(false);
                                                }}
                                            />)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-4">
                            <button type="button" className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                                onClick={() => {
                                    if (validateTimeSelection()) {
                                        setShowDialog(true);
                                    }
                                }}>
                                <CirclePlus size={20} /> Tạo loại vé mới
                            </button>

                            {showDialog &&
                                <CreateTypeTicketDailog
                                    open={showDialog}
                                    onClose={() =>
                                        setShowDialog(false)}
                                    startDate={startDate}
                                    endDate={endDate}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                    addTicket={addTicket}
                                />}
                        </div>
                    </>)}
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                    >
                        <CirclePlus size={20} /> Tạo suất diễn
                    </button>
                </div>
            </form >
        </>
    );
}
