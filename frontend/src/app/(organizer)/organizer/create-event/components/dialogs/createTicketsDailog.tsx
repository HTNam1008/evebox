'use client'

/* Package System */
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

/* Package Application */
// import SelectField from "../common/form/selectField";
import DateTimePicker from "../common/form/dateTimePicker";
import InputCountField from "../common/form/inputCountField";
import ImageUpload from "../common/form/imageUpload";
import InputField from "../common/form/inputField";

interface Props {
    open: boolean;
    onClose: () => void;
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
}

export default function CreateTypeTicketDailog({ open, onClose, startDate, endDate, setStartDate, setEndDate }: Props) {
    const [ticketName, setTicketName] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [ticketNum, setTicketNum] = useState("");
    const [ticketNumMin, setTicketNumMin] = useState("");
    const [ticketNumMax, setTicketNumMax] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [infoTicket, setInfoTicket] = useState("");
    const [imageTicket, setImageTicket] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;
        if (field === "ticketName") setTicketName(value);
        if (field === "ticketPrice") setTicketPrice(value);
        if (field === "ticketNum") setTicketNum(value);
        if (field === "ticketNumMin") setTicketNumMin(value);
        if (field === "ticketNumMax") setTicketNumMax(value);
        if (field === "infoOrg") setInfoTicket(value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = event.target.files?.[0];

        if (file) {
            // Kiểm tra dung lượng file (1MB = 1024 * 1024 bytes)
            if (file.size > 1 * 1024 * 1024) {
                setImageErrors((prev) => ({ ...prev, [type]: "Dung lượng ảnh phải nhỏ hơn hoặc bằng 1MB" }));
                toast.error("Dung lượng ảnh phải nhỏ hơn hoặc bằng 1MB!", { duration: 5000 });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageErrors((prev) => ({ ...prev, [type]: "" }));
                setImageTicket(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
                <div className="text-white dialog-header px-6 py-2 pb-4  justify-center items-center flex relative" style={{ background: '#0C4762' }}>
                    <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">Tạo loại vé mới</DialogTitle>
                    <button onClick={onClose} className="absolute right-2 top-2 px-1 py-1 close-btn">
                        <Icon icon="ic:baseline-close" width="20" height="20" />
                    </button>
                </div>

                <DialogContent sx={{ overflowY: "auto", maxHeight: "70vh" }}>
                    <div className="content mx-4">
                        {/* Tên vé */}
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <InputCountField
                                    label="Tên vé"
                                    placeholder="Tên vé"
                                    value={ticketName}
                                    onChange={(e) => handleInputChange(e, "ticketName")}
                                    error={errors.ticketName}
                                    maxLength={50}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            {/* Giá vé */}
                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Giá vé"
                                    value={ticketPrice}
                                    placeholder="0"
                                    error={errors.ticketPrice}
                                    required
                                />
                            </div>

                            {/* Vé miễn phí */}
                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0 flex items-center">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="fee"
                                        className="peer hidden"
                                    />
                                    <div className="w-4 h-4 rounded-full border border-black bg-white flex items-center justify-center peer-checked:bg-[#9EF5CF] peer-focus:border-green-700">
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    </div>
                                    <span className="text-center">Miễn phí</span>
                                </label>
                            </div>


                            {/* Tổng só lượng vé */}
                            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Tổng số lượng vé"
                                    value={ticketNum}
                                    placeholder="10"
                                    error={errors.ticketNum}
                                    required
                                />
                            </div>

                            {/* Số vé tối thiểu của một đơn hàng */}
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Số vé tối thiểu của một đơn hàng"
                                    value={ticketNumMin}
                                    placeholder="1"
                                    error={errors.ticketNumMin}
                                    required
                                />
                            </div>

                            {/* Số vé tối đa của một đơn hàng */}
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Số vé tối đa của một đơn hàng"
                                    value={ticketNumMax}
                                    placeholder="10"
                                    error={errors.ticketNumMax}
                                    required
                                    onChange={(e) => setTicketNum(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            {/* Thời gian bắt đầu */}
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <DateTimePicker
                                    label="Thời gian bắt đầu"
                                    selectedDate={startDate}
                                    setSelectedDate={setStartDate}
                                    popperPlacement="bottom-end"
                                    required
                                />
                            </div>

                            {/* Thời gian kết thúc */}
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <DateTimePicker
                                    label="Thời gian kết thúc"
                                    selectedDate={endDate}
                                    setSelectedDate={setEndDate}
                                    popperPlacement="bottom-start"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-3/4 px-3 flex flex-col h-full">
                                {/* Thông tin vé */}
                                <label className="block text-sm font-bold mb-2">
                                    Thông tin vé
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="w-full h-32 text-sm block appearance-none w-full border py-3 px-4 pr-8 rounded leading-tight focus:outline-black-400"
                                        placeholder="Mô tả"
                                        value={infoTicket}
                                        onChange={(e) => handleInputChange(e, "infoTicket")}
                                    />
                                    <p className="text-sm text-gray-400 pointer-events-none absolute inset-y-0 right-0 flex items-end px-2 mb-3">
                                        0/1000
                                    </p>
                                </div>
                            </div>

                            {/* Hình ảnh vé */}
                            <div className="w-1/4 px-3 flex flex-col h-full">
                                <label className="block text-sm font-bold mb-2">
                                    Hình ảnh vé
                                </label>
                                <div className="h-full flex items-center justify-center">
                                    <ImageUpload
                                        image={imageTicket}
                                        onUpload={(e) => handleUpload(e, "imageTicket")}
                                        placeholderText="Thêm"
                                        dimensions="1MB"
                                        height="h-32"
                                        error={imageErrors.imageTicket}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4 mb-4">
                            <button
                                onClick={onClose}
                                className="w-full border-2 border-[#51DACF] text-[#0C4762] font-bold py-2 px-4 rounded bg-[#51DACF] hover:bg-[#0C4762] hover:border-[#0C4762] hover:text-white transition-all"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}