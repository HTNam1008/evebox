"use client"

import { useState, Fragment } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { RevenueOrgTable, type Organization } from "../org/revenue-org-table"

export type AppRevenue = {
  id: number
  totalRevenue: number
  systemDiscount: number
  actualRevenue: number
  organizations: Organization[]
  isExpanded?: boolean
  selectedOrgId?: number
}

export function RevenueAppTable() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  // Dữ liệu mẫu
  const [appRevenues, setAppRevenues] = useState<AppRevenue[]>([
    {
      id: 1,
      totalRevenue: 100000000,
      systemDiscount: 10,
      actualRevenue: 100000000,
      isExpanded: true,
      selectedOrgId: 3,
      organizations: [
        {
          id: 1,
          name: "Evebox",
          actualRevenue: 100000000,
          events: [],
        },
        {
          id: 2,
          name: "Evebox",
          actualRevenue: 100000000,
          events: [],
        },
        {
          id: 3,
          name: "Evebox",
          actualRevenue: 100000000,
          isExpanded: true,
          selectedEventId: 2,
          events: [
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
          ],
        },
      ],
    },
  ])

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

  const toggleOrganization = (appId: number, orgId: number) => {
    setAppRevenues((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            selectedOrgId: orgId,
            organizations: app.organizations.map((org) => {
              if (org.id === orgId) {
                return { ...org, isExpanded: !org.isExpanded }
              }
              return org
            }),
          }
        }
        return app
      }),
    )
  }

  const toggleEvent = (appId: number, orgId: number, eventId: number) => {
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
                  events: org.events.map((event) => {
                    if (event.id === eventId) {
                      return { ...event, isExpanded: !event.isExpanded }
                    }
                    return event
                  }),
                }
              }
              return org
            }),
          }
        }
        return app
      }),
    )
  }

  const toggleEventDetail = (appId: number, orgId: number, eventId: number, detailId: number) => {
    setAppRevenues((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            organizations: app.organizations.map((org) => {
              if (org.id === orgId) {
                return {
                  ...org,
                  events: org.events.map((event) => {
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
                }
              }
              return org
            }),
          }
        }
        return app
      }),
    )
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
