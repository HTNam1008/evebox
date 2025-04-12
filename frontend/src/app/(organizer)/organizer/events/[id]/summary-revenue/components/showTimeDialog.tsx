"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

interface ShowTime {
  date: string
  time: string
  isSelected?: boolean
}

interface ShowTimesPopupProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (selectedShowTime: ShowTime) => void
  showTimes: ShowTime[]
}

export const ShowTimesPopup = ({ isOpen, onClose, onConfirm, showTimes }: ShowTimesPopupProps) => {
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(
    showTimes.find((st) => st.isSelected) || null,
  )

  if (!isOpen) return null

  const handleConfirm = () => {
    if (selectedShowTime) {
      onConfirm(selectedShowTime)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium text-[#0C4762]">Danh sách suất diễn</h2>
          <button onClick={onClose} className="text-black hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[300px] overflow-y-auto p-4">
          {showTimes.map((showTime) => (
            <div
              key={`${showTime.date}-${showTime.time}`}
              className={`flex justify-between items-center p-3 mb-2 cursor-pointer rounded-md hover:bg-gray-100 ${
                selectedShowTime && selectedShowTime.date === showTime.date && selectedShowTime.time === showTime.time
                  ? "bg-gray-100"
                  : ""
              }`}
              onClick={() => setSelectedShowTime(showTime)}
            >
              <span className="text-black">
                {showTime.date} - {showTime.time}
              </span>
              {selectedShowTime &&
                selectedShowTime.date === showTime.date &&
                selectedShowTime.time === showTime.time && <Check size={18} className="text-green-500" />}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4">
          <button
            onClick={handleConfirm}
            className="w-full py-3 bg-[#0C4762] text-white rounded-md hover:bg-[#0A3A50] transition"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}
