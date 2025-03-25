/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import Sidebar from './components/common/sidebar';
import EventStep from './components/common/eventStep';

export default function Page() {
    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-900 mr-6">
                <Sidebar />
            </div>

            <div className="w-full flex flex-col">
                {/* Gán cứng là 1 tuy nhiên sau này sẽ dựa và db tạo event để tạo ID */}
                <EventStep eventId='1'/>  
            </div>

        </div>
    )
}