import NavigationBar from "@/app/(dashboard)/components/common/navigationBar"
import DashboardLoading from "@/app/(dashboard)/loading"
import { Providers } from "@/app/provider"
import { Suspense } from "react"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Suspense fallback={<DashboardLoading />}>
        <NavigationBar/>
        <main>{children}</main>
      </Suspense>
    </Providers>
  )
}