import NavigationBar from "@/app/(dashboard)/components/common/navigationBar"
import DashboardLoading from "@/app/(dashboard)/loading"
import { Suspense } from "react"
import Loading from "./loading"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <Suspense fallback={<DashboardLoading />}>
        <NavigationBar/>
        <main>{children}</main>
      </Suspense>
  )
}