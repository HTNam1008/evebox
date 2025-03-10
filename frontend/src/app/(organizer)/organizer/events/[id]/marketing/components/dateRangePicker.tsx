"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date || undefined)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Từ ngày"
        className="border border-[#0C4762] rounded-md p-2 text-gray-700"
        enableTabLoop={false}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date || undefined)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Đến ngày"
        className="border border-[#0C4762] rounded-md p-2 text-gray-700"
        enableTabLoop={false}
      />
      <button className="bg-[#0C4762] text-white px-4 py-2 rounded-md hover:bg-[#083548] transition-colors duration-200">
        Xác nhận
      </button>
    </div>
  );
};

export default DateRangePicker;
