'use client'

import React from 'react';
import '@/styles/admin/pages/EventDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import '@/styles/admin/pages/Dashboard.css';
import Comment from "./comment";
import Description from "./description";
import TicketDetails from "./ticketDetails";
import MoreInformation from './moreInformation';
import EventSlider from '../../../(dashboard)/components/dashboard/eventSlider';
import EventBox from './eventBox';

interface EventProps {
    title: string;
    description: string;
    date: string;
    location: string;
}

// Client component
export default function EventDetailClient({ event }: { event: EventProps }) {
    const events = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="mt-5 mb-5">
            <EventBox event={event} />

            <div>
                <div className="row align-items-start">
                    <div className="col-lg-8 col-md-12 custom-col-left ">
                        <Description description={event.description} />
                        <TicketDetails />
                    </div>
                    <MoreInformation title={event.title} location={event.location} />
                </div>
            </div>

            <Comment />

            {/* Events Section */}
            <div className="flex justify-center mt-8 px-4">
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