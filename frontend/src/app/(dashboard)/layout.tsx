import { Suspense } from "react"
import Footer from "./components/common/footer"
import NavigationBar from "./components/common/navigationBar"
import DashboardLoading from "./loading"
import { Providers } from "../provider"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Suspense fallback={<DashboardLoading />}>
        <NavigationBar />
        <main>{children}</main>
        <Footer />
      </Suspense>
    </Providers>
  )
}