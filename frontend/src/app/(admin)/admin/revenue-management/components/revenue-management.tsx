"use client"

import { useState } from "react"
import RevenueHeader from "./revenue-header"
import RevenueTabs from "./revenue-tabs"
import { RevenueAppTable } from "../components/app/revenue-app-table"
import { RevenueOrgTable } from "../components/org/revenue-org-table"
import { EventRevenueTable } from "./revenue-event-table"
import RevenueChart from "./app/revenue-chart"
import RevenueFilter from "./app/revenue-filter"
import Filter from "./filter"

export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState<"app" | "organization" | "event">("app")

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

  return (
    <div className="container mx-auto px-4">
      <RevenueHeader />
      <div className="mt-6">
        <RevenueTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "app" && (
        <>
          <RevenueFilter
            onConfirm={handleConfirm}
            onReset={handleReset}
          />
          <RevenueChart />
          <RevenueAppTable />
        </>
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
