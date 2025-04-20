"use client"

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

interface LocationTableProps {
  locations: Location[]
}

export default function LocationTable({ locations }: LocationTableProps) {
  // Process the data to create table rows with proper rowspan
  const tableRows: JSX.Element[] = []

  locations.forEach((location) => {
    // Calculate total rows for this location
    let totalRows = 0
    location.venues.forEach((venue) => {
      totalRows += venue.taxLocations.length
    })

    let currentRow = 0

    location.venues.forEach((venue, venueIndex) => {
      const venueRows = venue.taxLocations.length

      for (let i = 0; i < venueRows; i++) {
        const isFirstRowOfLocation = currentRow === 0
        const isFirstRowOfVenue = i === 0

        tableRows.push(
          <tr key={`${location.id}-${venueIndex}-${i}`} className={currentRow % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            {isFirstRowOfLocation && (
              <td className="py-3 px-4 border-t border-r border-gray-200" rowSpan={totalRows}>
                {location.id}
              </td>
            )}

            {isFirstRowOfLocation && (
              <td className="py-3 px-4 border-t border-r border-gray-200" rowSpan={totalRows}>
                {location.email}
              </td>
            )}

            {isFirstRowOfVenue && (
              <td className="py-3 px-4 border-t border-r border-gray-200" rowSpan={venueRows}>
                {venue.name}
              </td>
            )}

            <td className="py-3 px-4 border-t border-r border-gray-200">{venue.taxLocations[i]}</td>

            <td className="py-3 px-4 border-t border-r border-gray-200">{venue.events[i]}</td>

            <td className="py-3 px-4 border-t border-gray-200">{venue.organizers[i]}</td>
          </tr>,
        )

        currentRow++
      }
    })
  })

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100">
      <table className="min-w-full border border-gray-100 border-collapse">
        <thead>
          <tr className="bg-[#0C4762] text-white">
            <th className="py-3 px-4 text-left border-r border-[#0c4b78]">STT</th>
            <th className="py-3 px-4 text-left border-r border-[#0c4b78]">Email của nhà tổ chức</th>
            <th className="py-3 px-4 text-left border-r border-[#0c4b78]">Địa điểm tổ chức</th>
            <th className="py-3 px-4 text-left border-r border-[#0c4b78]">Địa điểm đăng ký thuế</th>
            <th className="py-3 px-4 text-left border-r border-[#0c4b78]">Tên sự kiện</th>
            <th className="py-3 px-4 text-left">Tên nhà tổ chức</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  )  
}
