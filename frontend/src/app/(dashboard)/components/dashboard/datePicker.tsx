"use client";

import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";

export default function DatePicker() {
    const [value, setValue] = React.useState<RangeValue<CalendarDate> | null>({
        start: today(getLocalTimeZone()).subtract({days: 1}),
        end: today(getLocalTimeZone()),
    });

    const handleChange = (newValue: RangeValue<CalendarDate> | null) => {
        setValue(newValue);
    };

    return (
        <div className="date-picker-container">
            <DateRangePicker
                value={value}
                onChange={handleChange}
                visibleMonths={2}
            />
        </div>
    );
}


