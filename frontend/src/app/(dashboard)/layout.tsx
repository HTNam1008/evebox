import { Suspense } from "react"
import DashboardLoading from "./loading"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      {/* <NavigationBar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </Suspense>
  )
}