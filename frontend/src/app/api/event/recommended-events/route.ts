import { NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/ErrorResponse';
import { RecommendedEventsResponse } from '@/types/model/recommendedEvent';
import createApiClient from '@/services/apiClient';

export async function GET(request: Request): Promise<NextResponse<RecommendedEventsResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");

  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('timeWindow');

    if (!eventId) {
      return NextResponse.json(
        { statusCode: 400, message: 'Missing timeWindow parameter' },
        { status: 400 }
      );
    }

    // Type cho response từ backend
    const response = await apiClient.get<RecommendedEventsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/recommended-events`, {
        params: { timeWindow: eventId },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error:', error);

    return NextResponse.json(
      { statusCode: 500, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
