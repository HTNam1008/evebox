import { fetchRecommendEvents } from '@/app/(dashboard)/libs/server/fetchRecommendEvents';
import EventDetailClient from '../components/eventDetail';
import { fetchEventDetail } from '@/app/(event)/libs/server/fetchEventDetail';

export default async function Page({params}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dataEvent = await fetchEventDetail(id);
  const event = dataEvent.data || {};
  const dataRecommendedEvents = await fetchRecommendEvents();
  const recommendedEvents = dataRecommendedEvents.data || [];
  
  return (
    <div>
      {<EventDetailClient event={event} recommendedEvent={recommendedEvents} />}
    </div>
  );
}

export const dynamic = 'force-dynamic';
