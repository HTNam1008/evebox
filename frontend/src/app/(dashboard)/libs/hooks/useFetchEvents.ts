'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  title: string;
  startDate: string;
  status: string;
  Images_Events_imgLogoIdToImages: { imageUrl: string };
}

interface EventResponse {
  specialEvents: Event[];
  trendingEvents: Event[];
  onlyOnEve: Event[];
  categorySpecial: Event[];
}

export const useFetchEvents = () => {
  const [events, setEvents] = useState<EventResponse>({
    specialEvents: [],
    trendingEvents: [],
    onlyOnEve: [],
    categorySpecial: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/event/front-display');
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
