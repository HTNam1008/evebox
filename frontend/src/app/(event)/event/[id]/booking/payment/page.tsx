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
import CountdownTimer from '../components/countdownTimer';
import { TicketType } from "../../../libs/event.interface";
import apiClient from '@/services/apiClient2';
import { redisInfo, redisInfoResponse } from '@/types/model/redisSeat';

const PaymentPage = () => {
  const [event, setEvent] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [ticketType, setTicketType] = useState<TicketType | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [redisSeatInfo, setRedisSeatInfo] = useState<redisInfo | null>(null);  
  const [showingId, setShowingId] = useState('');
  

  useEffect(() => {
    fetchEventInfo();
    
  }, []);

  useEffect(() => {
    const fetchRedisSeatInfo = async () => {
        if (!showingId) return;
        try {          
            const res = await apiClient.get<redisInfoResponse>(`/api/ticket/getRedisSeat?showingId=${showingId}`); // Assuming your API route is /api/me
            
            if (res.status == 200) {
                setRedisSeatInfo(res.data.data);
            } else {
                console.error('Failed to fetch redisSeatInfo');
            }
        } catch (error) {
            console.error('Error fetching redisSeatInfo:', error);
        }
    };
    
    fetchRedisSeatInfo();
   }, [showingId]);

  const fetchEventInfo = () => {
    const storedEvent = localStorage.getItem('event');
    const storedTotalTickets = localStorage.getItem('totalTickets');
    const storedTotalAmount = localStorage.getItem('totalAmount');
    const storedTicketType = localStorage.getItem('selectedTicketType');
    const storeShowingId = localStorage.getItem('showingId');


    if (storedEvent) setEvent(JSON.parse(storedEvent));
    if (storedTotalTickets) setTotalTickets(Number(storedTotalTickets));
    if (storedTotalAmount) setTotalAmount(Number(storedTotalAmount));
    if (storedTicketType) setTicketType(JSON.parse(storedTicketType));
    if (storeShowingId) setShowingId(storeShowingId);

  }

  return (
    <div className="mt-5 mb-5">
      <Navigation title="Thanh toán" />

      <div className="fixed top-10 right-10 mt-4">
        <CountdownTimer expiredTime={redisSeatInfo?.expiredTime ? redisSeatInfo?.expiredTime : 15} />           
      </div>

      <div className="px-32 py-0">
        <div className="row align-items-start mt-4">
          <PaymentMethod onMethodSelected={(method) => setSelectedMethod(method)} />
          <TicketInformation event={event} totalTickets={totalTickets} totalAmount={totalAmount} ticketType={ticketType} paymentMethod={selectedMethod} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;