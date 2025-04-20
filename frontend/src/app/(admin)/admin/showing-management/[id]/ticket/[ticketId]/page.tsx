'use client'

/* Package System */
import { useParams } from 'next/navigation';

export default function TicketDetailPage() {
    const params = useParams();
    const showingId = params.id;
    const ticketId = params.ticketId;

    return (
        <div>
            <h1>Chi tiết vé {ticketId} của showing {showingId}</h1>
        </div>
    );
}
