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
import { Category } from '@/types/model/frontDisplay';
import mapCategoryName from '@/app/(dashboard)/libs/functions/mapCategoryName'; 
import axios from 'axios';
// import EventSlider from '../../components/dashboard/eventSlider';

interface SearchClientProps {
    events: SearchEventsResponse;
}

export default function SearchClient({ events }: SearchClientProps) {
  const [searchText, setSearchText] = useState('');
    const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]); 
    const [priceRange, setPriceRange] = useState<number[]>([0, 20000000]);
    const [dateRange, setDateRange] = useState<RangeValue<CalendarDate> | null>(null);
    const dropdownEventRef = useRef<HTMLDivElement | null>(null);

    const filteredEvents = events.data.filter(event => {
      // Filter by category
      if (selectedOptions.length > 0) {
        const eventCategoryNames = event.categories.map(cat => cat.name);
        if (!eventCategoryNames.some(name => selectedOptions.includes(name))) {
          return false;
        }
      }
    
      // Filter by price
      if (
        event.minTicketPrice < priceRange[0] ||
        event.minTicketPrice > priceRange[1]
      ) {
        return false;
      }
    
      // Filter by date range
      if (dateRange) {
        const eventDate = new Date(event.startDate);
        const start = dateRange.start?.toDate('UTC');
        const end = dateRange.end?.toDate('UTC');
        if (
          (start && eventDate < start) ||
          (end && eventDate > end)
        ) {
          return false;
        }
      }
    
      return true;
    });

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`/api/categories`);
          setCategories(response.data || []); 
        } catch (error) {
          console.error("Error fetching categories:", error);
          setCategories([]); 
        }
      };
      fetchCategories();
      }, []);

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
                    <div className="flex flex-col gap-4 mb-8">
  <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap">
    Kết quả tìm kiếm
  </h2>

  {/* Search input & filters container */}
  <div className="flex flex-wrap md:flex-row justify-between items-start md:items-center gap-4">
    {/* Search input */}
    <div className="w-full md:w-60">
      <input
        type="text"
        placeholder="Tìm kiếm sự kiện..."
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>

    {/* Filters */}
    <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
      {/* Date Range Filter */}
      <div className="relative w-full md:w-60 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-colors">
        <DatePicker onDateRangeChange={setDateRange} />
      </div>

      {/* Category Filter */}
      <div
        className="relative w-full md:w-60 flex-shrink-0 bg-white border border-gray-200 p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        ref={dropdownEventRef}
      >
        <button
          onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
          className="w-full bg-white border border-gray-100 rounded p-2 flex justify-between items-center text-gray-500"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
            {selectedOptions.length > 0
              ? selectedOptions.map((name) => mapCategoryName(name)).join(', ')
              : 'Loại sự kiện'}
          </span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {isEventTypeOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg text-[#0C4762] max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center p-2 hover:bg-[#0C4762] hover:bg-opacity-[0.31] cursor-pointer"
                style={{ lineHeight: 'normal' }}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(category.name)}
                  onChange={() => toggleOption(category.name)}
                  className="mr-2"
                />
                {mapCategoryName(category.name)}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="w-full items-center md:w-80 flex-shrink-0">
        <RangeSlider onChange={setPriceRange} />
      </div>
    </div>

    {/* Apply button */}
    <div className="w-full md:w-auto">
      <button
        className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 px-6 rounded-lg shadow"
        onClick={() => {
          // Optional: trigger filtering or navigation
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        Áp dụng
      </button>
    </div>
  </div>
</div>

                    {/* Event Cards Grid */}
                    {filteredEvents.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                Không tìm thấy sự kiện nào phù hợp.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredEvents.map((event) => (
                  <Link key={event.id} href={`/event/${event.id}`}>
                    <div className="bg-[#0C4762] rounded-lg overflow-hidden shadow-md transition-shadow flex flex-col h-full hover:shadow-xl cursor-pointer">
                      <div className="flex items-center justify-center p-2 w-full h-auto overflow-hidden">
                        <Image
                          src={
                            event.Images_Events_imgPosterIdToImages?.imageUrl ||
                            '/images/dashboard/card_pic.png'
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
                              event.status === 'event_over'
                                ? 'bg-red-300'
                                : 'bg-emerald-200'
                            }`}
                          >
                            {event.status === 'available'
                              ? 'Từ ' +
                                event.minTicketPrice?.toLocaleString('vi-VN') +
                                'đ'
                              : event.status === 'event_over'
                              ? 'Đã kết thúc'
                              : 'Chưa có thông tin vé'}
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