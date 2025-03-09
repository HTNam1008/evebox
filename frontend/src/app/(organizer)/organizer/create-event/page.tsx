/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import InformationEventClient from './components/infoEvent';
import Sidebar from './components/common/sidebar';
// import Navigation from './components/common/navigation';

export default async function Page() {

    return (
        <div className="flex min-h-screen">
            {/* Sidebar có chiều rộng cố định và không đè lên nội dung */}
            <div className="w-64 bg-gray-900 mr-6">
                <Sidebar />
            </div>

            <div className='w-full flex flex-col'>
                

                <InformationEventClient></InformationEventClient>
            </div>
            
        </div>
    )
}

export const dynamic = 'force-dynamic';