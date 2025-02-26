'use client';

import { useEffect, useState } from 'react';

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

export const useFetchEventDetail = (eventId: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/detail?eventId=${eventId}`, {
          cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await response.json();
        setEvent(data?.data || null);
      } catch (err) {
        setError("Error loading event details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  return { event, loading, error };
};
