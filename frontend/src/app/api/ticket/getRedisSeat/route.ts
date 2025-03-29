import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ErrorResponse } from '@/types/ErrorResponse';
import { authOptions } from '@/lib/authOptions';
import { redisInfoResponse } from '@/types/model/redisSeat';
import createApiClient from '@/services/apiClient';

export async function GET(request: Request): Promise<NextResponse<redisInfoResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_TICKET_SVC_URL || "");

  try {
    const session = await getServerSession(authOptions);
    console.log('Session route api me:', session);
    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { statusCode: 401, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const showingId = searchParams.get('showingId');

    if (!showingId) {
      return NextResponse.json(
        { statusCode: 400, message: 'Missing showingId parameter' },
        { status: 400 }
      );
    }

    // Type cho response từ backend
    const response = await apiClient.get<redisInfoResponse>(
      `${process.env.NEXT_PUBLIC_API_TICKET_SVC_URL}/api/ticket/getRedisSeat`, {
        params: { showingId: showingId },
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
