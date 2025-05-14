"use client"

import { useState, Fragment, useEffect } from "react"
import { ArrowLeft, ChevronDown, ChevronRight, ExternalLink, Search, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getRevenueByOrgId } from "@/services/admin.service"
import { EventRevenueData, ShowingRevenueData, TicketTypeRevenueData } from "@/types/model/orgRevenueById"

// Types
type TicketRevenue = {
  id: string;
  type: string;
  price: number;
  quantity: number;
  revenue: number;
};

type EventDetail = {
  id: string;
  startDate: string;
  endDate: string;
  revenue: number;
  tickets: TicketRevenue[];
  isExpanded?: boolean;
};

type Event = {
  id: number;
  name: string;
  actualRevenue: number;
  details: EventDetail[];
  isExpanded?: boolean;
};

type Organization = {
  id: string;
  name: string;
  email: string;
  location: string;
  totalRevenue: number;
  eventCount: number;
  showingCount: number;
  ticketsSold: number;
  events: Event[];
};

export default function OrganizationRevenuePage() {
  const params = useParams()
  const orgId = params.orgId as string
  const [organization, setOrganization] = useState<Organization | null>(null);
const [searchQuery, setSearchQuery] = useState("")
const [dateRange, setDateRange] = useState({
  fromDate: "",
  toDate: "",
})

  const fetchData = async () => {
    try {
      const storedOrg = localStorage.getItem("selectedOrg");
      let parsedOrg;
      if (storedOrg) {
        parsedOrg = JSON.parse(storedOrg);
      }
      const response = await getRevenueByOrgId(orgId);
      const events: Event[] = response.data.map((event: EventRevenueData): Event => ({
        id: event.eventId,
        name: event.eventName,
        actualRevenue: event.actualRevenue,
        isExpanded: false,
        details: event.showings.map((show: ShowingRevenueData): EventDetail => ({
          id: show.showingId,
          startDate: show.startDate,
          endDate: show.endDate,
          revenue: show.revenue,
          isExpanded: false,
          tickets: show.ticketTypes.map((t: TicketTypeRevenueData): TicketRevenue => ({
            id: t.ticketTypeId,
            type: t.name,
            price: t.price,
            quantity: t.quantitySold,
            revenue: t.revenue,
          })),
        })),
      }));

      const totalRevenue = events.reduce((sum, e) => sum + e.actualRevenue, 0);
      const showingCount = events.reduce((sum, e) => sum + e.details.length, 0);
      const ticketsSold = events.reduce(
        (sum, e) =>
          sum +
          e.details.reduce((innerSum, d) => innerSum + d.tickets.reduce((tSum, t) => tSum + t.quantity, 0), 0),
        0
      );

      setOrganization({
        id: orgId,
        name: parsedOrg.name, // Replace with real name from user/org service if available
        email: parsedOrg.id, // Replace with real data
        location: "Địa điểm phổ biến", // Replace with real data
        totalRevenue,
        eventCount: events.length,
        showingCount,
        ticketsSold,
        events,
      });
    } catch (error) {
      console.error("Failed to fetch revenue by orgId", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orgId]);

  const filteredEvents = organization?.events.filter((event) => {
    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : event.name.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesDateRange =
      !dateRange.fromDate && !dateRange.toDate
        ? true
        : event.details.some((detail) => {
            const showDate = new Date(detail.startDate);
            const from = dateRange.fromDate ? new Date(dateRange.fromDate) : null;
            const to = dateRange.toDate ? new Date(dateRange.toDate) : null;
  
            if (from && showDate < from) return false;
            if (to && showDate > to) return false;
  
            return true;
          });
  
    return matchesSearch && matchesDateRange;
  });

  const [] = useState("")

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, dateRange)
  }
  const [selectedFilter, setSelectedFilter] = useState(organization?.name ?? '');

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  // Toggle event expansion
  const toggleEvent = (eventId: number) => {
    if (!organization) return;
    setOrganization({
      ...organization,
      events: organization.events.map((event) =>
        event.id === eventId ? { ...event, isExpanded: !event.isExpanded } : event
      ),
    });
  };

  // Toggle event detail expansion
  const toggleEventDetail = (eventId: number, detailId: string) => {
    if (!organization) return;
    setOrganization({
      ...organization,
      events: organization.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              details: event.details.map((detail) =>
                detail.id === detailId ? { ...detail, isExpanded: !detail.isExpanded } : detail
              ),
            }
          : event
      ),
    });
  };

  // Reset filter
  const resetFilter = () => {
    setSearchQuery("");
    setDateRange({ fromDate: "", toDate: "" });
  };

  if (!organization) return <p>Loading...</p>;

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
      {/* <div className="mb-6">
        <span className="inline-block bg-green-100 px-3 py-2 rounded-md">
          <span className="font-semibold">Địa điểm tổ chức sự kiện nhiều nhất:</span> {organization.location}
        </span>
      </div> */}

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
      
              <div className="flex gap-4 items-center justify-end">
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
            {filteredEvents?.map((event) => (
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
