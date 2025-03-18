/* Package System */

/* Package Application */
import { BaseApiResponse } from "@/types/BaseApiResponse";
import { ShowingData } from "@/types/model/seatmap";

export async function fetchShowingData(showingId: string): Promise<BaseApiResponse<ShowingData> | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_TICKET_SVC_URL}/api/showing?showingId=${showingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch showing data: ${response.statusText}`);
    }

    const data: BaseApiResponse<ShowingData> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching showing data:", error);
    return null;
  }
}