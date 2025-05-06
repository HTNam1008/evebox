"use client"

import { useState, Fragment } from "react"
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react"

// Định nghĩa các kiểu dữ liệu
export type TicketRevenue = {
  id: number
  type: string
  price: number
  quantity: number
  revenue: number
}

export type EventDetail = {
  id: number
  startDate: string
  endDate: string
  revenue: number
  tickets: TicketRevenue[]
  isExpanded?: boolean
}

export type Event = {
  id: number
  name: string
  totalRevenue: number
  platformFee: number
  actualRevenue: number
  details: EventDetail[]
  isExpanded?: boolean
  selectedDetailId?: number
}

interface EventRevenueTableProps {
  events?: Event[]
  orgId?: number
  toggleEvent: (orgId: number, eventId: number) => void
  toggleEventDetail: (orgId: number, eventId: number, detailId: number) => void
  formatCurrency: (amount: number) => string
  className?: string
}

export function EventRevenueTable({
  events: propEvents,
  orgId = 0,
  toggleEvent,
  toggleEventDetail,
  formatCurrency,
  className = "",
}: EventRevenueTableProps) {

  const [localEvents, setLocalEvents] = useState<Event[]>([
    {
      id: 1,
      name: "ATSH",
      totalRevenue: 100000000,
      platformFee: 10,
      actualRevenue: 100000000,
      details: [],
    },
    {
      id: 2,
      name: "ATVNCG",
      totalRevenue: 100000000,
      platformFee: 10,
      actualRevenue: 100000000,
      isExpanded: true,
      details: [
        {
          id: 1,
          startDate: "25/01/2025",
          endDate: "25/01/2025",
          revenue: 100000000,
          tickets: [],
        },
        {
          id: 2,
          startDate: "03/04/2024",
          endDate: "10/04/2025",
          revenue: 800000000,
          isExpanded: true,
          tickets: [
            {
              id: 1,
              type: "VIP",
              price: 1000000,
              quantity: 1000,
              revenue: 300000000,
            },
            {
              id: 2,
              type: "Thường",
              price: 500000,
              quantity: 1500,
              revenue: 500000000,
            },
          ],
        },
      ],
    },
  ])

  const events = propEvents || localEvents

  const handleToggleEvent = (eventId: number) => {
    if (!propEvents) {
      setLocalEvents((prev) =>
        prev.map((event) => {
          if (event.id === eventId) {
            return { ...event, isExpanded: !event.isExpanded }
          }
          return event
        }),
      )
    } else {
      toggleEvent(orgId, eventId)
    }
  }


  const handleToggleEventDetail = (eventId: number, detailId: number) => {
    if (!propEvents) {
      setLocalEvents((prev) =>
        prev.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              selectedDetailId: detailId,
              details: event.details.map((detail) => {
                if (detail.id === detailId) {
                  return { ...detail, isExpanded: !detail.isExpanded }
                }
                return detail
              }),
            }
          }
          return event
        }),
      )
    } else {
      toggleEventDetail(orgId, eventId, detailId)
    }
  }

  if (events.length === 0) return null

  return (
    <div className={`${className}`}>
      {!propEvents && (
        <div className="flex justify-end mb-4">
          <button className="bg-[#0C4762] text-white px-4 py-2 rounded-md hover:bg-[#51DACF] transition-colors">
            Xuất báo cáo
          </button>
        </div>
      )}

      <div className={`${!propEvents ? "overflow-hidden rounded-lg border border-gray-200" : ""}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className={propEvents ? "bg-[#A6F6F1]" : "bg-[#0C4762] text-white"}>
              <th className="py-2 px-4 text-left w-16">STT</th>
              <th className="py-2 px-4 text-left">Tên sự kiện</th>
              <th className="py-2 px-4 text-left">Tổng doanh thu</th>
              <th className="py-2 px-4 text-left">Phí nền tảng</th>
              <th className="py-2 px-4 text-left">Doanh thu thực nhận</th>
              <th className="py-2 px-4 text-left">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <Fragment key={`event-${orgId}-${event.id}`}>
                <tr
                  className={`cursor-pointer hover:bg-[#EAFDFC]`}
                  onClick={() => (propEvents ? toggleEvent(orgId, event.id) : handleToggleEvent(event.id))}
                >
                  <td className="py-2 px-4 border-t flex items-center">
                    {event.details.length > 0 && (
                      <>
                        {event.isExpanded ? (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                      </>
                    )}
                    {event.id}
                  </td>
                  <td className="py-2 px-4 border-t">{event.name}</td>
                  <td className="py-2 px-4 border-t">{formatCurrency(event.totalRevenue)}</td>
                  <td className="py-2 px-4 border-t">{event.platformFee}%</td>
                  <td className="py-2 px-4 border-t">{formatCurrency(event.actualRevenue)}</td>
                  <td className="py-2 px-4 border-t">
                    <button
                      className="inline-flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/admin/revenue-management/revenue/${orgId}/event/${event.id}`
                      }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

                {/* Bảng chi tiết sự kiện */}
                {event.isExpanded && event.details.length > 0 && (
                  <tr>
                    <td colSpan={6} className="p-0">
                      <div className="ml-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#C1ECE4]">
                              <th className="py-2 px-4 text-left w-16">STT</th>
                              <th className="py-2 px-4 text-left">Ngày bắt đầu</th>
                              <th className="py-2 px-4 text-left">Ngày kết thúc</th>
                              <th className="py-2 px-4 text-left" colSpan={2}>
                                Doanh thu
                              </th>
                              <th className="py-2 px-4 text-left">Xem chi tiết</th>
                            </tr>
                          </thead>
                          <tbody>
                            {event.details.map((detail) => (
                              <Fragment key={`detail-${orgId}-${event.id}-${detail.id}`}>
                                <tr
                                  className={`cursor-pointer hover:bg-[#D2F5E3] ${
                                    detail.id === event.selectedDetailId ? "bg-[#D2F5E3]" : ""
                                  }`}
                                  onClick={() =>
                                    propEvents
                                      ? toggleEventDetail(orgId, event.id, detail.id)
                                      : handleToggleEventDetail(event.id, detail.id)
                                  }
                                >
                                  <td className="py-2 px-4 border-t flex items-center">
                                    {detail.tickets && detail.tickets.length > 0 && (
                                      <>
                                        {detail.isExpanded ? (
                                          <ChevronDown className="w-4 h-4 mr-1" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4 mr-1" />
                                        )}
                                      </>
                                    )}
                                    {detail.id}
                                  </td>
                                  <td className="py-2 px-4 border-t">{detail.startDate}</td>
                                  <td className="py-2 px-4 border-t">{detail.endDate}</td>
                                  <td className="py-2 px-4 border-t" colSpan={2}>
                                    {formatCurrency(detail.revenue)}
                                  </td>
                                  <td className="py-2 px-4 border-t">
                                    <button
                                      className="inline-flex items-center justify-center"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        window.location.href = `/admin/revenue-management/revenue/${orgId}/event/${event.id}/showing/${detail.id}`
                                      }}
                                    >
                                      <ExternalLink className="w-5 h-5" />
                                    </button>
                                  </td>
                                </tr>

                                {/* Bảng doanh thu vé */}
                                {detail.isExpanded && detail.tickets.length > 0 && (
                                  <tr>
                                    <td colSpan={6} className="p-0">
                                      <div className="ml-4">
                                        <table className="w-full text-sm">
                                          <thead>
                                            <tr className="bg-[#e8f8f5]">
                                              <th className="py-2 px-4 text-left w-16">STT</th>
                                              <th className="py-2 px-4 text-left">Loại vé</th>
                                              <th className="py-2 px-4 text-left">Đơn giá</th>
                                              <th className="py-2 px-4 text-left">Số vé bán ra</th>
                                              <th className="py-2 px-4 text-left">Doanh thu</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {detail.tickets.map((ticket) => (
                                              <tr
                                                key={`ticket-${orgId}-${event.id}-${detail.id}-${ticket.id}`}
                                                className="hover:bg-[#EDFFEA]"
                                              >
                                                <td className="py-2 px-4 border-t">{ticket.id}</td>
                                                <td className="py-2 px-4 border-t">{ticket.type}</td>
                                                <td className="py-2 px-4 border-t">{formatCurrency(ticket.price)}</td>
                                                <td className="py-2 px-4 border-t">{ticket.quantity}</td>
                                                <td className="py-2 px-4 border-t">{formatCurrency(ticket.revenue)}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
