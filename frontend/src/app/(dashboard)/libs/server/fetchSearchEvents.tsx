interface FetchSearchEventsParams {
  title: string;
  type?: string;       // comma-separated category names
  startDate?: string;  // in YYYY-MM-DD format
  endDate?: string;    // in YYYY-MM-DD format
}

export async function fetchSearchEvents({
  title,
  type,
  startDate,
  endDate,
}: FetchSearchEventsParams) {
  try {
    const params = new URLSearchParams();
    params.append("title", title);
    if (type) params.append("type", type);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/search?${params.toString()}`,
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
