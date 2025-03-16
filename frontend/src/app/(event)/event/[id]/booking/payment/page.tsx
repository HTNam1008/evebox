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
import CountdownTimer from "../components/countdownTimer";

const PaymentPage = () => {
  const [event, setEvent] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [ticketTypeName, setTicketTypeName] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);

  useEffect(() => {
    fetchEventInfo();
  }, []);

  const fetchEventInfo = () => {
    const storedEvent = localStorage.getItem('event');
    const storedTotalTickets = localStorage.getItem('totalTickets');
    const storedTotalAmount = localStorage.getItem('totalAmount');
    const storedTicketTypeName = localStorage.getItem('selectedTicketTypeName');
    const storedTicketPrice = localStorage.getItem('selectedTicketPrice');

    if (storedEvent) setEvent(JSON.parse(storedEvent));
    if (storedTotalTickets) setTotalTickets(Number(storedTotalTickets));
    if (storedTotalAmount) setTotalAmount(Number(storedTotalAmount));
    if (storedTicketTypeName) setTicketTypeName(storedTicketTypeName);
    if (storedTicketPrice) setTicketPrice(Number(storedTicketPrice));
  }

  return (
    <div className="mt-5 mb-5">
      <Navigation title="Thanh toán" />

      <div className="fixed top-10 right-10 mt-4">
        <CountdownTimer />
      </div>

      <div className="px-32 py-0">
        <div className="row align-items-start mt-4">
          <PaymentMethod />
          <TicketInformation event={event} totalTickets={totalTickets} totalAmount={totalAmount} ticketTypeName={ticketTypeName} ticketPrice={ticketPrice} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;