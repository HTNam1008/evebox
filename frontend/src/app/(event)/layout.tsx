import Footer from "../(dashboard)/components/common/footer"
import NavigationBar from "../(dashboard)/components/common/navigationBar"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <NavigationBar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    )
  }