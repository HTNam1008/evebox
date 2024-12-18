import Footer from "../(dashboard)/components/common/footer"
import NavigationBar from "../(dashboard)/components/common/navigationBar"
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
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}