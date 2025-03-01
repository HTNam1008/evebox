import axios from "axios";

export async function fetchEventDetail(eventId: string) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/event/detail`, {
        params: { eventId: eventId },
      })

      console.log(response.status)

      if (!response.data) {
        throw new Error('Failed to fetch event details');
      }
  
      const data = await response.data;
      return data?.data || null;
    } catch (error) {
      console.error('Error fetching event details:', error);
      return null;
    }
  }
  