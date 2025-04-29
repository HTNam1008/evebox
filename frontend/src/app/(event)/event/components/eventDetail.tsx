'use client'

/* Package System */
import React, { useEffect } from 'react';
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
import { Event } from '@/app/(dashboard)/libs/interface/dashboard.interface';
import { EventDetail } from '../libs/event.interface';
import { postClickEvent } from '@/services/event.service';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

// Client component
export default function EventDetailClient({ event: events, recommendedEvent: recommendedEvents }: { event: EventDetail, recommendedEvent: Event[]}) {
    const { data: session } = useSession();
    const hasSentClick = useRef(false);

   useEffect(() => {
    const sendClick = async () => {
      if (hasSentClick.current) return;
      const eventId = events.id;
      let userId: string | undefined = session?.user?.email;

      if (!userId){
        let ananonymous =  localStorage.getItem('guestUserId');
        if (ananonymous)
           userId = ananonymous;
      }

      if (!userId) {
          userId = crypto.randomUUID();
          if (userId) {
            localStorage.setItem('guestUserId', userId);
          }
      }

     try {
      await postClickEvent({ eventId, userId });
      hasSentClick.current = true;
      console.log("akfkkfkfk");
     } catch (error) {
      console.error('Failed to register click:', error);
     }
    };

    sendClick();
  }, [events.id, session?.user?.email]);
  
    return (
        <div className="mt-5 mb-5">
            <EventBox event={events} />

            <div className="row align-items-start">
                <div className="col-lg-8 col-md-12 custom-col-left ">
                    <Description description={events.description} />
                    <TicketDetails event={events} showings={events.Showing} />
                </div>
                <MoreInformation title={events.title} location={events.venue} locationsString={events.locationsString} />
            </div>

            <Comment />

            {/* Events Section */}
            <div className="d-flex justify-center mt-8">
                <div className="w-full md:w-5/6">
                    <EventSlider
                        title="anotherEvents"
                        subtitle="mayLike"
                        events={recommendedEvents}
                        showViewMore={true}
                    />
                </div>
            </div>
        </div>
    );
}

function uuidv4(): string | undefined {
    throw new Error('Function not implemented.');
}

