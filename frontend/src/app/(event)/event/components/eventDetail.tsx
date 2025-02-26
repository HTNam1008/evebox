'use client'

/* Package System */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';

/* Package Application */
import '@/styles/admin/pages/EventDetail.css';
import '@/styles/admin/pages/Dashboard.css';
import Comment from "./comment";
import Description from "./description";
import TicketDetails from "./ticketDetails";
import MoreInformation from './moreInformation';
import EventSlider from '../../../(dashboard)/components/dashboard/eventSlider';
import EventBox from './eventBox';
import { useFetchRecommendedEvents } from '@/app/(dashboard)/libs/hooks/useFetchRecommendedEvents';
import EventLoading from '../[id]/loading';
// import { useRouter } from 'next/router';

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
  


// Client component
export default function EventDetailClient({ event }: { event: Event }) {
    const { events, loading, error } = useFetchRecommendedEvents();

    if (loading) {
        return <EventLoading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-5 mb-5">
            <EventBox event={event} />

            <div className="row align-items-start">
                <div className="col-lg-8 col-md-12 custom-col-left ">
                    <Description description={event.description} />
                    <TicketDetails showings={event.showing || []} />
                </div>
                <MoreInformation title={event.title} location={event.venue} />
            </div>

            <Comment />

            {/* Events Section */}
            <div className="d-flex justify-center mt-8">
                <div className="w-full md:w-5/6">
                    <EventSlider
                        title="Các sự kiện khác"
                        subtitle="Bạn có thể thích"
                        events={events}
                        showViewMore={true}
                    />
                </div>
            </div>
        </div>
    );
}