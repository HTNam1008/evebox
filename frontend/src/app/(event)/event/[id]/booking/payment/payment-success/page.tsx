
/* Package System */
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import 'tailwindcss/tailwind.css';

/* Package Application */
import { authOptions } from '@/lib/authOptions';
import PaymentSuccess from './components/paymentSuccess';

interface PageProps {
  searchParams: { orderCode?: string };
}

async function getPaymentStatus(orderCode: string, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_TICKET_SVC_URL}/api/payment/getPayOSStatus?orderCode=${orderCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data?.status;
  } catch (err) {
    //console.error("Error fetching status:", err);
    return null;
  }
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;
  const orderCode = searchParams?.orderCode;

  if (!orderCode || !token) {
    redirect('/');
  }

  const status = await getPaymentStatus(orderCode, token);

  if (status !== 'PAID') {
    return (
      <div className="container text-center mt-5">
        <p>Không tìm thấy thanh toán hợp lệ.</p>
        <button className="btn btn-primary mt-4" onClick={() => redirect('/')}>Về trang chủ</button>
      </div>
    )
  }

  return (
    <PaymentSuccess />
  );
}