export const fetchRecommendEvents = async (time: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/event/recommended-events?timeWindow=${time}`,
            {
                next: {
                    revalidate: 60 // ISR: Cập nhật dữ liệu mỗi 60s
                },
                // cache: "no-store",
            }
        );

        if (!response.ok) throw new Error('Failed to fetch slider events');
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Sẽ được xử lý bởi error.tsx
    }
};

// 'use client';

/* import { useEffect, useState } from 'react';
import axios from 'axios';

import { Event } from '../../libs/interface/dashboard.interface';

export const useFetchRecommendedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/event/recommended-events?timeWindow=week`);
        if (response.status === 200) {
          setEvents(response.data.data);
        }
      } catch (err) {
        setError('Failed to load recommended events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}; */
