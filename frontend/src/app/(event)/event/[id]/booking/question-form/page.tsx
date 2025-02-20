'use client'

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import '@/styles/admin/pages/Dashboard.css';
import '@/styles/admin/pages/BookingQuestionForm.css'
import { useEffect, useState } from 'react';
import QuestionList from './components/questionList';
import TicketInformation from './components/ticketInfo';
import Navigation from '../components/navigation';


export default function QuestionForm() {
    const [event, setEvent] = useState(null);
    const [totalTickets, setTotalTickets] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    // const [hasSelectedTickets, setHasSelectedTickets] = useState(false);

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
        <div className="mt-5 mb-5">
            <Navigation title="Bảng câu hỏi" />
            <div className="px-32 py-0">
                <div className="row align-items-start mt-4">
                    <QuestionList onValidationChange={setIsFormValid} />
                    <TicketInformation event={event} totalTickets={totalTickets} totalAmount={totalAmount} isFormValid={isFormValid} />
                </div>

            </div>
        </div>
    )
}