export const fetchEvents = async () => {
  try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/event/front-display`,
          {
              next: {
                  revalidate: 60 // ISR: Cập nhật dữ liệu mỗi 60s
              },
              // cache: "no-store",
          }
      );

      if (!response.ok) throw new Error('Failed to fetch events');

      return response.json();
  } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Sẽ được xử lý bởi error.tsx
  }
};
