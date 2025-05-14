/* Package System */

/* Package Application */
import ShowingDetailPage from "./components/showingPage"

interface Props {
    params: { id: string }
}

export default function Page({ params }: Props) {
    return (
        <ShowingDetailPage showingId={params.id} />
    )
}