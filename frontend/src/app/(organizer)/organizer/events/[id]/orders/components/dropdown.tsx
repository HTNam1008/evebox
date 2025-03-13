"use client";

import { useState } from 'react';

export default function Dropdown({
    options,
    selected,
    onChange,
}: {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
}) {
    return (
        <select
            className="border border-[#0C4762] text-[#0C4762] rounded-lg px-4 py-1"
            value={selected}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

// Component Wrapper để dùng trong page.tsx
export function DropdownWrapper({ months, dates }: { months: string[]; dates: string[] }) {
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [selectedDate, setSelectedDate] = useState(dates[0]);

    return (
        <div className="flex space-x-4">
            <Dropdown options={months} selected={selectedMonth} onChange={setSelectedMonth}/>
            <Dropdown options={dates} selected={selectedDate} onChange={setSelectedDate} />
        </div>
    );
}
