"use client";

import {Fragment } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Loader } from "lucide-react";
import { EventRevenueTable } from "../revenue-event-table";
import { TicketTypeRevenueData } from "@/types/model/organizerRevenue";

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

// Update id type to string
export type Organization = {
  id: string;
  name: string;
  actualRevenue: number;
  events: EventRevenue[];
  isExpanded?: boolean;
  selectedEventId?: number;
  orgId?: string;
  orgName?: string;
};

export interface RevenueOrgTableProps {
  organizations?: Organization[];
  appId?: number;
  toggleOrganization?: (appId: number, orgId: string) => void;
  toggleEvent?: (appId: number, orgId: string, eventId: number) => void;
  toggleEventDetail?: (appId: number, orgId: string, eventId: number, showingId: string) => void;
  formatCurrency: (amount: number) => string;
  className?: string;
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

  const organizations = propOrganizations;

  const handleToggleOrganization = (orgId: string) => {
    if (propToggleOrganization) {
      propToggleOrganization(appId, orgId);
    }
  };
  
  const handleToggleEvent = (orgId: string, eventId: number) => {
    if (propToggleEvent) {
      propToggleEvent(appId, orgId, eventId);
    }
  };
  
  const handleToggleEventDetail = (orgId: string, eventId: number, detailId: string) => {
    if (propToggleEventDetail) {
      propToggleEventDetail(appId, orgId, eventId, detailId);
    }
  }

  if (organizations?.length === 0 ) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className={className}>
      {!propOrganizations && (
        <div className="flex justify-end mb-4">
          <button className="bg-[#0C4762] text-white px-4 py-2 rounded-md hover:bg-[#51DACF] transition-colors">
            Xuất báo cáo
          </button>
        </div>
      )}

      <div className={!propOrganizations ? "overflow-hidden rounded-lg border border-gray-200" : ""}>
        <table className="w-full text-sm">
          <thead>
            <tr className={propOrganizations ? "bg-[#41AEA9]" : "bg-[#0C4762] text-white"}>
              <th className="py-2 px-4 text-left w-16">STT</th>
              <th className="py-2 px-4 text-left">Tên nhà tổ chức</th>
              <th className="py-2 px-4 text-left" colSpan={2}>Doanh thu thực nhận</th>
              <th className="py-2 px-4 text-center">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {organizations?.map((org, index) => (
              <Fragment key={`org-${appId}-${org.id}`}>
                <tr className="cursor-pointer hover:bg-[#E3FEF7]" onClick={() => handleToggleOrganization(org.id)}>
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
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-t">{org.name}</td>
                  <td className="py-2 px-4 border-t" colSpan={2}>{formatCurrency(org.actualRevenue)}</td>
                  <td className="py-2 px-4 border-t text-center">
                    <button
                      className="inline-flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        localStorage.setItem("selectedOrg", JSON.stringify(org));
                        localStorage.setItem("appRevenue", JSON.stringify(organizations));
                        window.location.href = `/admin/revenue-management/revenue/${org.id}`;
                      }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

                {org.isExpanded && org.events.length > 0 && (
                  <tr>
                    <td colSpan={5} className="p-0">
                      <div className="ml-4">
                        <EventRevenueTable
                          events={org.events}
                          orgId={org.id}
                          toggleEvent={handleToggleEvent}
                          toggleEventDetail={handleToggleEventDetail}
                          formatCurrency={formatCurrency}
                          className="mt-0"
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
  );
}
