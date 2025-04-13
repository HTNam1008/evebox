"use client"

import { useEffect, useState, use } from "react"

import { OverviewCard } from "./overviewCard"
import { SummaryControls } from "./summaryControls"
import { TicketTable } from "./ticketTable"
import SidebarOrganizer from "../../components/sidebarOrganizer"

import type { IShowTime, IEventSummaryData } from "@/types/model/getSummaryOrg"
import { getShowingsByEventId, getSummaryByShowingId } from "@/services/organizer.service"


interface PageProps {
    params: { id: string }
  }
  
  export const SummaryRevenuePage = ({ params }: PageProps) => {
    const { id: eventIdStr } = params;
    const eventId = Number(eventIdStr);

  const [data, setData] = useState<IEventSummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showingId, setShowingId] = useState<string | null>(null)

  // Lấy danh sách suất diễn và chọn suất diễn đầu tiên
  useEffect(() => {
    const fetchShowingId = async () => {
      try {
        setLoading(true)
        const showings = await getShowingsByEventId(eventId)

        console.log("showing: ")
        console.log(showings)

        if (showings && showings.length > 0) {
          const selectedShowing = showings.find((show: IShowTime) => show.isSelected) || showings[0]
          setShowingId(selectedShowing.id)
        } else {
          setError("Không tìm thấy suất diễn nào")
        }
      } catch (error) {
        console.error("Error fetching showing ID:", error)
        setError("Không thể tải thông tin suất diễn")
      } finally {
        setLoading(false)
      }
    }

    fetchShowingId()
  }, [eventId])

  // Khi showingId thay đổi -> fetch summary
  useEffect(() => {
    const fetchSummary = async () => {
      if (!showingId) return

      try {
        setLoading(true)
        const summary = await getSummaryByShowingId(showingId)
        console.log(summary)
        setData(summary)
      } catch (error) {
        console.error("Error fetching summary:", error)
        setError("Không thể tải dữ liệu doanh thu")
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [showingId])


  // Xử lý khi người dùng thay đổi suất diễn
  const handleShowingChange = (newShowingId: string) => {
    setShowingId(newShowingId)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="inset-y-0 left-0 w-64 bg-gray-900 md:relative md:flex-shrink-0">
          <SidebarOrganizer />
        </div>
        <div className="flex-1 p-6 md-64 w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0C4762] mx-auto"></div>
            <p className="mt-4 text-[#0C4762]">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <div className="inset-y-0 left-0 w-64 bg-gray-900 md:relative md:flex-shrink-0">
          <SidebarOrganizer />
        </div>
        <div className="flex-1 p-6 md-64 w-full flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#0C4762] text-white rounded-md hover:bg-[#0A3A50]"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen">
        <div className="inset-y-0 left-0 w-64 bg-gray-900 md:relative md:flex-shrink-0">
          <SidebarOrganizer />
        </div>
        <div className="flex-1 p-6 md-64 w-full flex items-center justify-center">
          <div className="text-center">
            <p>Không tìm thấy dữ liệu.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="inset-y-0 left-0 w-64 bg-gray-900 md:relative md:flex-shrink-0">
        <SidebarOrganizer />
      </div>

      <div className="flex-1 p-6 md-64 w-full">
        <SummaryControls
          eventTitle={data.eventTitle}
          eventId={eventId}
          startTime={data.startTime}
          endTime={data.endTime}
          onShowingChange={handleShowingChange}
        />

        <OverviewCard
          totalRevenue={data.totalRevenue}
          ticketsSold={data.ticketsSold}
          totalTickets={data.totalTickets}
          percentageSold={data.percentageSold}
        />

        <TicketTable ticketTypes={data.byTicketType} />
      </div>
    </div>
  )
}

export default SummaryRevenuePage


