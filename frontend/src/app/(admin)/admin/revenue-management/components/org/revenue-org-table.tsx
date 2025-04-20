"use client"

import React from "react"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { EventRevenueTable, type Event } from "../revenue-event-table"

export type Organization = {
  id: number
  name: string
  actualRevenue: number
  events: Event[]
  isExpanded?: boolean
  selectedEventId?: number
}

export interface RevenueOrgTableProps {
  organizations?: Organization[]
  appId?: number
  toggleOrganization?: (appId: number, orgId: number) => void
  toggleEvent?: (appId: number, orgId: number, eventId: number) => void
  toggleEventDetail?: (appId: number, orgId: number, eventId: number, detailId: number) => void
  formatCurrency: (amount: number) => string
  className?: string
}

export function RevenueOrgTable({
  organizations: propOrganizations,
  appId = 0,
  toggleOrganization: propToggleOrganization,
  toggleEvent: propToggleEvent,
  toggleEventDetail: propToggleEventDetail,
  formatCurrency,
  className = "",
}: RevenueOrgTableProps) {

  const [localOrganizations, setLocalOrganizations] = useState<Organization[]>([
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
  ])

  // Sử dụng dữ liệu được truyền vào nếu có, nếu không sử dụng dữ liệu mẫu
  const organizations = propOrganizations || localOrganizations

  const handleToggleOrganization = (orgId: number) => {
    if (!propOrganizations) {
      setLocalOrganizations((prev) =>
        prev.map((org) => {
          if (org.id === orgId) {
            return { ...org, isExpanded: !org.isExpanded }
          }
          return org
        }),
      )
    } else if (propToggleOrganization) {
      propToggleOrganization(appId, orgId)
    }
  }

  const handleToggleEvent = (orgId: number, eventId: number) => {
    if (!propOrganizations) {
      setLocalOrganizations((prev) =>
        prev.map((org) => {
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
      )
    } else if (propToggleEvent) {
      propToggleEvent(appId, orgId, eventId)
    }
  }

  const handleToggleEventDetail = (orgId: number, eventId: number, detailId: number) => {
    if (!propOrganizations) {
      setLocalOrganizations((prev) =>
        prev.map((org) => {
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
      )
    } else if (propToggleEventDetail) {
      propToggleEventDetail(appId, orgId, eventId, detailId)
    }
  }

  if (organizations.length === 0) return null

  return (
    <div className={`${className} mt-6`}>
      {!propOrganizations && (
        <div className="flex justify-end mb-4">
          <button className="bg-[#0C4762] text-white px-4 py-2 rounded-md hover:bg-[#51DACF] transition-colors">
            Xuất báo cáo
          </button>
        </div>
      )}

      <div className={`${!propOrganizations ? "overflow-hidden rounded-lg border border-gray-200" : ""}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className={propOrganizations ? "bg-[#41AEA9]" : "bg-[#0C4762] text-white"}>
              <th className="py-2 px-4 text-left w-16">STT</th>
              <th className="py-2 px-4 text-left">Tên nhà tổ chức</th>
              <th className="py-2 px-4 text-left" colSpan={2}>
                Doanh thu thực nhận
              </th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <React.Fragment key={`org-${appId}-${org.id}`}>
                <tr className={`cursor-pointer hover:bg-[#E3FEF7]`} onClick={() => handleToggleOrganization(org.id)}>
                  <td className="py-2 px-4 border-t flex items-center">
                    {org.events.length > 0 && (
                      <>
                        {org.isExpanded ? (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                      </>
                    )}
                    {org.id}
                  </td>
                  <td className="py-2 px-4 border-t">{org.name}</td>
                  <td className="py-2 px-4 border-t" colSpan={2}>
                    {formatCurrency(org.actualRevenue)}
                  </td>
                </tr>

                {org.isExpanded && org.events.length > 0 && (
                  <tr>
                    <td colSpan={4} className="p-0">
                      <div className="ml-4">
                        <EventRevenueTable
                          events={org.events}
                          orgId={org.id}
                          toggleEvent={(orgId, eventId) => handleToggleEvent(orgId, eventId)}
                          toggleEventDetail={(orgId, eventId, detailId) =>
                            handleToggleEventDetail(orgId, eventId, detailId)
                          }
                          className="mt-0"
                          formatCurrency={formatCurrency}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
