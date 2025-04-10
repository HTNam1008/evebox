/* Package System */
import { Suspense } from "react";

/* Package Application */
import Footer from "../(dashboard)/components/common/footer";
import NavigationBar from "../(dashboard)/components/common/navigationBar";
import Loading from "./loading";
import { Providers } from "../provider";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <NavigationBar />
      <Suspense fallback={<Loading />}>
        <main>{children}</main>
      </Suspense>
      <Footer />
    </Providers>
  );
}