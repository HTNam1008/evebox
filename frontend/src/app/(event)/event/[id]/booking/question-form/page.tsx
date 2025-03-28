'use client'

/* Package System */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/* Package Application */
import '@/styles/admin/pages/Dashboard.css';
import '@/styles/admin/pages/BookingQuestionForm.css'
import QuestionList from './components/questionList';
import TicketInformation from './components/ticketInfo';
import Navigation from '../components/navigation';
import CountdownTimer from '../components/countdownTimer';
import { TicketType } from '../../../libs/event.interface';
import apiClient from '@/services/apiClient2';
import { redisInfo, redisInfoResponse } from '@/types/model/redisSeat';

interface FormInputs {
    id: number;
    formId: number;
    fieldName: string;
    type: string;
    required: boolean;
    regex: string | null;
    options: { optionText: string }[];
}

export default function QuestionForm() {
    const t = useTranslations('common');
    const [event, setEvent] = useState(null);
    const [totalTickets, setTotalTickets] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [ticketType, setTicketType] = useState<TicketType | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showingId, setShowingId] = useState('');
    const [formId, setFormId] = useState<number | null>(null);
    const [formInputs, setFormInputs] = useState<FormInputs[]>([]);
    const [formAnswers, setFormAnswers] = useState<{ [formInputId: number]: string }>({});
    const [redisSeatInfo, setRedisSeatInfo] = useState<redisInfo | null>(null);
    const [isLoadingForm, setIsLoadingForm] = useState(true);

    // const [hasSelectedTickets, setHasSelectedTickets] = useState(false);

    useEffect(() => {
        const fetchForm = async () => {
            if (!showingId) return;
            setIsLoadingForm(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_TICKET_SVC_URL}/api/showing/get-form?showingId=${showingId}`);
                const data = await res.json();
                if (res.ok && data?.data) {
                    setFormId(data.data.id);
                    setFormInputs(data.data.FormInput);
                } else {
                    setFormId(null);
                    setFormInputs([]);
                    // console.error('Không tìm thấy Form trong Showing');
                }
            } catch (error) {
                console.error('Lỗi khi tải Form:', error);
            } finally {
                setIsLoadingForm(false);
            }
        };

        if (showingId) fetchForm();
    }, [showingId]);

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

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedEvent = localStorage.getItem('event');
        const storedTotalTickets = localStorage.getItem('totalTickets');
        const storedTotalAmount = localStorage.getItem('totalAmount');
        const storeTicketType = localStorage.getItem('selectedTicketType');
        const storeShowingId = localStorage.getItem('showingId');
        // const storedHasSelectedTickets = localStorage.getItem('hasSelectedTickets');

        if (storedEvent) setEvent(JSON.parse(storedEvent)); // Chuyển JSON string thành object
        if (storedTotalTickets) setTotalTickets(Number(storedTotalTickets));
        if (storedTotalAmount) setTotalAmount(Number(storedTotalAmount));
        if (storeTicketType) setTicketType(JSON.parse(storeTicketType));
        if (storeShowingId) setShowingId(storeShowingId);
        // if (storedHasSelectedTickets) setHasSelectedTickets(storedHasSelectedTickets === 'true');
    }, []);

    return (
        <div className="mt-5 mb-5">
            <Navigation title={`${t("questionForm") || 'Bảng câu hỏi'}`} />

            <div className="fixed top-10 right-10 mt-4">
                <CountdownTimer expiredTime={redisSeatInfo?.expiredTime ? redisSeatInfo?.expiredTime : 0} />           
             </div>

            <div className="px-32 py-0">
                <div className="row align-items-start mt-4">
                    <QuestionList onValidationChange={setIsFormValid} onFormChange={(answers) => setFormAnswers(answers)} formInputs={formInputs} isLoadingForm={isLoadingForm}/>
                    <TicketInformation event={event} totalTickets={totalTickets} totalAmount={totalAmount} isFormValid={isFormValid} ticketType={ticketType} formData={formAnswers} formId={formId} showingId={showingId} />
                </div>
            </div>
        </div>
    )
}