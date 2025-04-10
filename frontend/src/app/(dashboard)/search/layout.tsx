import { Suspense } from "react"
import SearchLoading from "./loading"

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense fallback={<SearchLoading />}>
            <section>{children}</section>
        </Suspense>
    )
}