'use client';
//Package System
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategorySpecial } from '@/types/model/frontDisplay';
 
export const useFetchEvents =  () => {
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
};
