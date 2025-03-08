"use client"

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function PaymentQRCode() {
  const [paymentData, setPaymentData] = useState({
    bin: "970422",
    accountNumber: "VQRQABPAP1666",
    accountName: "DUONG NGOC THAI BAO",
    amount: 5000,
    description: "Thanh toan",
    orderCode: 1,
    currency: "VND",
    paymentLinkId: "1d351350849f4af295232eeb39d2fdd8",
    status: "PENDING",
    checkoutUrl: "https://pay.payos.vn/web/1d351350849f4af295232eeb39d2fdd8",
    qrCode:
      "00020101021238570010A000000727012700069704220113VQRQABPAP16660208QRIBFTTA5303704540450005802VN62140810Thanh toan63042C06",
  });
  useEffect(() => {
    setPaymentData({
      bin: "970422",
      accountNumber: "VQRQABPAU0678",
      accountName: "DUONG NGOC THAI BAO",
      amount: 5000,
      description: "Thanh toan",
      orderCode: 21,
      currency: "VND",
      paymentLinkId: "91a9a02aafb34c62890a4a62b3ebd209",
      status: "PENDING",
      checkoutUrl: "https://pay.payos.vn/web/91a9a02aafb34c62890a4a62b3ebd209",
      qrCode: "00020101021238570010A000000727012700069704220113VQRQABPAU06780208QRIBFTTA5303704540450005802VN62140810Thanh toan6304DA45"
  });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Quét mã QR để thanh toán</h2>
        <QRCodeCanvas value={paymentData.qrCode} size={256} />
        <p className="mt-4 text-lg">Số tiền: {paymentData.amount} {paymentData.currency}</p>
        <p className="text-gray-600">Chủ tài khoản: {paymentData.accountName}</p>
        <p className="text-gray-600">Trạng thái: {paymentData.status}</p>
        <a
          href={paymentData.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đi đến trang thanh toán
        </a>
      </div>
    </div>
  );
}
