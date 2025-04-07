/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import Sidebar from './sidebar';

export default function AccountPage() {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">   
            {/* Sidebar */}
            <div
                className="block md:block w-64 bg-gray-900 text-white z-20 absolute md:relative h-full md:h-auto">
                <Sidebar />
            </div>

            {/* Page Content */}
            <div className="flex-1 p-4 bg-gray-100 text-black">
                <h1 className="text-2xl font-bold mb-4">Account Page</h1>
                {/* Nội dung khác */}
                <p>This is the responsive content area.</p>
            </div>
        </div>
    );
}

export const dynamic = 'force-dynamic';