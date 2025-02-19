"use client"

/* Package System */ 
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/* Package Application */
import PaymentMethod from "./components/paymentMethod";

const PaymentPage = () => {
  const [event, setEvent] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
      // Lấy dữ liệu từ localStorage
      const storedEvent = localStorage.getItem('event');
      const storedTotalTickets = localStorage.getItem('totalTickets');
      const storedTotalAmount = localStorage.getItem('totalAmount');
      // const storedHasSelectedTickets = localStorage.getItem('hasSelectedTickets');

      if (storedEvent) setEvent(JSON.parse(storedEvent)); // Chuyển JSON string thành object
      if (storedTotalTickets) setTotalTickets(Number(storedTotalTickets));
      if (storedTotalAmount) setTotalAmount(Number(storedTotalAmount));
      // if (storedHasSelectedTickets) setHasSelectedTickets(storedHasSelectedTickets === 'true');
  }, []);

  return (
    // <div className="payment-page">
    //   <Payment />
    // </div>
    <div className="mt-5 mb-5">
      <div className="px-32 py-0">
        <div className="row align-items-start mt-4">
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;