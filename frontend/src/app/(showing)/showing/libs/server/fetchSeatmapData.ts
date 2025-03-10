/* Package System */

/* Package Application */
import { SeatMapResponse } from "@/types/model/seatmap";

export async function fetchSeatMap(showingId: string): Promise<SeatMapResponse | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/showing/seatmap?showingId=${showingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch seat map: ${response.statusText}`);
    }

    const data: SeatMapResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching seat map:", error);
    return null;
  }
}