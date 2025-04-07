'use client';

/* Package System */
import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import { CalendarDate, RangeValue } from '@nextui-org/react';
// import axios from 'axios';

/* Package Application */
import RangeSlider from './range-slider';
import '@/styles/admin/pages/Dashboard.css';
import { SearchEventsResponse, Event } from '@/types/model/searchEvents';
import DatePicker from '../../components/dashboard/datePicker';
import { Category } from '@/types/model/frontDisplay';
import mapCategoryName from '@/app/(dashboard)/libs/functions/mapCategoryName';
import { fetchSearchEvents } from '@/app/(dashboard)/libs/server/fetchSearchEvents';
import { useRouter } from 'next/navigation';
import { getAllCategories } from '@/lib/server/event.api';

interface SearchClientProps {
  events: SearchEventsResponse;
}

export default function SearchClient({ events: initialEvents }: SearchClientProps) {
  const [searchText, setSearchText] = useState('');
  const [events, setEvents] = useState<Event[]>(initialEvents.data);
  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000000]);
  const [dateRange, setDateRange] = useState<RangeValue<CalendarDate> | null>(null);
  const [loading, setLoading] = useState(false);

  const dropdownEventRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const currentQuery = searchParams.get('q') || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
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

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const title = searchText.trim() !== '' ? searchText.trim() : currentQuery;

      const query: Record<string, string> = {
        q: title,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
      };
  
      if (selectedOptions.length > 0) query.types = selectedOptions.join(',');
      if (dateRange?.start) query.startDate = dateRange.start.toString();
      if (dateRange?.end) query.endDate = dateRange.end.toString();
  
      // Update URL without reload
      const queryString = new URLSearchParams(query).toString();
      router.push(`/search?${queryString}`);
  
      const newEvents = await fetchSearchEvents({
        title,
        type: selectedOptions.length > 0 ? selectedOptions.join(',') : undefined,
        startDate: dateRange?.start?.toString(),
        endDate: dateRange?.end?.toString(),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });

      setEvents(newEvents?.data || []);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="flex justify-center mt-8 px-4">
          <div className="w-full md:w-5/6">
            <div className="flex flex-col gap-4 mb-8">
              <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap">Kết quả tìm kiếm</h2>

              <div className="flex flex-wrap md:flex-row justify-between items-start md:items-center gap-4">
                <div className="w-full md:w-60">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện..."
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
                  <div className="relative w-full md:w-60 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-colors">
                    <DatePicker onDateRangeChange={setDateRange} />
                  </div>

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

                  <div className="w-full items-center md:w-80 flex-shrink-0">
                    <RangeSlider onChange={setPriceRange} />
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <button
                    className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 px-6 rounded-lg shadow"
                    onClick={applyFilters}
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 animate-pulse h-64 rounded-lg shadow-md"
      ></div>
    ))}
  </div>
) : events.length === 0 ? (
  <p className="text-center text-gray-500 mt-10">
    Không tìm thấy sự kiện nào phù hợp.
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {events.map((event) => (
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
