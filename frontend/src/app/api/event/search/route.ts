import { NextResponse } from 'next/server';
import apiClient from '@/services/apiClient';
import { ErrorResponse } from '@/types/ErrorResponse';
import { SearchEventsResponse } from '@/types/model/searchEvents';

export async function GET(request: Request): Promise<NextResponse<SearchEventsResponse | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    if (!title) {
      return NextResponse.json(
        { statusCode: 400, message: 'Missing title search' },
        { status: 400 }
      );
    }

    // Type cho response từ backend
    const response = await apiClient.get<SearchEventsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/search`, {
        params: { title: title },
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
