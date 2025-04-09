'use client';

import Image from 'next/image';
import Link from 'next/link';

// interface PaymentSuccessProps {
//     orderDetails: {
//       orderId: string;
//       orderDate: string;
//       ticketInfo: string;
//       totalPrice: string;
//       paymentMethod: string;
//     };
//     btcMessage: string;
//     userEmail: string;
//   }

export default function PaymentSuccess() {
    const orderDetails = {
        orderId: 'EV123456789',
        orderDate: '01/04/2025',
        ticketInfo: '2 vé VIP - Đêm nhạc hội',
        totalPrice: '2.000.000 VND',
        paymentMethod: 'Thẻ tín dụng',
      };
    
      const btcMessage = 'Cảm ơn bạn đã tham gia sự kiện. Hãy đến sớm để có chỗ ngồi tốt nhé!';
      const userEmail = 'abc@example.com';

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 min-h-[60vh]">
      {/* Success Message */}
      <div className="text-center mb-6">
        <div className="text-green-500 text-6xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-3xl font-bold text-green-600">Thanh toán thành công!</h1>
        <div className="mt-4 bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md max-w-2xl ">
          <p className="font-semibold">Lời nhắn của BTC:</p>
          <p>{btcMessage}</p>
        </div>
        <p className="text-gray-700 mt-4 text-lg max-w-2xl">
          Email sẽ được gửi trong vòng 15 phút. Vui lòng kiểm tra thêm thông tin chi tiết của đơn hàng được gửi đến địa chỉ email: <span className="font-semibold">{userEmail}</span>. Bạn có thể kiểm tra trong mục <span className="font-semibold">Vé của tôi</span> nữa nhé.
        </p>
      </div>

      {/* Order Details Section */}
      <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        {/* Ticket Image */}
        <div className="md:w-1/2 flex items-center mb-4 md:mb-0 pr-2">
          <Image 
            src="/images/event.png"
            alt="Event Ticket"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Order Information Table */}
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Thông tin đơn hàng</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold text-gray-700">Mã đơn hàng</td>
                <td className="p-2 text-gray-600">{orderDetails.orderId}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold text-gray-700">Ngày đặt vé</td>
                <td className="p-2 text-gray-600">{orderDetails.orderDate}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold text-gray-700">Thông tin đặt vé</td>
                <td className="p-2 text-gray-600">{orderDetails.ticketInfo}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold text-gray-700">Tổng cộng</td>
                <td className="p-2 text-gray-600">{orderDetails.totalPrice}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-gray-700">Hình thức thanh toán</td>
                <td className="p-2 text-gray-600 font-bold text-green-600">{orderDetails.paymentMethod}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Back to Homepage Button */}
      <div className="mt-6">
        <Link href="/">
          <button className="bg-[#0C4762] hover:bg-[#3BB8AE] text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all">
            Quay lại trang chủ
          </button>
        </Link>
      </div>
    </div>
  );
}
