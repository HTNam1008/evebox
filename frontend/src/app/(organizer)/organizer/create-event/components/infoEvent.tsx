"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Package Application */
import NoteDialog from './dialogs/noteDialog'
import Sidebar from './common/sidebar';
import Navigation from './common/navigation';
import FormInformationEventClient from './formInfoEvent';

export default function InformationEventClient() {
    const [open, setOpen] = useState(true);

    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar có chiều rộng cố định và không đè lên nội dung */}
                <div className="w-64 bg-gray-900 mr-6">
                    <Sidebar />
                </div>

                <NoteDialog open={open} onClose={() => setOpen(false)}></NoteDialog>

                <div className='w-full flex flex-col'>
                    <Navigation title="Tạo sự kiện" />
                    
                    <FormInformationEventClient></FormInformationEventClient>
                </div>

                
            </div>
        </>
    )
}
