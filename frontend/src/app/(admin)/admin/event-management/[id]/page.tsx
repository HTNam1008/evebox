/* Package System */

/* Package Application */
import EventDetailPage from "./components/eventPage"

interface Props {
  params: { id: string }
}

export default function Page({ params }: Props) {
    return (
        <EventDetailPage eventId={parseInt(params.id)} />
    )
}