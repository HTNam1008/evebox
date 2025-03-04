'use client';

import { useEffect, useState } from 'react';
import { fetchEventDetail } from '../server/fetchEventDetail';

interface TicketType {
  id: string;
  name: string;
  description: string;
  color: string;
  isFree: boolean;
  price: number;
  originalPrice: number;
  maxQtyPerOrder: number;
  minQtyPerOrder: number;
  effectiveFrom: string;
  effectiveTo: string;
  status: string;
  imageUrl?: string;
}

interface Showing {
  id: string;
  eventId: number;
  status: string;
  startTime: string;
  endTime: string;
  TicketType: TicketType[];
}

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  venue: string;
  showing: Showing[];
  Images_Events_imgPosterIdToImages?: { imageUrl: string };
}

export function useFetchEventDetail(eventId: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const eventData = await fetchEventDetail(eventId);
      if (!eventData) {
        setError('Error loading event details');
      }
      setEvent(eventData);
      setLoading(false);
    }

    fetchData();
  }, [eventId]);

  return { event, loading, error };
}
