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
import { Showtime } from "../../../libs/interface/idevent.interface";
import ConfirmDeleteTicketDialog from "./dialogs/confirmDeleteTicket";

export default function FormTimeTypeTicketClient({ onNextStep, btnValidate2 }: { onNextStep: () => void, btnValidate2: string }) {
    const [, setErrors] = useState<{ [key: string]: boolean }>({});

    //Tạo suất diễn
    const [showtimes, setShowtimes] = useState<Showtime[]>([
        {
            id: 1, startDate: null, endDate: null, tickets: [], isExpanded: true, showDialog: false,
            showEditDialog: false, showConfirmDeleteDialog: false
        }
    ]);

    //Filter month of showing
    const [selectedMonth, setSelectedMonth] = useState("");
    const filteredShowtimes = selectedMonth
        ? showtimes.filter((showtime) => {
            if (!showtime.startDate) return false;
            const showtimeMonth = new Date(showtime.startDate as Date).getMonth() + 1;
            return showtimeMonth === parseInt(selectedMonth);
        })
        : showtimes;

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value);
    };

    const toggleExpanded = (id: number) => {
        setShowtimes((prevShowtimes) =>
            prevShowtimes.map((showtime) =>
                showtime.id === id ? { ...showtime, isExpanded: !showtime.isExpanded } : showtime
            )
        );
    };

    const toggleDialog = (id: number) => {
        setShowtimes((prevShowtimes) =>
            prevShowtimes.map((showtime) =>
                showtime.id === id ? { ...showtime, showDialog: !showtime.showDialog } : showtime
            )
        );
    };

    const toggleEditDialog = (id: number) => {
        setShowtimes((prevShowtimes) =>
            prevShowtimes.map((showtime) =>
                showtime.id === id ? { ...showtime, showEditDialog: !showtime.showEditDialog } : showtime
            )
        );
    };

    const toggleDelDialog = (id: number) => {
        setShowtimes((prevShowtimes) =>
            prevShowtimes.map((showtime) =>
                showtime.id === id ? { ...showtime, showConfirmDeleteDialog: !showtime.showConfirmDeleteDialog } : showtime
            )
        );
    };

    const handleAddShowtime = () => {
        setShowtimes([...showtimes, {
            id: showtimes.length + 1, startDate: null, endDate: null, tickets: [],
            showEditDialog: false, showConfirmDeleteDialog: false
        }]);
    };

    //Cập nhật danh sách vé sau khi tạo
    const addTicket = (showtimeId: number, newTicket: TicketProps) => {
        setShowtimes((prevShowtimes) =>
            prevShowtimes.map((showtime) =>
                showtime.id === showtimeId
                    ? { ...showtime, tickets: [...showtime.tickets, newTicket] }
                    : showtime
            )
        );
    };


    //Chỉnh sửa vé đã tạo
    const [editShowtimeId, setEditShowtimeId] = useState<number | null>(null);
    const [editTicketIndex, setEditTicketIndex] = useState<number | null>(null);
    const updateTicket = (showtimeId: number, ticketIndex: number, updatedTicket: TicketProps) => {
        setShowtimes((prevShowtimes) =>
            prevShowtimes.map((showtime) =>
                showtime.id === showtimeId
                    ? {
                        ...showtime,
                        tickets: showtime.tickets.map((ticket, index) =>
                            index === ticketIndex ? updatedTicket : ticket
                        )
                    }
                    : showtime
            )
        );
        setEditShowtimeId(null);
        setEditTicketIndex(null);
    };

    //Xóa vé
    const [delShowtimeId, setDelShowtimeId] = useState<number | null>(null);
    const [delTicketIndex, setDelTicketIndex] = useState<number | null>(null);
    const handleDeleteTicket = (showtimeId: number, ticketIndex: number) => {
        setShowtimes((prevShowtimes) =>
            prevShowtimes.map((showtime) =>
                showtime.id === showtimeId
                    ? {
                        ...showtime,
                        tickets: showtime.tickets.filter((_, index) => index !== ticketIndex),
                        showConfirmDeleteDialog: false,
                        selectedTicketIndex: null
                    }
                    : showtime
            )
        );

        setDelShowtimeId(null);
        setDelTicketIndex(null);
    };

    const validateStartDate = (date: Date | null, endDate: Date | null) => {
        return !date || !endDate || date <= endDate; // Thời gian bắt đầu không được lớn hơn thời gian kết thúc
    };

    const validateEndDate = (date: Date | null, startDate: Date | null) => {
        return !date || !startDate || date >= startDate; // Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu
    };

    const validateTimeSelection = (startDate: Date | null, endDate: Date | null) => {
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

        const totalTickets = showtimes.reduce((count, showtime) => count + showtime.tickets.length, 0);

        if (totalTickets === 0) {
            toast.error("Vui lòng tạo ít nhất một loại vé trước khi tiếp tục!");
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
                                    ${selectedMonth === "" ? "text-gray-400" : "text-black"}`}
                            value={selectedMonth}
                            onChange={handleSelectChange}
                        >
                            <option value="">Tất cả tháng</option>
                            {Array.from(new Set(showtimes
                                .filter(show => show.startDate) // Lọc bỏ các startDate null
                                .map(show => new Date(show.startDate as Date).getMonth() + 1)
                            )).map((month) => (
                                <option key={month} value={month} className="text-black">
                                    Tháng {month}
                                </option>
                            ))}
                        </select>
                        <div className="text-gray-400 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <ChevronDown size={20} />
                        </div>
                    </div>
                </div>

                {filteredShowtimes.map((showtime, index) => (
                    <div key={showtime.id} className="p-4 lg:p-4 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-4"
                        style={{
                            backgroundColor: "rgba(158, 245, 207, 0.2)",
                            border: showtime.tickets.length === 0 ? "1px solid red" : "1.5px solid #9EF5CF"
                        }}>
                        <div className="relative flex items-center mb-4">
                            {showtime.isExpanded ? (
                                <>
                                    <ChevronUp size={20} className="cursor-pointer" onClick={() => toggleExpanded(showtime.id)} />
                                    <label className="text-base font-medium ml-2">Ngày sự kiện</label>
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={20} className="cursor-pointer" onClick={() => toggleExpanded(showtime.id)} />
                                    <div>
                                        <label className={`text-base font-medium ml-2 ${showtime.tickets.length === 0 ? "text-red-500" : "text-black"}`}>
                                            {showtime.startDate ? `${showtime.startDate.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })} - ${showtime.startDate.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`
                                                : "Vui lòng chọn thông tin xuất diễn"}
                                        </label>
                                        <br />
                                        {showtime.tickets.length === 0 ? (
                                            showtime.startDate && <span className="text-sm ml-2">Vui lòng tạo ít nhất một loại vé</span>
                                        ) : (
                                            <span className="text-sm ml-2">{showtime.tickets.length} Loại vé</span>
                                        )}

                                    </div>
                                </>
                            )}
                        </div>

                        {showtime.isExpanded && (<>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                {/* Thời gian bắt đầu */}
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <DateTimePicker
                                        label="Thời gian bắt đầu"
                                        selectedDate={showtime.startDate}
                                        setSelectedDate={(date) => {
                                            const updatedShowtimes = [...showtimes];
                                            updatedShowtimes[index].startDate = date;
                                            setShowtimes(updatedShowtimes);
                                        }}
                                        popperPlacement="bottom-end"
                                        validateDate={(date) => validateStartDate(date, showtime.endDate)}
                                    />
                                </div>

                                {/* Thời gian kết thúc */}
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <DateTimePicker
                                        label="Thời gian kết thúc"
                                        selectedDate={showtime.endDate}
                                        setSelectedDate={(date) => {
                                            const updatedShowtimes = [...showtimes];
                                            updatedShowtimes[index].endDate = date;
                                            setShowtimes(updatedShowtimes);
                                        }}
                                        popperPlacement="bottom-start"
                                        validateDate={(date) => validateEndDate(date, showtime.startDate)}
                                    />
                                </div>
                            </div>

                            <label className="block text-base font-medium mb-2">
                                <span className="text-red-500">* </span>Loại vé
                            </label>

                            {/* Hiển thị các loại vé đã tạo */}
                            <div className="type_ticket ">
                                {showtime.tickets.map((ticket, ticketIndex) => (
                                    <div key={ticketIndex} className="flex items-center justify-between gap-2 p-4 lg:p-6 h-14 rounded-lg shadow-sm w-full max-w-5xl mx-auto mt-4" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                                        <Ticket size={20} />

                                        <span>{ticket.name}</span>

                                        <div className="ml-auto flex items-center gap-2">
                                            <PencilLine className="p-2 bg-white text-black rounded w-8 h-8 cursor-pointer"
                                                onClick={() => {
                                                    setEditShowtimeId(showtime.id);
                                                    setEditTicketIndex(ticketIndex);
                                                    toggleEditDialog(showtime.id);
                                                }}

                                            />

                                            {showtime.showEditDialog && editShowtimeId === showtime.id && editTicketIndex !== null && (
                                                <EditTicketDailog
                                                    open={true}
                                                    onClose={() => setEditShowtimeId(null)}
                                                    endDateEvent={showtime.endDate}
                                                    ticket={showtime.tickets[editTicketIndex]}
                                                    updateTicket={(updatedTicket) => updateTicket(showtime.id, editTicketIndex, updatedTicket)}
                                                />)}

                                            <Trash2 className="p-2 bg-red-500 text-white rounded w-8 h-8 cursor-pointer"
                                                onClick={() => {
                                                    setDelShowtimeId(showtime.id);
                                                    setDelTicketIndex(ticketIndex);
                                                    toggleDelDialog(showtime.id);
                                                }}
                                            />

                                            {showtime.showConfirmDeleteDialog && delShowtimeId === showtime.id && delTicketIndex !== null &&
                                                (<ConfirmDeleteTicketDialog
                                                    open={showtime.showConfirmDeleteDialog}
                                                    onClose={() => setDelShowtimeId(null)}
                                                    onConfirm={() => {
                                                        handleDeleteTicket(showtime.id, delTicketIndex);
                                                    }}
                                                />)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mt-4">
                                <button type="button" className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                                    onClick={() => {
                                        if (validateTimeSelection(showtime.startDate, showtime.endDate)) {
                                            toggleDialog(showtime.id);
                                        }
                                    }}>
                                    <CirclePlus size={20} /> Tạo loại vé mới
                                </button>

                                {showtime.showDialog &&
                                    <CreateTypeTicketDailog
                                        open={showtime.showDialog}
                                        onClose={() =>
                                            toggleDialog(showtime.id)}
                                        startDate={showtime.startDate}
                                        endDate={showtime.endDate}
                                        setStartDate={(date) => {
                                            const updatedShowtimes = [...showtimes];
                                            updatedShowtimes[index].startDate = date;
                                            setShowtimes(updatedShowtimes);
                                        }}
                                        setEndDate={(date) => {
                                            const updatedShowtimes = [...showtimes];
                                            updatedShowtimes[index].endDate = date;
                                            setShowtimes(updatedShowtimes);
                                        }}
                                        addTicket={(newTicket) => addTicket(showtime.id, newTicket)}
                                    />}
                            </div>
                        </>)}
                    </div>
                ))}

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                <div className="flex justify-center mb-6">
                    <button
                        type="button" onClick={handleAddShowtime}
                        className="text-base font-medium flex items-center gap-1 my-2 text-[#2DC275]"
                    >
                        <CirclePlus size={20} /> Tạo suất diễn
                    </button>
                </div>
            </form >
        </>
    );
}
