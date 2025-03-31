'use client';

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';
// import { useRef } from 'react';
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/* Package Application */
import NoteDialog from '../dialogs/noteDialog';
import FormInformationEventClient from './components/formInfoEvent';
import Navigation from '../common/navigation';

export default function InformationEventClient() {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [step] = useState(1);
    const [btnValidate, setBtnValidte] = useState("");

    const searchParams = useSearchParams();
    useEffect(() => {
        if (!searchParams.get('step')) {
            router.replace('/organizer/create-event?step=infor');
        }
    }, [searchParams, router]);

    const handleSave = () => {
        setBtnValidte("Save");
    }

    const handleContinue = () => {
        setBtnValidte("Continue");
    }

    const handleNextStep = () => {
        router.push(`/organizer/create-event/89961?step=showing`);
    };


    return (
        <>
            <div className="flex flex-col items-center justify-center p-10 relative">
                <span className="text-3xl font-semibold mb-6">Tạo sự kiện</span>
                <div className="w-full flex justify-center">
                    <ol className="flex space-x-6">
                        <Navigation step={step} />

                        <div className="flex gap-4 mt-4 mb-6">
                            <button className="text-xs w-18 border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all"
                                type="submit" form="event-form" onClick={handleSave}>
                                Lưu
                            </button>
                        </div>

                        <div className="flex gap-4 mt-4 mb-6">
                            <button className="text-xs w-30 border-2 border-[#51DACF] text-[#0C4762] font-bold py-2 px-4 rounded bg-[#51DACF] hover:bg-[#0C4762] hover:border-[#0C4762] hover:text-white transition-all"
                                type="submit" form="event-form" onClick={handleContinue}>
                                Tiếp tục
                            </button>
                        </div>
                    </ol>
                </div>

                <Divider />
            </div>

            <NoteDialog open={open} onClose={() => setOpen(false)}></NoteDialog>

            <FormInformationEventClient onNextStep={handleNextStep} btnValidate={btnValidate} />
        </>
    )
}
