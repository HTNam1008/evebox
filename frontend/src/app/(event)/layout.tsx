/* Package System */
import { Toaster } from 'react-hot-toast';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
      <Toaster reverseOrder={false} />
    </main>
  )
}