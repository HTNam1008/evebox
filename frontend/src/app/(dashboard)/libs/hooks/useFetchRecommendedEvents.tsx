'use client';

import { useEffect, useState } from 'react';
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
};
