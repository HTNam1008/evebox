import { Suspense } from "react"
import LocationManagementClient from "./components/location-management"
import { LocationTableSkeleton } from "./components/table-skeleton"

import 'tailwindcss/tailwind.css';

export default async function LocationManagementPage() {
  const locations = [
    {
      id: 1,
      email: "bruhbruh@gmail.com",
      venues: [
        {
          name: "KTX khu B",
          taxLocations: ["NVHSV", "NVHSV"],
          events: ["NTPMM mùa 1", "NTPMM mùa 2"],
          organizers: ["Báo khùm", "Báo Báo"],
        },
        {
          name: "KTX khu A",
          taxLocations: ["ĐH KHTN", "ĐH KHTN"],
          events: ["NTPMM mùa 3", "NTPMM mùa 4"],
          organizers: ["Dạt", "Tora"],
        },
      ],
    },
    {
      id: 2,
      email: "bruh123@gmail.com",
      venues: [
        {
          name: "Nhà thanh niên",
          taxLocations: ["UBND Quận 1", "UBND Quận 1"],
          events: ["ATSH 1", "ATSH 2"],
          organizers: ["Thư - Cty MTV", "Thư - Cty MTV"],
        },
      ],
    },
  ]
  
  const districts = ["Quận 1", "Quận 2", "Quận 3", "Quận Bình Thạnh", "Quận Tân Bình"]
  const cities = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"]

  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<LocationTableSkeleton />}>
        <LocationManagementClient initialLocations={locations} districts={districts} cities={cities} />
      </Suspense>
    </div>
  )
}
