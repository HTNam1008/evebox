"use client"

import { useState, Fragment, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { RevenueOrgTable } from "../org/revenue-org-table"
import { getOrganizerRevenue } from "@/services/admin.service"; 
import { ShowingRevenueData, TicketTypeRevenueData } from "@/types/model/organizerRevenue";

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
  isExpanded?: boolean; // for toggling UI
  selectedDetailId?: string; // to track selected showing
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

export function RevenueAppTable() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  const [appRevenues, setAppRevenues] = useState<AppRevenue[]>([]);


  const mapToAppRevenue = async () => {
    try {
      const response = await getOrganizerRevenue();
  
      if (!response?.data || response.data.length === 0) {
        setAppRevenues([]);
        return;
      }
  
      const organizations = response.data.map((org): Organization => ({
        id: org.orgId, // If your Organization interface uses `number`, convert with: parseInt(org.orgId)
        name: org.organizerName,
        actualRevenue: org.actualRevenue,
        events: org.events.map((event):EventRevenue => ({
          id: event.eventId,
          name: event.eventName,
          totalRevenue: event.totalRevenue,
          platformFee: event.platformFeePercent,
          actualRevenue: event.actualRevenue,
          showings: event.showings.map((show):ShowingRevenueData => ({
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
        id: 1, // static or dynamic ID
        totalRevenue: response.data.reduce((sum, org) => sum + org.totalRevenue, 0),
        systemDiscount: response.data[0].platformFeePercent ?? 10,
        actualRevenue: response.data.reduce((sum, org) => sum + org.actualRevenue, 0),
        isExpanded: true,
        organizations,
      };
  
      setAppRevenues([app]);
    } catch (error) {
      console.error("Failed to fetch organizer revenue", error);
    }
  };
  
  useEffect(() => {
    mapToAppRevenue();
  }, []);

  const toggleAppRevenue = (appId: number) => {
    setAppRevenues((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return { ...app, isExpanded: !app.isExpanded }
        }
        return app
      }),
    )
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
    setAppRevenues((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            organizations: app.organizations.map((org) => {
              if (org.id === orgId) {
                return {
                  ...org,
                  selectedEventId: eventId,
                  events: org.events.map((ev) =>
                    ev.id === eventId
                      ? { ...ev, isExpanded: !ev.isExpanded }
                      : ev
                  ),
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

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <button className="bg-[#0C4762] text-white px-4 py-2 rounded-md hover:bg-[#51DACF] transition-colors">
          Xuất báo cáo
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0C4762] text-white">
              <th className="py-3 px-4 text-left w-16">STT</th>
              <th className="py-3 px-4 text-left">Tổng doanh thu</th>
              <th className="py-3 px-4 text-left">Chiết khấu hệ thống</th>
              <th className="py-3 px-4 text-left">Doanh thu thực nhận</th>
            </tr>
          </thead>
          <tbody>
            {appRevenues.map((app) => (
              <Fragment key={`app-${app.id}`}>
                <tr className="cursor-pointer hover:bg-[#E8FFFF]" onClick={() => toggleAppRevenue(app.id)}>
                  <td className="py-3 px-4 border-t flex items-center">
                    {app.isExpanded ? (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-1" />
                    )}
                    {app.id}
                  </td>
                  <td className="py-3 px-4 border-t">{formatCurrency(app.totalRevenue)}</td>
                  <td className="py-3 px-4 border-t">{app.systemDiscount}%</td>
                  <td className="py-3 px-4 border-t">{formatCurrency(app.actualRevenue)}</td>
                </tr>

                {app.isExpanded && app.organizations.length > 0 && (
                  <tr>
                    <td colSpan={4} className="p-0">
                      <div className="ml-4">
                        <RevenueOrgTable
                          organizations={app.organizations}
                          appId={app.id}
                          toggleOrganization={toggleOrganization}
                          toggleEvent={toggleEvent}
                          toggleEventDetail={toggleEventDetail}
                          formatCurrency={formatCurrency}
                        />
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
