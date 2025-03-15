"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Package Application */
import Navigation from '../common/navigation';
import FormSettingClient from './formSetting';

export default function Setting() {
    // const [step, setStep] = useState(3); 
    const [step] = useState(3);

    return (
        <>
            <Navigation title="Cài đặt" step={step} />

            <div className="flex justify-center">
                <FormSettingClient />
            </div>
        </>
    );
}
