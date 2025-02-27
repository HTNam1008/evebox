export async function fetchEventDetail(eventId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/event/detail?eventId=${eventId}`,
        { cache: 'no-store' }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
  
      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      console.error('Error fetching event details:', error);
      return null;
    }
  }
  