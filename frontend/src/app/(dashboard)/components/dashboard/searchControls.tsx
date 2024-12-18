"use client";
console.log('search control - Rendering on client:', typeof window !== 'undefined');

import { ChevronDown, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { CalendarDate} from "@internationalized/date";
import DatePicker from './datePicker';
import Link from 'next/link';
import { RangeValue } from "@react-types/shared";

export default function SearchControls() {
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState<RangeValue<CalendarDate> | null>(null);
    const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const options = ["Âm nhạc", "Kịch", "Học thuật", "Thể thao", "Workshop", "Hòa nhạc"];
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const locations = ["Hà Nội", "TP.HCM", "Đà Nẵng"];
    const dropdownEventRef = useRef(null);
    const dropdownLocationRef = useRef(null);

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="absolute left-0 right-0 -bottom-20 mx-auto w-full md:w-11/12 px-4">
            <div className="bg-sky-900 text-white p-4 md:p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-[1.5] text-left">
                        <label className="text-sm font-medium mb-2">Tên sự kiện, diễn giả, ...</label>
                        <div className="mt-2 relative">
                            <input className="w-full bg-white text-gray-800 rounded p-2 appearance-none pr-8 small-text" type="text"
                                placeholder="Nhập tên sự kiện, diễn giả..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div className="flex-1 text-left">
                        <label className="text-sm font-medium mb-2">Loại sự kiện</label>
                        <div className="mt-2 relative" ref={dropdownEventRef}>
                            <button
                                onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                                className="w-full bg-white border border-gray-300 rounded p-2 flex justify-between items-center text-gray-500 small-text"
                            >
                                <span>
                                    {selectedOptions.length > 0
                                        ? selectedOptions.join(", ")
                                        : "Chọn loại sự kiện"}
                                </span>
                                <ChevronDown size={16} className="text-gray-500" />
                            </button>

                            {/* Dropdown menu */}
                            {isEventTypeOpen && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg text-[#0C4762] small-text">
                                    {options.map((option) => (
                                        <label
                                            key={option}
                                            className="flex items-center p-2 hover:bg-[#0C4762] hover:bg-opacity-[0.31] cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedOptions.includes(option)}
                                                onChange={() => toggleOption(option)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 text-left">
                        <label className="text-sm font-medium mb-2">Địa điểm</label>
                        <div className="mt-2 relative" ref={dropdownLocationRef}>
                            <button
                                onClick={() => setIsLocationOpen(!isLocationOpen)}
                                className="w-full bg-white border border-gray-300 rounded p-2 flex justify-between items-center text-gray-500 small-text"
                            >
                                <span>
                                    {selectedLocation ? selectedLocation : "Chọn địa điểm"}
                                </span>
                                <ChevronDown size={16} className="text-gray-500" />
                            </button>

                            {/* Dropdown menu */}
                            {isLocationOpen && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg text-[#0C4762] small-text">
                                    {locations.map((location) => (
                                        <div
                                            key={location}
                                            className="p-2 hover:bg-[#0C4762] hover:bg-opacity-[0.31] cursor-pointer"
                                            onClick={() => {
                                                setSelectedLocation(location);
                                                setIsLocationOpen(false);
                                            }}
                                        >
                                            {location}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-[1.5] text-left">
                        <label className="text-sm font-medium mb-2">Thời gian</label>
                        <div className="mt-2 relative">
                            <DatePicker onDateRangeChange={setDateRange} />
                        </div>
                    </div>
                    <div className="flex md:items-end">
                        <Link href={{
                            pathname: "/search",
                            query: {
                                q: searchText || undefined,
                                types: selectedOptions.length > 0 ? selectedOptions.join(',') : undefined,
                                location: selectedLocation || undefined,
                                startDate: dateRange?.start?.toString() || undefined,
                                endDate: dateRange?.end?.toString() || undefined
                            }
                        }}>
                            <button className="w-full md:w-14 h-10 bg-teal-400 hover:bg-teal-300 rounded flex items-center justify-center">
                                <Search size={20} className="text-white" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}