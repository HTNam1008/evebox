import ChatboxButton from "./(chatbox)/components/chatboxBtn";
import { Providers } from "./provider";
import { SearchResultProvider } from "./providers/searchResultProvider";
import Footer from "../app/(dashboard)/components/common/footer"
import NavigationBar from "../app/(dashboard)/components/common/navigationBar"
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <>
          <Providers>
            <div className="tt-content relative">
              <div>
                <NavigationBar/>
                {children}
                <Footer/>
              </div>
                <ChatboxButton />
            </div>
          </Providers>
          </>
        </body>
      </html>
    );
  }
  