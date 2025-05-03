/* Package System */
import { Suspense } from "react"
import { Toaster } from 'react-hot-toast';

/* Package Application */
import DashboardLoading from "./loading"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      {/* <NavigationBar /> */}
      <main>
        {children}
        <Toaster reverseOrder={false} />
      </main>
      {/* <Footer /> */}
    </Suspense>
  )
}