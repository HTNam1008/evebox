"use client"

interface RevenueTabsProps {
  activeTab: "app" | "organization" | "event"
  onTabChange: (tab: "app" | "organization" | "event") => void
}

export default function RevenueTabs({ activeTab, onTabChange }: RevenueTabsProps) {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-full max-w-4xl">
        <button
          onClick={() => onTabChange("app")}
          className={`px-6 py-3 rounded-full text-center transition-colors min-w-[200px] ${
            activeTab === "app" ? "bg-[#0C4762] text-white" : "bg-[#a8e6cf] text-gray-700 hover:bg-[#8ddfc4]"
          }`}
        >
          Doanh thu ứng dụng
        </button>
        <button
          onClick={() => onTabChange("organization")}
          className={`px-6 py-3 rounded-full text-center transition-colors min-w-[200px] ${
            activeTab === "organization" ? "bg-[#0C4762] text-white" : "bg-[#a8e6cf] text-gray-700 hover:bg-[#8ddfc4]"
          }`}
        >
          Doanh thu nhà tổ chức
        </button>
        <button
          onClick={() => onTabChange("event")}
          className={`px-6 py-3 rounded-full text-center transition-colors min-w-[200px] ${
            activeTab === "event" ? "bg-[#0C4762] text-white" : "bg-[#a8e6cf] text-gray-700 hover:bg-[#8ddfc4]"
          }`}
        >
          Doanh thu sự kiện
        </button>
      </div>
    </div>
  )
}
