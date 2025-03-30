"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterForm() {
    const [selectedOption, setSelectedOption] = useState("sample");
    return (
        <>
            <div className="w-full max-w-4xl mx-auto mb-4">
                <div className="relative w-60">
                    <select
                        className={`text-base block appearance-none w-60 border py-3 px-4 pr-8 rounded leading-tight focus:outline-black-400 `}
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="sample">Form mẫu</option>
                        <option value="existing">Form đã tạo</option>
                    </select>
                    <div className="text-black pointer-events-none absolute inset-y-0 right-3 flex items-center px-2">
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>

        </>
    )
}