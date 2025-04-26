import { Suspense } from "react"
import { Providers } from "@/app/provider"
import AccountSkeletonLoading from "./loading"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Suspense fallback={<AccountSkeletonLoading />}>
        <main>{children}</main>
      </Suspense>
    </Providers>
  )
}