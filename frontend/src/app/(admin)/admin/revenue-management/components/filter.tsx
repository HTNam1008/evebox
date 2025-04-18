"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function Filter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState({
    fromDate: "",
    toDate: "",
  })

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, dateRange)
  }

  return (
    <div className="w-full p-4 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80 lg:w-96">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên sự kiện, tên nhà tổ chức, ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-12 py-2 h-11 bg-gray-100 border border-gray-200 rounded-md w-full outline-none"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 h-11 w-12 bg-teal-400 hover:bg-teal-500 rounded-r-md flex items-center justify-center"
          >
            <Search className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="flex gap-4 items-center items-end">
          <div className="flex border border-gray-300 rounded-md">
            <div className="flex items-center px-4 py-2">
              <span className="text-sm text-gray-600">Từ ngày</span>
            </div>
            <div className="border-l border-r border-gray-300">
              <input
                type="date"
                value={dateRange.fromDate}
                onChange={(e) =>
                  setDateRange({
                    ...dateRange,
                    fromDate: e.target.value,
                    // nếu toDate hiện tại nhỏ hơn fromDate mới thì reset lại toDate
                    toDate:
                      dateRange.toDate && new Date(e.target.value) > new Date(dateRange.toDate)
                        ? ""
                        : dateRange.toDate,
                  })
                }
                className="border-0 outline-none px-2 py-2"
              />
            </div>
            <div className="flex items-center px-4 py-2">
              <span className="text-sm text-gray-600">Đến ngày</span>
            </div>
            <div>
              <input
                type="date"
                value={dateRange.toDate}
                min={dateRange.fromDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, toDate: e.target.value })
                }
                className="border-0 outline-none px-2 py-2"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded-md"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}
