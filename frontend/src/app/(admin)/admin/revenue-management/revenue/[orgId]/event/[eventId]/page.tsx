"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, RefreshCw } from "lucide-react"
import { useParams } from "next/navigation"

import { OverviewCard } from "@/app/(organizer)/organizer/events/[id]/summary-revenue/components/overviewCard"
import { getEventRevenueDetail } from "@/services/admin.service"
//import { TicketTable } from "@/app/(organizer)/organizer/events/[id]/summary-revenue/components/ticketTable"
//import type { ITicketTypeSummary, IEventSummaryData } from "@/types/model/getSummaryOrg"

// Types
type TicketType = {
  id: number
  type: string
  price: number
  sold: number
  locked: number
  total: number
  revenue: number
}

type Showing = {
  id: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  revenue: number
  totalTickets: number
  soldTickets: number
  ticketTypes: TicketType[]
  percentageSold: number
}

type Event = {
  id: number
  name: string
  organizerId: string
  organizerName: string
  location: string
  address: string
  showings: Showing[]
}

type EventOption = { id: number; name: string; organizerId: string }


export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.eventId as string

  const [event, setEvent] = useState<Event | null>(null);
  const [selectedShowingId, setSelectedShowingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(event?.name)


  useEffect(() => {
    const fetchRevenueDetail = async () => {
      try {
        const eventData = localStorage.getItem("selectedEvent");
        const parsedEvent = eventData ? JSON.parse(eventData) : null;
  
        const response = await getEventRevenueDetail(parsedEvent.organizerId, Number(eventId));
        const showings = response.data.map((s): Showing => ({
          id: s.showingId,
          startDate: new Date(s.startTime).toLocaleDateString("vi-VN"),
          endDate: new Date(s.endTime).toLocaleDateString("vi-VN"),
          startTime: new Date(s.startTime).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: new Date(s.endTime).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          revenue: s.revenue,
          totalTickets: 0,      // Placeholder
          soldTickets: 0,       // Placeholder
          percentageSold: 0,    // Placeholder
          ticketTypes: [],      // Placeholder
        }));
  
        const mappedEvent: Event = {
          id: parsedEvent.id,
          name: parsedEvent.name,
          organizerId: parsedEvent.organizerId,
          organizerName: parsedEvent.organizerName,
          location: parsedEvent.location ?? "Không rõ",
          address: parsedEvent.address ?? "Không rõ",
          showings,
        };
  
        setEvent(mappedEvent);
        setSelectedFilter(mappedEvent.name);

      } catch (error) {
        console.error("Failed to load event revenue detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRevenueDetail();
  }, [eventId]);

  const selectedShowing = event?.showings.find((s) => s.id === selectedShowingId);

  const [eventOptions, setEventOptions] = useState<EventOption[]>([]);

  useEffect(() => {
    const storedAppRevenue = localStorage.getItem("selectedOrg");
    if (storedAppRevenue) {
      try {
        const parsed = JSON.parse(storedAppRevenue);
        const event = parsed.events.map((event: EventOption) => event);
        setEventOptions(event);
      } catch (e) {
        console.error("Invalid appRevenue format", e);
      }
    }
    }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  // Reset filter
  const resetFilter = () => {
    setSelectedFilter(event?.name)
  }

  if (!event) return <p>Loading...</p>;

  // // Handle row click
  const handleRowClick = (showingId: string) => {
    if (selectedShowingId === showingId) {
      setSelectedShowingId(null) // Toggle off if already selected
    } else {
      setSelectedShowingId(showingId)
      // Simulate loading data for the selected showing
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  // Handle showing change from SummaryControls
  // const handleShowingChange = (newShowingId: string) => {
  //   setSelectedShowingId(Number(newShowingId))
  // }

  return (
    <div className="container p-4">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-[#0C4762] font-bold text-xl mb-2">
          <Link href={`/admin/revenue-management/revenue/${event.organizerId}`} className="hover:underline">
            {event.organizerName}
          </Link>
          <span className="mx-2">&gt;</span>
          <span>{event.name}</span>
        </div>
        <div className="border-b border-[#0C4762] pb-2">
          <p className="text-gray-600">Thông tin doanh thu chi tiết của sự kiện</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center border rounded-md overflow-hidden bg-white">
          <div className="flex items-center px-4 py-2">
            <span className="text-sm">Chọn sự kiện</span>
          </div>
          <div className="relative border-l">
            <select
              className="appearance-none bg-white px-4 py-2 pr-8 outline-none"
              value={selectedFilter}
              onChange={(e) => {
                const selectedName = e.target.value;
                setSelectedFilter(selectedName);
            
                const selectedEvent = eventOptions.find((event) => event.name === selectedName);
                if (selectedEvent) {
                  localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
                  window.location.href = `/admin/revenue-management/revenue/${event.organizerId}/event/${selectedEvent.id}`;
                }
              }}
            >
              {eventOptions.map((event) => (
      <option key={event.id} value={event.name}>
        {event.name}
      </option>
    ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={resetFilter}
          className="flex items-center px-4 py-2 text-red-500 border border-red-500 rounded-md bg-white"
        >
          <RefreshCw className="w-4 h-4 mr-1" /> Đặt lại
        </button>
      </div>

      {/* Event Info */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="inline-block bg-amber-100 px-3 py-2 rounded-md">
          <span className="font-semibold">Địa điểm:</span> {event.location}
        </span>
        <span className="inline-block bg-green-100 px-3 py-2 rounded-md">
          <span className="font-semibold">Địa chỉ:</span> {event.address}
        </span>
        <span className="inline-block bg-blue-100 px-3 py-2 rounded-md">
          <span className="font-semibold">Nhà tổ chức:</span> {event.organizerName}
        </span>
      </div>

      {/* Showings Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0C4762] text-white">
              <th className="py-2 px-4 text-left w-16">STT</th>
              <th className="py-2 px-4 text-left">Ngày bắt đầu</th>
              <th className="py-2 px-4 text-left">Ngày kết thúc</th>
              <th className="py-2 px-4 text-left">Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {event.showings.map((showing) => (
              <tr
                key={`showing-${showing.id}`}
                className={`cursor-pointer hover:bg-[#EAFDFC] ${selectedShowingId === showing.id ? "bg-[#A6F6F1]" : "bg-white"}`}
                onClick={() => handleRowClick(showing.id)}
              >
                <td className="py-2 px-4 border-t">{showing.id}</td>
                <td className="py-2 px-4 border-t">{showing.startDate}</td>
                <td className="py-2 px-4 border-t">{showing.endDate}</td>
                <td className="py-2 px-4 border-t">{formatCurrency(showing.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Showing Details using reused components */}
      {selectedShowing && (
        <div className="mb-6">
          <hr className="border-gray-300 mb-6" />

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">
              Showing: {selectedShowing.startTime}, {selectedShowing.startDate} - {selectedShowing.endTime},{" "}
              {selectedShowing.endDate}
            </h3>
          </div>

          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0C4762] mx-auto"></div>
              <p className="mt-4 text-[#0C4762]">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <>
              {/* Sử dụng OverviewCard component */}
              <OverviewCard
                totalRevenue={selectedShowing.revenue}
                ticketsSold={selectedShowing.soldTickets}
                totalTickets={selectedShowing.totalTickets}
                percentageSold={selectedShowing.percentageSold}
              />

              {/* Sử dụng TicketTable component */}
              {/* <TicketTable ticketTypes={selectedShowing.ticketTypes} /> */}
            </>
          )}
        </div>
      )}
    </div>
  )
}
