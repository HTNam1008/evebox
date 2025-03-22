export async function fetchSearchEvents(title: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/search?title=${title}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60, // ISR: Cập nhật dữ liệu mỗi 60s
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch event details");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching event details:", error);
  }
}
