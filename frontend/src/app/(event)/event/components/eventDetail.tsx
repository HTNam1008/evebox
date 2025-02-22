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

interface EventProps {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
}

interface EventMoreProps extends EventProps {
    startDate: string;
    status: string;
}


// Client component
export default function EventDetailClient({ event }: { event: EventProps }) {
    const events: EventMoreProps[] = [
        { id: 1, title: "Sự kiện 1", description: "Mô tả sự kiện 1", date: "2024-07-01", location: "Hà Nội", startDate: "2024-06-30", status: "upcoming" },
        { id: 2, title: "Sự kiện 2", description: "Mô tả sự kiện 2", date: "2024-07-05", location: "TP HCM", startDate: "2024-07-01", status: "ongoing" },
        { id: 3, title: "Sự kiện 3", description: "Mô tả sự kiện 3", date: "2024-07-10", location: "Đà Nẵng", startDate: "2024-07-08", status: "completed" },
        { id: 4, title: "Sự kiện 4", description: "Mô tả sự kiện 4", date: "2024-07-15", location: "Huế", startDate: "2024-07-14", status: "upcoming" }
    ];    

    return (
        <div className="mt-5 mb-5">
            <EventBox event={event} />

            <div className="row align-items-start">
                <div className="col-lg-8 col-md-12 custom-col-left ">
                    <Description description={event.description} />
                    <TicketDetails />
                </div>
                <MoreInformation title={event.title} location={event.location} />
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