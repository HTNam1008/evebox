import { useState } from "react"
import { RotateCcw } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { vi } from "date-fns/locale"
import { format } from "date-fns"

interface RevenueFilterProps {
  onConfirm: () => void
  onReset: () => void
}

export default function RevenueFilter({ onConfirm, onReset }: RevenueFilterProps) {
  const [filterType, setFilterType] = useState<"all" | "month" | "year">("all")
  const [fromMonth, setFromMonth] = useState<Date | null>(null)
  const [toMonth, setToMonth] = useState<Date | null>(null)
  const [fromYear, setFromYear] = useState<string>("")
  const [toYear, setToYear] = useState<string>("")

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as "all" | "month" | "year"
    setFilterType(type)
    setFromMonth(null)
    setToMonth(null)
    setFromYear("")
    setToYear("")
  }

  const handleReset = () => {
    setFilterType("all")
    setFromMonth(null)
    setToMonth(null)
    setFromYear("")
    setToYear("")
    onReset()
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-10">
      <div className="w-60">
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      {filterType === "month" && (
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600 mb-1">Từ tháng</span>
            <DatePicker
              selected={fromMonth}
              onChange={(date) => {
                setFromMonth(date)
                if (toMonth && date && toMonth < date) {
                  setToMonth(null)
                }
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              locale={vi}
              placeholderText="Chọn tháng"
              className="w-36 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              calendarClassName="!rounded-xl !shadow-xl !border border-gray-200 p-4"
              popperClassName="z-50"
            />
          </div>
          <span>|</span>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600 mb-1">Đến tháng</span>
            <DatePicker
              selected={toMonth}
              onChange={(date) => setToMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              locale={vi}
              placeholderText="Chọn tháng"
              className="w-36 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              calendarClassName="!rounded-xl !shadow-xl !border border-gray-200 p-4"
              popperClassName="z-50"
              minDate={fromMonth || undefined}
            />
          </div>
        </div>
      )}

      {filterType === "year" && (
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-sm text-gray-600">Từ năm</span>
            <DatePicker
              selected={fromYear ? new Date(`${fromYear}-01-01`) : null}
              onChange={(date) => {
                setFromYear(date ? format(date, "yyyy") : "")
                if (toYear && Number(toYear) < Number(fromYear)) {
                  setToYear("")
                }
              }}
              showYearPicker
              dateFormat="yyyy"
              locale={vi}
              placeholderText="Chọn năm"
              className="w-36 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              calendarClassName="!rounded-xl !shadow-xl !border border-gray-200 p-4"
              popperClassName="z-50"
            />
          </div>
          <span>|</span>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-sm text-gray-600">Đến năm</span>
            <DatePicker
              selected={toYear ? new Date(`${toYear}-01-01`) : null}
              onChange={(date) => setToYear(date ? format(date, "yyyy") : "")}
              showYearPicker
              dateFormat="yyyy"
              locale={vi}
              placeholderText="Chọn năm"
              className="w-36 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              calendarClassName="!rounded-xl !shadow-xl !border border-gray-200 p-4"
              popperClassName="z-50"
              minDate={fromYear ? new Date(`${fromYear}-01-01`) : undefined}
            />
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={onConfirm}
          className="bg-[#0C4762] text-white px-6 py-2 rounded-md hover:bg-[#0c4b78] transition-colors"
        >
          Xác nhận
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
        >
          <span>Đặt lại</span>
          <RotateCcw className="ml-2 w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  )
}
