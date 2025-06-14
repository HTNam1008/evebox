import { NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/ErrorResponse';
import { EventResponse } from '@/types/model/event';
import createApiClient from '@/services/apiClient';

export async function GET(request: Request): Promise<NextResponse<EventResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { statusCode: 400, message: 'Missing eventId parameter' },
        { status: 400 }
      );
    }

    // Type cho response từ backend
    const response = await apiClient.get<EventResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/detail`, {
        params: { eventId: eventId },
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
