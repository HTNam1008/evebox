'use client';

import TicketDetail from './components/ticketDetail';
import { useTicketById } from '@/app/(ticket)/libs/hooks/useTicketById';

export default function Page({ params }: { params: { id: string } }) {
    const { ticket, loading, error } = useTicketById(params.id);
  
    if (loading) {
      return <div className="text-white text-center">Đang tải...</div>;
    }
  
    if (error || !ticket) {
      return <div className="text-white text-center">Không tìm thấy vé</div>;
    }
  
    return (
      <div>
        <TicketDetail ticket={ticket} />
      </div>
    );
  }