import EventDetailClient from '../components/eventDetail';
import { fetchEventDetail } from '@/app/(event)/libs/server/fetchEventDetail';


export default async function Page({params,}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await fetchEventDetail(id);

  if (!event) return <div>Event not found</div>;

  return (
    <div>
      <EventDetailClient event={event} />
    </div>
  );
}
