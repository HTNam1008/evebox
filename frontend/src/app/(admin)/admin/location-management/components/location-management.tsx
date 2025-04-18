"use client"

import type React from "react"

import { useState } from "react"
import { Search, FileText, RotateCcw } from "lucide-react"
import LocationTable from "./location-table"
import FilterDropdown from "./filter"

interface Venue {
  name: string
  taxLocations: string[]
  events: string[]
  organizers: string[]
}

interface Location {
  id: number
  email: string
  venues: Venue[]
}

interface LocationManagementClientProps {
  initialLocations: Location[]
  districts: string[]
  cities: string[]
}

export default function LocationManagementClient({
  initialLocations,
  districts,
  cities,
}: LocationManagementClientProps) {
  const [locations, setLocations] = useState<Location[]>(initialLocations)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleResetFilter = () => {
    setSelectedDistrict(null)
    setSelectedCity(null)
    setLocations(initialLocations)
  }

  const handleConfirmFilter = () => {
  }

  const handleExportReport = () => {
  }

  return (
    <div>
      <div className="p-6">
        <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0C4762]">Quản lý địa điểm</h1>
        {/* <p className="text-gray-700">Quản lý địa điểm của ...</p> */}
        <div className="h-0.5 w-full bg-[#0C4762] mt-4"></div>
      </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 mt-6">
          <FilterDropdown label="Quận" options={districts} value={selectedDistrict} onChange={setSelectedDistrict} />

          <FilterDropdown label="Thành phố" options={cities} value={selectedCity} onChange={setSelectedCity} />

          <button
            onClick={handleConfirmFilter}
            className="px-4 py-2 bg-[#0a3d62] text-white rounded-lg hover:bg-[#0C4762] transition-colors"
          >
            Xác nhận
          </button>

          <button
            onClick={handleResetFilter}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
          >
            <span>Đặt lại</span>
            <RotateCcw className="ml-2 w-4 h-4 text-red-500" />
          </button>
        </div>

        {/* Search and Export */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <form onSubmit={handleSearch} className="flex w-full sm:w-auto mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên địa điểm, ..."
              className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-l-lg w-full sm:w-80 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-400 text-white rounded-r-lg hover:bg-teal-500 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-[#0C4762] text-white rounded-lg hover:bg-teal transition-colors flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </button>
        </div>

        {/* Table */}
        <LocationTable locations={locations} />
      </div>
    </div>
  )
}
