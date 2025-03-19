
/* Package System */
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import 'tailwindcss/tailwind.css';

/* Package Application */
import { authOptions } from '@/lib/authOptions';

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
    console.error("Error fetching status:", err);
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-10 bg-gradient-to-b from-teal-50 to-white text-center">
      <div className="text-green-500 text-6xl mb-4 animate-bounce">
        🎉
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#0C4762] mb-2">
        Thanh toán thành công!
      </h2>
      <p className="text-gray-700 text-base md:text-lg mb-6 max-w-xl">
        Cảm ơn bạn đã đặt vé với <span className="font-semibold text-[#0C4762]">Evebox</span>. Hẹn gặp bạn tại sự kiện nhé!
      </p>
      <a
        href="/"
        className="inline-block bg-[#51DACF] hover:bg-[#3BB8AE] text-[#0C4762] font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
      >
        Về trang chủ
      </a>
    </div>
  );
}