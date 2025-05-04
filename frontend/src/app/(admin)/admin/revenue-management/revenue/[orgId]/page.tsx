"use client"

import { useState, Fragment } from "react"
import { ArrowLeft, ChevronDown, ChevronRight, ExternalLink, Filter, Search, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Types
type TicketRevenue = {
  id: number
  type: string
  price: number
  quantity: number
  revenue: number
}

type EventDetail = {
  id: number
  startDate: string
  endDate: string
  revenue: number
  tickets: TicketRevenue[]
  isExpanded?: boolean
}

type Event = {
  id: number
  name: string
  actualRevenue: number
  details: EventDetail[]
  isExpanded?: boolean
}

type Organization = {
  id: string
  name: string
  email: string
  location: string
  totalRevenue: number
  eventCount: number
  showingCount: number
  ticketsSold: number
  events: Event[]
}

export default function OrganizationRevenuePage() {
  const params = useParams()
  const orgId = params?.orgId as string

  // Mock data for the organization
  const [organization, setOrganization] = useState<Organization>({
    id: orgId,
    name: "Nhà xương rồng",
    email: "nhaxuongrong@gmail.com",
    location: "Nhà văn hóa sinh viên, TP Thủ Đức",
    totalRevenue: 100000000,
    eventCount: 10,
    showingCount: 20,
    ticketsSold: 500,
    events: [
      {
        id: 1,
        name: "Anh hùng",
        actualRevenue: 1800000000,
        details: [],
      },
      {
        id: 2,
        name: "Một nhà",
        actualRevenue: 1800000000,
        details: [],
      },
      {
        id: 3,
        name: "Xương rồng con",
        actualRevenue: 1800000000,
        isExpanded: true,
        details: [
          {
            id: 1,
            startDate: "28/05/2024",
            endDate: "28/05/2024",
            revenue: 100000000,
            tickets: [],
          },
        ],
      },
    ],
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState({
    fromDate: "",
    toDate: "",
  })

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, dateRange)
  }
  const [selectedFilter, setSelectedFilter] = useState(organization.name)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  // Toggle event expansion
  const toggleEvent = (eventId: number) => {
    setOrganization((prev) => ({
      ...prev,
      events: prev.events.map((event) => {
        if (event.id === eventId) {
          return { ...event, isExpanded: !event.isExpanded }
        }
        return event
      }),
    }))
  }

  // Toggle event detail expansion
  const toggleEventDetail = (eventId: number, detailId: number) => {
    setOrganization((prev) => ({
      ...prev,
      events: prev.events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
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
    }))
  }

  // Reset filter
  const resetFilter = () => {
    setSelectedFilter(organization.name)
    setSearchTerm("")
  }

  return (
    <div className="container p-4">
      {/* Header */}
      <div className="mb-6">
        <Link href="/admin/revenue-management" className="flex items-center text-[#0C4762] font-bold text-xl mb-2">
          <ArrowLeft className="mr-2" /> {organization.name}
        </Link>
        <div className="border-b border-[#0C4762] pb-2">
          <p className="text-gray-600">Thông tin doanh thu chi tiết của nhà tổ chức</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center border rounded-md overflow-hidden bg-white">
          <div className="flex items-center px-4 py-2">
            <span className="text-sm">Chọn nhà tổ chức</span>
          </div>
          <div className="relative border-l">
            <select
              className="appearance-none bg-white px-4 py-2 pr-8 outline-none"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value={organization.name}>{organization.name}</option>
              <option value="Nhà hát lớn">Nhà hát lớn</option>
              <option value="Sân khấu kịch">Sân khấu kịch</option>
              <option value="Trung tâm văn hóa">Trung tâm văn hóa</option>
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

      {/* Organization Info */}
      <div className="mb-4">
        <span className="inline-block bg-amber-100 px-3 py-2 rounded-md">
          <span className="font-semibold">Email:</span> {organization.email}
        </span>
      </div>
      <div className="mb-6">
        <span className="inline-block bg-green-100 px-3 py-2 rounded-md">
          <span className="font-semibold">Địa điểm tổ chức sự kiện nhiều nhất:</span> {organization.location}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold">{formatCurrency(organization.totalRevenue)}</h3>
          <p className="text-gray-500">Tổng doanh thu</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold">{organization.eventCount}</h3>
          <p className="text-gray-500">Sự kiện đã tổ chức</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold">{organization.showingCount}</h3>
          <p className="text-gray-500">Showing</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold">{organization.ticketsSold}</h3>
          <p className="text-gray-500">Vé đã bán ra</p>
        </div>
      </div>

      {/* Search and Date Filter */}
      <div className="w-full p-4 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-80 lg:w-96">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên sự kiện, tên nhà tổ chức, ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-12 py-2 h-11 bg-white border border-gray-200 rounded-md w-full outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-11 w-12 bg-teal-400 hover:bg-teal-500 rounded-r-md flex items-center justify-center"
                >
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
      
              <div className="flex gap-4 items-center items-end">
                <div className="flex border border-gray-300 rounded-md bg-white">
                  <div className="flex items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Từ ngày:</span>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={dateRange.fromDate}
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          fromDate: e.target.value,
                          // nếu toDate hiện tại nhỏ hơn fromDate mới thì reset lại toDate
                          toDate:
                            dateRange.toDate && new Date(e.target.value) > new Date(dateRange.toDate)
                              ? ""
                              : dateRange.toDate,
                        })
                      }
                      className="border-0 outline-none px-2 py-2"
                    />
                  </div>
                  <div className="flex items-center px-4 py-2">
                    <span className="text-sm text-gray-600">Đến ngày:</span>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={dateRange.toDate}
                      min={dateRange.fromDate}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, toDate: e.target.value })
                      }
                      className="border-0 outline-none px-2 py-2"
                    />
                  </div>
                </div>
      
                <button
                  onClick={handleSearch}
                  className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded-md"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>

      {/* Events Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow mt-4  mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0C4762] text-white">
              <th className="py-2 px-4 text-left w-16">STT</th>
              <th className="py-2 px-4 text-left">Tên sự kiện</th>
              <th className="py-2 px-4 text-left">Doanh thu thực nhận</th>
              <th className="py-2 px-4 text-left">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {organization.events.map((event) => (
              <Fragment key={`event-${event.id}`}>
                <tr
                  className={`cursor-pointer hover:bg-[#EAFDFC] ${event.isExpanded ? "bg-[#EAFDFC]" : "bg-white"}`}
                  onClick={() => toggleEvent(event.id)}
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

                {/* Event Details */}
                {event.isExpanded && event.details.length > 0 && (
                  <tr>
                    <td colSpan={4} className="p-0">
                      <div className="ml-4 bg-[#F0FFFF]">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#C1ECE4]">
                              <th className="py-2 px-4 text-left w-16">STT</th>
                              <th className="py-2 px-4 text-left">Ngày bắt đầu</th>
                              <th className="py-2 px-4 text-left">Ngày kết thúc</th>
                              <th className="py-2 px-4 text-left">Tổng doanh thu</th>
                              <th className="py-2 px-4 text-left">Xem chi tiết</th>
                            </tr>
                          </thead>
                          <tbody>
                            {event.details.map((detail) => (
                              <Fragment key={`detail-${event.id}-${detail.id}`}>
                                <tr
                                  className={`cursor-pointer hover:bg-[#D2F5E3] ${
                                    detail.isExpanded ? "bg-[#D2F5E3]" : ""
                                  }`}
                                  onClick={() => toggleEventDetail(event.id, detail.id)}
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
                                  <td className="py-2 px-4 border-t">{formatCurrency(detail.revenue)}</td>
                                  <td className="py-2 px-4 border-t">
                                    <button
                                      className="inline-flex items-center justify-center"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        window.location.href = `/admin/revenue-management/showing/${detail.id}`
                                      }}
                                    >
                                      <ExternalLink className="w-5 h-5" />
                                    </button>
                                  </td>
                                </tr>

                                {/* Ticket Details */}
                                {detail.isExpanded && detail.tickets.length > 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-0">
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
                                                key={`ticket-${event.id}-${detail.id}-${ticket.id}`}
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
