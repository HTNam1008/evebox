import { Suspense } from "react"
import Loading from "./loading"

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