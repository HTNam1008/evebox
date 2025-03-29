import { NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/ErrorResponse';
import { FrontDisplayResponse } from '@/types/model/frontDisplay';
import createApiClient from '@/services/apiClient';

export async function GET(): Promise<NextResponse<FrontDisplayResponse | ErrorResponse>> {
  try {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
    // Type cho response từ backend
    const response = await apiClient.get<FrontDisplayResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/front-display`
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
