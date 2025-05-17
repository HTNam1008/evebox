"use client"

import { Fragment } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { RevenueOrgTable } from "../org/revenue-org-table"
import { AppRevenue } from "../revenue-management"
import { Loader } from "lucide-react";


interface RevenueAppTableProps {
  fromDate?: string
  toDate?: string
  appRevenues: AppRevenue[]
  setAppRevenues: React.Dispatch<React.SetStateAction<AppRevenue[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function RevenueAppTable({
  appRevenues,
  setAppRevenues,
  loading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading,
}: RevenueAppTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

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
                          loading
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
