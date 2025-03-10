"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Package Application */
import Navigation from './common/navigation';
import FormTimeTypeTicketClient from './formTimeType';

export default function TimeAndTypeTickets() {
    // const [step, setStep] = useState(2); 
    const [step] = useState(2);

    return (
        <>
            <Navigation title="Thời gian và loại vé" step={step} />

            <div className="flex justify-center">
                <FormTimeTypeTicketClient />
            </div>
        </>
    );
}
