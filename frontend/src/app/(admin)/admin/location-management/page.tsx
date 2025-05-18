import { Suspense } from "react"
import LocationManagementClient from "./components/location-management"
import { LocationTableSkeleton } from "./components/table-skeleton"

import 'tailwindcss/tailwind.css';

export default async function LocationManagementPage() {

  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<LocationTableSkeleton />}>
        <LocationManagementClient/>
      </Suspense>
    </div>
  )
}
