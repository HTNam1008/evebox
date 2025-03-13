'use client'

/* Package System */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';

/* Package Application */
import '@/styles/admin/pages/Dashboard.css';
import '@/styles/admin/pages/BookingQuestionForm.css'
import QuestionList from './components/questionList';
import TicketInformation from './components/ticketInfo';
import Navigation from '../components/navigation';
import CountdownTimer from '../components/countdownTimer';


export default function QuestionForm() {
    const [event, setEvent] = useState(null);
    const [totalTickets, setTotalTickets] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [ticketTypeName, setTicketTypeName] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    // const [hasSelectedTickets, setHasSelectedTickets] = useState(false);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedEvent = localStorage.getItem('event');
        const storedTotalTickets = localStorage.getItem('totalTickets');
        const storedTotalAmount = localStorage.getItem('totalAmount');
        const storedTicketTypeName = localStorage.getItem('selectedTicketTypeName');
        const storedTicketPrice = localStorage.getItem('selectedTicketPrice');
        // const storedHasSelectedTickets = localStorage.getItem('hasSelectedTickets');

        if (storedEvent) setEvent(JSON.parse(storedEvent)); // Chuyển JSON string thành object
        if (storedTotalTickets) setTotalTickets(Number(storedTotalTickets));
        if (storedTotalAmount) setTotalAmount(Number(storedTotalAmount));
        if (storedTicketTypeName) setTicketTypeName(storedTicketTypeName);
        if (storedTicketPrice) setTicketPrice(Number(storedTicketPrice));
        // if (storedHasSelectedTickets) setHasSelectedTickets(storedHasSelectedTickets === 'true');
    }, []);

    return (
        <div className="mt-5 mb-5">
            <Navigation title="Bảng câu hỏi" />
            
            <div className="fixed top-10 right-10 mt-4">
                <CountdownTimer />
            </div>

            <div className="px-32 py-0">
                <div className="row align-items-start mt-4">
                    <QuestionList onValidationChange={setIsFormValid} />
                    <TicketInformation event={event} totalTickets={totalTickets} totalAmount={totalAmount} isFormValid={isFormValid} ticketTypeName={ticketTypeName} ticketPrice={ticketPrice} />
                </div>
            </div>
        </div>
    )
}