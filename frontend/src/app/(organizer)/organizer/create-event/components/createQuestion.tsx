"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Package Application */
import Navigation from './common/navigation';
import FormQuestionClient from './formQuestion';

export default function CreateQuestions() {
    // const [step, setStep] = useState(3); 
    const [step] = useState(4);

    return (
        <>
            <Navigation title="Thông tin đăng ký" step={step} />

            <div className="flex justify-center">
                <FormQuestionClient />
            </div>
        </>
    );
}
