import TicketDetailClient from './components/ticketDetail';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <TicketDetailClient ticketId={params.id} />
    </div>
  );
}
