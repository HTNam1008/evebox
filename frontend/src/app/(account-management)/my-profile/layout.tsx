import { Suspense } from "react"
import Loading from "./loading"
import NavigationBar from "@/app/(dashboard)/components/common/navigationBar"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <Suspense fallback={<Loading />}>
        <main>{children}</main>
      </Suspense>
  )
}