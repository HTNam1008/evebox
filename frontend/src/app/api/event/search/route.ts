import { NextResponse } from 'next/server';
import apiClient from '@/services/apiClient';
import { ErrorResponse } from '@/types/ErrorResponse';
import { SearchEventsResponse } from '@/types/model/searchEvents';

export async function GET(request: Request): Promise<NextResponse<SearchEventsResponse | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (!title) {
      return NextResponse.json(
        { statusCode: 400, message: 'Missing title search' },
        { status: 400 }
      );
    }

    const params: Record<string, string> = { title };

    if (type) params.type = type;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    const response = await apiClient.get<SearchEventsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/search`,
      { params }
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
