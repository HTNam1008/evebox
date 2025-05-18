"use client"

import type React from "react"

import { FormEvent, useEffect, useState } from "react"
import { Search, FileText, RotateCcw, Loader } from "lucide-react"
import LocationTable from "./location-table"
import FilterDropdown from "./filter"
import { getAllDistricts, getAllLocations } from "@/services/admin.service"
import { OrganizerLocationGroup } from "@/types/model/getAllLocationsResponse"
import { Province } from "@/types/model/getAllDistrictsResponse"

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

export default function LocationManagementClient() {
  const [locations, setLocations] = useState<Location[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrganizer, setSelectedOrganizer] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const organizers = ["phamvananhthu@gmail.com"]
  const [cities, setCities] = useState<string[]>([]);
  const [cityToProvinceId, setCityToProvinceId] = useState<Record<string, number>>({});

  useEffect(() => {
  const fetchDistricts = async () => {
    try {
      const res: Province[] = await getAllDistricts();

      //Debug log: See what res looks like
      console.log("Fetched district response:", res);

      // Build mapping from province name to province id
      const provinceMap: Record<string, number> = {};
      const citySet: Set<string> = new Set();

      res.forEach((province) => {
        provinceMap[province.name] = province.id;
        citySet.add(province.name);
      });

      setCities(Array.from(citySet));
      setCityToProvinceId(provinceMap);
    } catch (err) {
      console.error("Failed to fetch districts and provinces", err);
    }
  };

  fetchDistricts();
}, []);



  const mapApiToClientLocations = (data: OrganizerLocationGroup[]): Location[] => {
  return data.map((group) => {
    const venueMap: Record<string, Venue> = {}

    group.venues.forEach((v) => {
      const fullAddress = `${v.street}, ${v.ward}, ${v.district}, ${v.province}`

      if (!venueMap[fullAddress]) {
        venueMap[fullAddress] = {
          name: fullAddress,
          taxLocations: [`${v.ward}, ${v.district}`],
          events: [],
          organizers: [],
        }
      }

      // Avoid duplicates in arrays
      if (v.event?.title && !venueMap[fullAddress].events.includes(v.event.title)) {
        venueMap[fullAddress].events.push(v.event.title)
      }

      if (v.event?.orgName && !venueMap[fullAddress].organizers.includes(v.event.orgName)) {
        venueMap[fullAddress].organizers.push(v.event.orgName)
      }
    })

    return {
      id: group.id,
      email: group.organizerId, // email not present in API response
      venues: Object.values(venueMap),
    }
  })
}

  const fetchLocations = async (provinceId?: number) => {
  try {
    console.log(provinceId);
    setLoading(true)
    const res = await getAllLocations();
    const mapped = mapApiToClientLocations(res.data)
    setLocations(mapped)
  } catch (error) {
    console.error("Error loading locations:", error)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    // Load all on mount
    fetchLocations()
  }, [])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

    const handleResetFilter = async () => {
    setSelectedOrganizer("")
    setSelectedCity("")
    await fetchLocations()
  }
  const handleConfirmFilter = async () => {
    const provinceId = selectedCity ? cityToProvinceId[selectedCity] : undefined
    await fetchLocations(provinceId)
  }
  const handleExportReport = () => {
  }

   if (loading ) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
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
          <FilterDropdown label="Thành phố" options={cities} value={selectedCity} onChange={setSelectedCity} />

          <FilterDropdown label="Nhà tổ chức" options={organizers} value={selectedOrganizer} onChange={setSelectedOrganizer} />


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
