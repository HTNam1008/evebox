import { NextResponse } from "next/server";
import apiClient from "@/services/apiClient";
import { ErrorResponse } from "@/types/ErrorResponse";
import { SeatMapResponse } from "@/types/model/seatmap";

export async function GET(request: Request): Promise<NextResponse<SeatMapResponse | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const showingId = searchParams.get("showingId");

    if (!showingId) {
      return NextResponse.json(
        { statusCode: 400, message: "Missing showingId parameter" },
        { status: 400 }
      );
    }

    const response = await apiClient.get<SeatMapResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/showing/seatmap`, {
        params: { showingId: showingId },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { statusCode: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}