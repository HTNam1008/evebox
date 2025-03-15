"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Package Application */
import Navigation from './common/navigation';
import FormInfoPaymentClient from './formInfoPayment';

export default function InformationPaymentClient() {
    // const [step, setStep] = useState(4); 
    const [step] = useState(5);

    return (
        <>
            <Navigation title="Thông tin thanh toán" step={step} />

            <div className="flex justify-center">
                <FormInfoPaymentClient />
            </div>
        </>
    );
}
