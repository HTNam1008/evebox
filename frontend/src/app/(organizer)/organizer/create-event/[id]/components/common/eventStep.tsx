'use client';

/* Package System */
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* Package Application */
import InformationEventClient from '../../../components/info-event/page';
import TimeAndTypeTickets from '../time-type/page';
import Setting from '../info-setting/page';
import CreateQuestions from '../info-regis/page';
import InformationPaymentClient from '../info-payment/page';

export default function EventStep({ eventId }: { eventId: string }) {
    const searchParams = useSearchParams();
    const step = searchParams.get('step') || 'info';
    const router = useRouter();

    useEffect(() => {
        const validSteps = ["info", "showing", "setting", "questions", "payment"];
        if (!validSteps.includes(step)) {
            router.replace("/organizer/create-event?step=info");
        }
    }, [step, router]);

    return (
        <>
            {step === 'info' && <InformationEventClient />}
            {step === 'showing' && <TimeAndTypeTickets eventId={eventId} />}
            {step === 'setting' && <Setting eventId={eventId} />}
            {step === 'questions' && <CreateQuestions eventId={eventId} />}
            {step === 'payment' && <InformationPaymentClient />}
        </>
    );
}
