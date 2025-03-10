
import 'tailwindcss/tailwind.css';

import SidebarOrganizer from "../components/sidebarOrganizer";
import TicketTable from "./components/ticketTable";
import SummaryControls from "./components/summaryControls";

const Summary = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="inset-y-0 left-0 w-64 bg-gray-900 md:relative md:flex-shrink-0">
        <SidebarOrganizer />
      </div>

      {/* Phần nội dung chính */}
      <div className="flex-1 p-6 md-64 w-full">
        <SummaryControls/>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-[#0C4762] mb-2">Chi tiết</h3>
          <h4 className="text-lg font-bold text-[#0C4762] mb-2">Vé đã bán</h4>
          <div className="overflow-x-auto">
            <TicketTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
