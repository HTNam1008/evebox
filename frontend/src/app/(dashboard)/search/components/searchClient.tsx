'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import RangeSlider from './range-slider';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/admin/pages/Dashboard.css';
import Image from "next/image";
import { SearchEventsResponse } from '@/types/model/searchEvents';
import DatePicker from '../../components/dashboard/datePicker';
import { CalendarDate, RangeValue } from '@nextui-org/react';

// import EventSlider from '../../components/dashboard/eventSlider';

interface SearchClientProps {
    events: SearchEventsResponse;
}

export default function SearchClient({ events }: SearchClientProps) {
    const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [, setDateRange] = useState<RangeValue<CalendarDate> | null>(null);

    const options = ["Âm nhạc", "Kịch", "Học thuật", "Thể thao", "Workshop", "Hòa nhạc"];
    
    const dropdownEventRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (dropdownEventRef.current && !dropdownEventRef.current.contains(target)) {
                setIsEventTypeOpen(false);
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
                        <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap">Kết quả tìm kiếm</h2>

                        {/* Bộ lọc */}
                        <div className="flex flex-wrap items-center gap-8 w-full md:w-auto">
                            {/* Bộ lọc: Ngày trong tuần */}
                            <div className="relative w-full md:w-60 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-colors">
                            <DatePicker onDateRangeChange={setDateRange} />
                            </div>

                            {/* Bộ lọc: Loại sự kiện */}
                            <div  className="relative w-full md:w-60 flex-shrink-0 bg-white border border-gray-200 p-2 rounded-lg shadow-md transition-colors hover:bg-gray-50" ref={dropdownEventRef}>
                                <button
                                    onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                                    className="w-full bg-white border border-gray-100 rounded p-2 flex justify-between items-center  text-gray-500"
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
                    {events.data.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                Không tìm thấy sự kiện nào phù hợp.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {events.data.map((event) => (
                  <Link key={event.id} href={`/event/${event.id}`}>
                    <div className="bg-[#0C4762] rounded-lg overflow-hidden shadow-md transition-shadow flex flex-col h-full hover:shadow-xl cursor-pointer">
                      <div className="flex items-center justify-center p-2 w-full h-auto overflow-hidden">
                        <Image
                          src={
                            event.Images_Events_imgPosterIdToImages?.imageUrl ||
                            "/images/dashboard/card_pic.png"
                          }
                          alt={event.title}
                          className="w-full aspect-video object-cover rounded-lg hover:scale-110 transition-transform duration-300"
                          width={140}
                          height={100}
                        />
                      </div>
                      <div className="p-3 flex flex-col flex-grow">
                        <h3 className="font-bold text-left text-sm mb-2 text-white line-clamp-2 min-h-[36px] leading-tight">
                          {event.title}
                        </h3>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-[14px]">
                          <span
                            className={`rounded-lg px-2 font-medium text-sky-950 text-center md:text-left ${
                              event.status === "event_over"
                                ? "bg-red-300"
                                : "bg-emerald-200"
                            }`}
                          >
                            {event.status === "available"
                              ? "Từ " +
                                event.minTicketPrice?.toLocaleString("vi-VN") +
                                "đ"
                              : event.status === "event_over"
                              ? "Đã kết thúc"
                              : "Chưa có thông tin vé"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
                </div>
            </div>
        </main>
    </div>
    );
}