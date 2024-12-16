import { Suspense } from "react"
import Footer from "./components/common/footer"
import NavigationBar from "./components/common/navigationBar"
import Loading from "./loading"
import { Providers } from "../provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavigationBar />
          <Suspense fallback={<Loading />}>
            <main>{children}</main>
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}