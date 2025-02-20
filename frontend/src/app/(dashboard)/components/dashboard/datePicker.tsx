"use client";

import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import 'tailwindcss/tailwind.css';

interface DatePickerProps {
    onDateRangeChange: (range: RangeValue<CalendarDate> | null) => void;
}

export default function DatePicker({ onDateRangeChange }: DatePickerProps) {
    const [value, setValue] = React.useState<RangeValue<CalendarDate> | null>({
        start: today(getLocalTimeZone()).subtract({ days: 1 }),
        end: today(getLocalTimeZone()),
    });

    const handleChange = (newValue: RangeValue<CalendarDate> | null) => {
        setValue(newValue);
        onDateRangeChange(newValue);
    };

    return (
        <div className="date-picker-container rounded-[4px] !bg-white">
            <DateRangePicker
                value={value}
                onChange={handleChange}
                visibleMonths={2}
                radius="sm"
            />
        </div>
    );
}


