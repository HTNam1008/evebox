import 'tailwindcss/tailwind.css';

import Sidebar from "../components/sidebar";
import Tabs from "./components/tabs";

export default function Event() {
    return (
        <main>
            <div className="flex min-h-screen bg-gray-100">
                <div className="w-64 bg-gray-900 text-white">
                    <Sidebar />
                </div>
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold text-[#0C4762]">Sự kiện của tôi</h1>
                    <div className="border-t-2 border-[#0C4762] mt-2"></div>
                    <Tabs/>
                </div>
            </div>
        </main>
    );
}