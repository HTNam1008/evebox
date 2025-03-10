"use client";

/* Package System */
import { CalendarRange } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useRef } from "react";

interface DateTimePickerProps {
    label: string;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    popperPlacement?: "bottom-start" | "bottom-end";
}

export default function DateTimePicker({
    label,
    selectedDate,
    setSelectedDate,
    popperPlacement = "bottom-start",
}: DateTimePickerProps) {
    const datePickerRef = useRef<DatePicker | null>(null);

    return (
        <>
            <label className="block text-sm font-bold mb-2">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    value={selectedDate ? format(selectedDate, "dd-MM-yyyy HH:mm") : ""}
                    placeholder="Chọn thời gian"
                    readOnly
                    className="text-sm text-gray-900 border py-3 px-4 w-full rounded leading-tight focus:outline-black-400 cursor-pointer"
                    onClick={() => datePickerRef.current?.setOpen(true)}
                />
                <CalendarRange
                    size={20}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => datePickerRef.current?.setOpen(true)}
                />
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat="dd-MM-yyyy HH:mm"
                    ref={datePickerRef}
                    className="hidden"
                    popperPlacement={popperPlacement}
                />
            </div>
        </>
    );
}
