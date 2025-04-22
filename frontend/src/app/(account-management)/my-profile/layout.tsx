import NavigationBar from "@/app/(dashboard)/components/common/navigationBar"
import { Providers } from "@/app/provider"
import { Suspense } from "react"
import Loading from "./loading"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Suspense fallback={<Loading />}>
        <NavigationBar />
        <main>{children}</main>
      </Suspense>
    </Providers>
  )
}