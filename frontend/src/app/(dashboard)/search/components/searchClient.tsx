'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import RangeSlider from './range-slider';
import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/admin/pages/Dashboard.css';
import EventSlider from '../../components/dashboard/eventSlider';

interface SearchClientProps {
    events: number[];
}

export default function SearchClient({ events }: SearchClientProps) {
    const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isWeekDayOpen, setIsWeekDayOpen] = useState(false);
    const [selectedWeekDay, setSelectedWeekDay] = useState<string | null>(null);

    const options = ["Âm nhạc", "Kịch", "Học thuật", "Thể thao", "Workshop", "Hòa nhạc"];
    const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
    
    const dropdownEventRef = useRef<HTMLDivElement | null>(null);
    const dropdownWeekDayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownEventRef.current && !dropdownEventRef.current.contains(event.target)) {
                setIsEventTypeOpen(false);
            }
            if (dropdownWeekDayRef.current && !dropdownWeekDayRef.current.contains(event.target)) {
                setIsWeekDayOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
        <main className="flex-1">
            <div className="flex justify-center mt-8 px-4">
                <div className="w-full md:w-5/6">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap">Kết quả tìm kiếm:</h2>

                        {/* Bộ lọc */}
                        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                            {/* Bộ lọc: Ngày trong tuần */}
                            <div className="relative w-full md:w-40 flex-shrink-0" ref={dropdownWeekDayRef}>
                                <button
                                    onClick={() => setIsWeekDayOpen(!isWeekDayOpen)}
                                    className="w-full bg-white border border-gray-300 rounded p-2 flex justify-between items-center text-gray-500"
                                >
                                    <span>
                                        {selectedWeekDay ? selectedWeekDay : "Ngày trong tuần"}
                                    </span>
                                    <ChevronDown size={16} className="text-gray-500" />
                                </button>

                                {/* Dropdown multi-select */}
                                {isWeekDayOpen && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg text-[#0C4762] small-text">
                                    {weekdays.map((weekday) => (
                                      <div
                                        key={weekday}
                                        className="p-2 hover:bg-[#0C4762] hover:bg-opacity-[0.31] cursor-pointer"
                                        onClick={() => {
                                          setSelectedWeekDay(weekday);
                                          setIsWeekDayOpen(false);
                                        }}
                                      >
                                        {weekday}
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>

                            {/* Bộ lọc: Loại sự kiện */}
                            <div className="relative w-full md:w-40 flex-shrink-0" ref={dropdownEventRef}>
                                <button
                                    onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                                    className="w-full bg-white border border-gray-300 rounded p-2 flex justify-between items-center text-gray-500"
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
                                        {selectedOptions.length > 0
                                            ? selectedOptions.join(", ")
                                            : "Loại sự kiện"}
                                    </span>
                                    <ChevronDown size={16} className="text-gray-500" />
                                </button>

                                {/* Dropdown multi-select */}
                                {isEventTypeOpen && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg text-[#0C4762]">
                                        {options.map((option) => (
                                            <label
                                                key={option}
                                                className="flex items-center p-2 hover:bg-[#0C4762] hover:bg-opacity-[0.31] cursor-pointer"
                                                style={{ lineHeight: "normal" }}
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
                            {/* Bộ lọc: Range Slider */}
                            <div className="w-full items-center md:w-80 flex-shrink-0">
                                <RangeSlider/>
                            </div>
                        </div>
                    </div>
                    {/* Event Cards Grid */}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                        {events.map((_, index) => (
                            <div key={index} className="bg-[#0C4762] rounded-lg overflow-hidden shadow-lg border-2 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center aspect-[13/9] overflow-hidden">
                                    <img
                                        src="/images/dashboard/card_pic.png"
                                        alt="Event"
                                        className="object-cover hover:scale-105 transition-transform duration-300 padding-30"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-left text-base mb-3 line-clamp-2 leading-tight text-white">
                                        Nhớ Trịnh Công Sơn 3 - Quang Dũng - Cẩm Vân - Khắc Triệu - Cece Trường
                                    </h3>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-[14px]">
                                        <time className="text-left text-teal-500">
                                            <span>20:00 - 23:00</span>
                                            <br />
                                            <span>25 tháng 10, 2024</span>
                                        </time>
                                        <span
                                            className={`rounded-lg bg-emerald-200 px-2 text-sky-950 text-center md:text-left`}
                                        >
                                            {index % 2 === 0 ? "Miễn phí" : "950.000đ"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                    <EventSlider events={events} title={''} />
                    <EventSlider events={events} title={''} />
                    <EventSlider events={events} title={''} />
                    <EventSlider events={events} title={''} />
                    {/* Load More Button */}
                    <div className="flex justify-center mt-8 mb-8">
                        <button className="px-6 py-2 bg-teal-400 text-sky-950 rounded-md hover:bg-teal-300 transition-colors">
                            Xem thêm...
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    );
}