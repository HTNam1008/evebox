/* Package System */
import 'tailwindcss/tailwind.css';

/* Package Application */
import Sidebar from './sidebar';
import SearchBar from './searchBar';
import FilterBar from './filter';
import AccountTable from './accountTable';

export default function AccountPage() {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar */}
            <div
                className="block md:block w-64 bg-gray-900 text-white z-20 absolute md:relative h-full md:h-auto">
                <Sidebar />
            </div>

            {/* Page Content */}
            <div className="flex-1 p-6 bg-gray-100 text-black">
                <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Account</h1>
                <p>Quản lý thông tin và trạng thái tài khoản</p>
                <div className="border-t-2 border-[#0C4762] mt-2"></div>

                <div className="flex justify-between items-center mt-6 mb-2">
                    <SearchBar />
                    <FilterBar />
                </div>

                <AccountTable />
            </div>
        </div>
    );
}

export const dynamic = 'force-dynamic';