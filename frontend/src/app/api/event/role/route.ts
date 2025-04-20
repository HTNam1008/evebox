import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import createApiClient from '@/services/apiClient';
import { ErrorResponse } from '@/types/ErrorResponse';
import { EventRoleListResponse } from '@/types/model/EventRoleListResponse';

export async function GET(): Promise<NextResponse<EventRoleListResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ statusCode: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const response = await apiClient.get<EventRoleListResponse>(
      `/api/event/role`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('GET /api/event/role error:', error);
    return NextResponse.json({ statusCode: 500, message: 'Internal Server Error' }, { status: 500 });
  }
}

