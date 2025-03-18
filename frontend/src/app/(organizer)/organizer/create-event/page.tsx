/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import Sidebar from './[id]/components/common/sidebar';
import InformationEventClient from './components/info-event/page';

export default function Page() {
    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-900 mr-6">
                <Sidebar />
            </div>

            <div className="w-full flex flex-col">
                <InformationEventClient />
            </div>

        </div>
    )
}

export const dynamic = 'force-dynamic';