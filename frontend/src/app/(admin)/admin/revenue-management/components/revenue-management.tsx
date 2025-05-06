"use client"

import { useState } from "react"
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

export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState<"app" | "organization" | "event">("app")
  const [activeSubTab, setActiveSubTab] = useState<"day" | "location" | "price">("day")

  const [filter, setFilter] = useState<{
    type: "all" | "month" | "year"
    from: string
    to: string
  }>({
    type: "all",
    from: "",
    to: ""
  })

  const handleConfirm = () => {
    //console.log("Filter đã xác nhận:", filter)

  }

  const handleReset = () => {
    //console.log("Đặt lại bộ lọc")
    setFilter({ type: "all", from: "", to: "" })
  }

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
            <RevenueChart />
            <RevenueAppTable />
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
          <Filter/>
          <RevenueOrgTable formatCurrency={formatCurrency} />
        </>
        )}
      {activeTab === "event" && (
        <>
          <Filter/>
          <EventRevenueTable
            formatCurrency={formatCurrency}
            toggleEvent={(orgId, eventId) => {}}
            toggleEventDetail={(orgId, eventId, detailId) => {}}
          />
        </>
      )}
    </div>
  )
}
