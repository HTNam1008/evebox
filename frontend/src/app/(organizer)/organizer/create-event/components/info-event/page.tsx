"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Package Application */
import NoteDialog from '../dialogs/noteDialog'
import FormInformationEventClient from './components/formInfoEvent';
import TimeAndTypeTickets from '../time-type/page';
import Navigation from '../common/navigation';

export default function InformationEventClient() {
    const [open, setOpen] = useState(true);
    const [step, setStep] = useState(1);

    return (
        <>
            <Navigation title="Tạo sự kiện" step={step}  />
            
            <NoteDialog open={open} onClose={() => setOpen(false)}></NoteDialog>

            {step === 1 ? (
                <FormInformationEventClient onNextStep={() => setStep(2)} />
            ) : (
                <TimeAndTypeTickets /> // Hiển thị bước 2 khi đủ điều kiện
            )}
        </>
    )
}
