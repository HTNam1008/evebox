"use client"

/* Package System */ 
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/* Package Application */
import PaymentMethod from "./components/paymentMethod";
import Navigation from "../components/navigation";
import TicketInformation from "./components/ticketInfo";

const PaymentPage = () => {
  const [event, setEvent] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchEventInfo();
  }, []);

  const fetchEventInfo = () => {
    const storedEvent = localStorage.getItem('event');
    const storedTotalTickets = localStorage.getItem('totalTickets');
    const storedTotalAmount = localStorage.getItem('totalAmount');

    if (storedEvent) setEvent(JSON.parse(storedEvent));
    if (storedTotalTickets) setTotalTickets(Number(storedTotalTickets));
    if (storedTotalAmount) setTotalAmount(Number(storedTotalAmount));
  }

  return (
    <div className="mt-5 mb-5">
      <Navigation title="Thanh toán" />
      <div className="px-32 py-0">
        <div className="row align-items-start mt-4">
          <PaymentMethod />
          <TicketInformation event={event} totalTickets={totalTickets} totalAmount={totalAmount} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;