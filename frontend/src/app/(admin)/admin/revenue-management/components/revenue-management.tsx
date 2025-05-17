"use client"

import { useEffect, useState } from "react"
import RevenueTabs from "./revenue-tabs"
import { RevenueAppTable } from "../components/app/revenue-app-table"
import { RevenueOrgTable } from "../components/org/revenue-org-table"
import { EventRevenueTable } from "./revenue-event-table"
import RevenueChart from "./app/revenue-chart"
import RevenueFilter from "./app/revenue-filter"
import Filter from "./filter"
import RevenueSubTabs from "./app/revenue-subtabs"
import LocationRevenueView from "./app/location-revenue"
import PriceRevenueView from "./app/price-revenue"
import { getOrganizerRevenue } from "@/services/admin.service"; 
import { ShowingRevenueData, TicketTypeRevenueData } from "@/types/model/organizerRevenue";
import { useMemo } from "react";

export interface ShowingRevenue {
  showingId: string;
  startDate: string; // Or Date if you're parsing it
  endDate: string;   // Or Date if you're parsing it
  revenue: number;
  ticketTypes: TicketTypeRevenueData[];
  isExpanded?: boolean;
}

export interface EventRevenue {
  id: number;
  name: string;
  totalRevenue: number;
  platformFee: number;
  actualRevenue: number;
  showings: ShowingRevenue [];
  isExpanded?: boolean;
  selectedDetailId?: string;
  orgId?: string;
  orgName?: string;
}

export type Organization = {
  id: string;
  name: string;
  actualRevenue: number;
  events: EventRevenue[];
  isExpanded?: boolean;
  selectedEventId?: number;
};

export type AppRevenue = {
  id: number
  totalRevenue: number
  systemDiscount: number
  actualRevenue: number
  organizations: Organization[]
  isExpanded?: boolean
  selectedOrgId?: string
}

export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState<"app" | "organization" | "event">("app")
  const [activeSubTab, setActiveSubTab] = useState<"day" | "location" | "price">("day")
  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();


  const [appRevenues, setAppRevenues] = useState<AppRevenue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    console.log("Active-----",activeTab);
    // Reset filters when switching tabs
    setFromDate(undefined);
    setToDate(undefined);
    setSearch(undefined);
  }, [activeTab]);


  useEffect(() => {
    const mapToAppRevenue = async () => {
      try {
        setLoading(true);
        const response = await getOrganizerRevenue(fromDate, toDate, search);
  
        if (!response?.data || response.data.length === 0) {
          setAppRevenues([]);
          return;
        }
  
        const organizations = response.data.map((org): AppRevenue["organizations"][0] => ({
          id: org.orgId,
          name: org.organizerName,
          actualRevenue: org.actualRevenue,
          events: org.events.map((event): EventRevenue => ({
            id: event.eventId,
            name: event.eventName,
            totalRevenue: event.totalRevenue,
            platformFee: event.platformFeePercent,
            actualRevenue: event.actualRevenue,
            showings: event.showings.map((show): ShowingRevenueData => ({
              showingId: show.showingId,
              startDate: show.startDate,
              endDate: show.endDate,
              revenue: show.revenue,
              ticketTypes: show.ticketTypes.map((ticket): TicketTypeRevenueData => ({
                ticketTypeId: ticket.ticketTypeId,
                name: ticket.name,
                price: ticket.price,
                sold: ticket.sold,
                revenue: ticket.revenue,
              })),
            })),
          })),
        }));
  
        const app: AppRevenue = {
          id: 1,
          totalRevenue: response.data.reduce((sum, org) => sum + org.totalRevenue, 0),
          systemDiscount: response.data[0].platformFeePercent ?? 10,
          actualRevenue: response.data.reduce((sum, org) => sum + org.actualRevenue, 0),
          isExpanded: true,
          organizations,
        };
  
        setAppRevenues([app]);
      } catch (error) {
        console.error("Failed to fetch organizer revenue", error);
      } finally {
        setLoading(false);
      }
    };
  
    mapToAppRevenue();
  }, [fromDate, toDate, search]);

  const [filter, setFilter] = useState<{
    type: "month" | "year"
    from: string
    to: string
  }>({
    type: "month",
    from: "",
    to: ""
  });
  const handleConfirm = (from?: string, to?: string, type?:  "month" | "year") => {
    setFromDate(from);
    setToDate(to);
    setFilter({
      type: type ?? "month",
      from: from ?? "",
      to: to ?? "",
    });
  };

  const handleReset = () => {
    setFilter({ type: "month", from: "", to: "" });
  };

  const allOrgs: Organization[] = useMemo(() => {
    if (!appRevenues.length) return [];
  
    return appRevenues?.[0]?.organizations
    ?? [];
  }, [appRevenues]);


  const allEvents: EventRevenue[] = useMemo(() => {
    if (!appRevenues.length) return [];
  
    return appRevenues?.[0]?.organizations?.flatMap((org) =>
     org.events.map((event) => ({
    ...event,
    orgId: org.id,
    orgName: org.name,
  }))
  ) ?? [];
  }, [appRevenues]);

  // Hàm định dạng số tiền
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  const renderAppContent = () => {
    switch (activeSubTab) {
      case "day":
        return (
          <>
            <RevenueFilter onConfirm={handleConfirm} onReset={handleReset} />
            <RevenueChart type={filter.type} from={filter.from} to={filter.to} />
            <RevenueAppTable
  fromDate={fromDate}
  toDate={toDate}
  appRevenues={appRevenues}
  setAppRevenues={setAppRevenues}
  loading={loading}
  setLoading={setLoading}
/>
          </>
        )
      case "location":
        return (
          <>
            <LocationRevenueView />
          </>
        )
      case "price":
        return (
          <>
            <PriceRevenueView />
          </>
        )
    }
  }

    const toggleOrganization = (appId: number, orgId: string) => {
      setAppRevenues((prev) =>
        prev.map((app): AppRevenue => {
          if (app.id === appId) {
            return {
              ...app,
              selectedOrgId: orgId,
              organizations: app.organizations.map((org) =>
                org.id === orgId
                  ? { ...org, isExpanded: !org.isExpanded }
                  : org
              ),
            };
          }
          return app;
        })
      );
    };
    
  
    const toggleEvent = (appId: number, orgId: string, eventId: number) => {
      if (!appId) return;
    
      setAppRevenues((prev) =>
        prev.map((app) => ({
          ...app,
          organizations: app.organizations.map((org) =>
            org.id === orgId
              ? {
                  ...org,
                  events: org.events.map((ev) =>
                    ev.id === eventId
                      ? { ...ev, isExpanded: !ev.isExpanded }
                      : ev
                  ),
                }
              : org
          ),
        }))
      );
    };
    
  
    const toggleEventDetail = (
      appId: number,
      orgId: string,
      eventId: number,
      showingId: string
    ) => {
      setAppRevenues((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            return {
              ...app,
              organizations: app.organizations.map((org) => {
                if (org.id === orgId) {
                  return {
                    ...org,
                    events: org.events.map((ev) => {
                      if (ev.id === eventId) {
                        return {
                          ...ev,
                          selectedDetailId: showingId,
                          showings: ev.showings.map((show) =>
                            show.showingId === showingId
                              ? { ...show, isExpanded: !show.isExpanded }
                              : show
                          ),
                        };
                      }
                      return ev;
                    }),
                  };
                }
                return org;
              }),
            };
          }
          return app;
        })
      );
    };

    const handleToggleEvent = (orgId: string, eventId: number) => {
      const appId = appRevenues[0]?.id;
      if (!appId) return;
      toggleEvent(appId, orgId, eventId);
    };
    
    const handleToggleEventDetail = (orgId: string, eventId: number, showingId: string) => {
      const appId = appRevenues[0]?.id;
      if (!appId) return;
      toggleEventDetail(appId, orgId, eventId, showingId);
    };


  return (
    <div className="container mx-auto px-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0C4762]">Quản lý doanh thu</h1>
        <p className="text-gray-700">Quản lý doanh thu của ứng dụng, nhà tổ chức và sự kiện</p>
        <div className="h-0.5 w-full bg-[#0C4762] mt-4"></div>
      </div>
      <div className="mt-6">
        <RevenueTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "app" && (
        <div className="mt-4">
          <RevenueSubTabs activeSubTab={activeSubTab} onSubTabChange={setActiveSubTab} />
          {renderAppContent()}
        </div>
      )}
      {activeTab === "organization" && (
  <>
    <Filter
            key={activeTab}
      onFilterChange={(f) => {
            setFromDate(f.fromDate);
            setToDate(f.toDate);
            setSearch(f.search);
          }} />
    <RevenueOrgTable
      organizations={allOrgs}
      appId={appRevenues[0]?.id ?? ""}
      toggleOrganization={toggleOrganization}
      toggleEvent={toggleEvent}
      toggleEventDetail={toggleEventDetail}
      formatCurrency={formatCurrency}
    />
  </>
)}
     {activeTab === "event" && (
  <>
    <Filter
           key={activeTab}
          onFilterChange={(f) => {
            setFromDate(f.fromDate);
            setToDate(f.toDate);
            setSearch(f.search);
          }} />
    <EventRevenueTable
      formatCurrency={formatCurrency}
      toggleEvent={handleToggleEvent}
      toggleEventDetail={handleToggleEventDetail}
      events={allEvents}
      orgId={appRevenues[0]?.id.toString() ?? ""}
    />
  </>
)}
    </div>
  )
}
