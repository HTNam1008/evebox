export const fetchEvents = async () => {
  try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/event/front-display`,
          {
              next: {
                  revalidate: 60 // ISR: Cập nhật dữ liệu mỗi 60s
              },
              // cache: "no-store",
          }
      );

      if (!response.ok) throw new Error('Failed to fetch events');

      return response.json();
  } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Sẽ được xử lý bởi error.tsx
  }
};

// 'use client';

/* import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategorySpecial } from '@/types/model/frontDisplay';

export const useFetchEvents = () => {
  const [events, setEvents] = useState({
    specialEvents: [],
    trendingEvents: [],
    onlyOnEve: [],
    categorySpecial: [] as CategorySpecial[],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/event/front-display`);
        if (response.status === 200) {
          setEvents(response.data.data); // Assuming `data` contains the necessary keys
        }
      } catch (err) {
        setError('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}; */
