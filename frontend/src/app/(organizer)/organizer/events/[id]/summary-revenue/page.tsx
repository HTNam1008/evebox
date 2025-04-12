
// import 'tailwindcss/tailwind.css';

// import SidebarOrganizer from "../components/sidebarOrganizer";
// import TicketTable from "./components/ticketTable";
// import SummaryControls from "./components/summaryControls";

// const Summary = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="inset-y-0 left-0 w-64 bg-gray-900 md:relative md:flex-shrink-0">
//         <SidebarOrganizer />
//       </div>

//       {/* Phần nội dung chính */}
//       <div className="flex-1 p-6 md-64 w-full">
//         <SummaryControls/>

//         <div className="mt-6">
//           <h3 className="text-lg font-bold text-[#0C4762] mb-2">Chi tiết</h3>
//           <h4 className="text-lg font-bold text-[#0C4762] mb-2">Vé đã bán</h4>
//           <div className="overflow-x-auto">
//             <TicketTable />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Summary;

"use client";

import { useEffect, useState } from "react";
import { getEventSummary } from "@/services/organizer.service";
import { OverviewCard } from "./components/overviewCard";
import { SummaryControls } from "./components/summaryControls";
import { TicketTable } from "./components/ticketTable";
import { EventSummaryData } from "@/types/model/getSummaryOrg";
import SidebarOrganizer from "../components/sidebarOrganizer";

interface PageProps {
  params: { id: string };
}

const SummaryRevenuePage = ({ params }: PageProps) => {
  const [data, setData] = useState<EventSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(params.id)
        const res = await getEventSummary(Number(params.id));
        setData(res.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="inset-y-0 left-0 w-64 bg-gray-900 md:relative md:flex-shrink-0">
        <SidebarOrganizer />
      </div>

      <div className="flex-1 p-6 md-64 w-full">
        <SummaryControls eventTitle={data.eventTitle} />
        <OverviewCard
          totalRevenue={data.totalRevenue}
          ticketsSold={data.ticketsSold}
          totalTickets={data.totalTickets}
          percentageSold={data.percentageSold}
        />
        <TicketTable ticketTypes={data.byTicketType} />
      </div>
    </div>

  );
};

export default SummaryRevenuePage;

