/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import InformationEventClient from './components/inforEvent';

export default async function Page() {

    return (
        <div>
            <InformationEventClient></InformationEventClient>
        </div>
    )
}

export const dynamic = 'force-dynamic';