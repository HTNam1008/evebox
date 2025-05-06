"use client"

type SubTabType = "day" | "location" | "price"

interface RevenueSubTabsProps {
  activeSubTab: SubTabType
  onSubTabChange: (tab: SubTabType) => void
}

export default function RevenueSubTabs({ activeSubTab, onSubTabChange }: RevenueSubTabsProps) {
  return (
    <div className="flex justify-center border-b mb-4 space-x-8 mt-4">
      <button
        onClick={() => onSubTabChange("day")}
        className={`py-2 px-4 text-sm font-medium relative ${
            activeSubTab === "day" 
              ? "text-[#0C4762] border-b-2 border-[#0C4762]" 
              : "text-gray-600 hover:text-[#0C4762]"
          }`}
      >
        Theo ngày
      </button>
      <button
        onClick={() => onSubTabChange("location")}
        className={`
          "py-2 px-4 text-sm font-medium relative",
          ${activeSubTab === "location"
            ? "text-[#0C4762] border-b-2 border-[#0C4762]"
            : "text-gray-600 hover:text-[#0C4762]"
          }`}
      >
        Theo tỉnh thành
      </button>
      <button
        onClick={() => onSubTabChange("price")}
        className={`
          "py-2 px-4 text-sm font-medium relative",
          ${activeSubTab === "price"
            ? "text-[#0C4762] border-b-2 border-[#0C4762]"
            : "text-gray-600 hover:text-[#0C4762]"
          }`}
      >
        Theo giá vé
      </button>
    </div>
  )
}
