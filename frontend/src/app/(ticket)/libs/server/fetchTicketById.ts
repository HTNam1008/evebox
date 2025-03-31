import apiClient from '@/services/apiClientTicket';
import { IGetUserTicketByIdResponse } from '@/types/model/ticketInfoById';

export async function fetchTicketById(id: string) {
  try {
    const response = await apiClient.get<IGetUserTicketByIdResponse>(`/api/ticket/getUserTicketById/${id}`);
    //console.log(response.data.data);
    return response.data.data || null;
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    return null;
  }
}
