'use client';

import Link from 'next/link';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';

import { useSearchResults } from '@/app/providers/searchResultProvider';
import { Event } from "@/types/model/frontDisplay";
import { getFDByIds } from "@/services/event.service";

export default function SearchResult() {
  const { eventIds } = useSearchResults();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getFDByIds(eventIds);
        setEvents(res);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [eventIds]);

  return (
    <div className="min-h-screen flex flex-col px-4 mt-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Những sự kiện mà bạn có thể thích:
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Không tìm thấy sự kiện nào phù hợp.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          { events?.length > 0 && events
            .filter(event => !!event.id)
            .map((event) => {
              const posterUrl =
                event.Images_Events_imgPosterIdToImages?.imageUrl || '/images/dashboard/card_pic.png';

              const displayPrice =
                event.status === 'available'
                  ? event.minTicketPrice != null
                    ? 'Từ ' + event.minTicketPrice.toLocaleString('vi-VN') + 'đ'
                    : 'Chưa có thông tin vé'
                  : event.status === 'event_over'
                    ? 'Đã kết thúc'
                    : 'Chưa có thông tin vé';

              return (
                <Link key={event.id} href={`/event/${event.id}`}>
                  <div className="bg-[#0C4762] rounded-lg overflow-hidden shadow-md transition-shadow flex flex-col h-full hover:shadow-xl cursor-pointer">
                    <div className="flex items-center justify-center p-2 w-full h-auto overflow-hidden">
                      <Image
                        src={posterUrl}
                        alt={event.title || 'Poster sự kiện'}
                        className="w-full aspect-video object-cover rounded-lg hover:scale-110 transition-transform duration-300"
                        width={140}
                        height={100}
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="font-bold text-left text-sm mb-2 text-white line-clamp-2 min-h-[36px] leading-tight">
                        {event.title || 'Không có tiêu đề'}
                      </h3>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-[14px]">
                        <span
                          className={`rounded-lg px-2 font-medium text-sky-950 text-center md:text-left ${event.status === 'event_over'
                            ? 'bg-red-300'
                            : 'bg-emerald-200'
                            }`}
                        >
                          {displayPrice}
                        </span>
                        {event.status !== 'event_over' && (
                          <time className="text-left text-emerald-200">
                            <span>{new Date(event.startTime).toLocaleDateString('vi-VN')}</span>
                          </time>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

