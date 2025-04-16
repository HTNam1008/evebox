import { OrdersPage } from "./components/orders-page"

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  const { id: eventIdStr } = params
  const eventId = Number(eventIdStr)

  return <OrdersPage eventId={eventId} />
}
