'use client';

//Package System
import { useEffect, useState } from 'react';
import axios from 'axios';

//Package App
import { Event } from '../../libs/interface/dashboard.interface';

interface Category {
  id: number;
  name: string;
  createAt: string;
}

interface CategorySpecial {
  category: Category;
  events: Event[];
}

// interface EventResponse {
//   specialEvents: Event[];
//   trendingEvents: Event[];
//   onlyOnEve: Event[];
//   categorySpecial: CategorySpecial[];
// }

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/event/front-display`);
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
};
