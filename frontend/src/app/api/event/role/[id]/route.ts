import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import createApiClient from '@/services/apiClient';
import { ErrorResponse } from '@/types/ErrorResponse';
import { EventRole } from '@/types/model/EventRoleListResponse';

export async function GET(_: Request, { params }: { params: { id: string } }): Promise<NextResponse<EventRole | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ statusCode: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ statusCode: 400, message: 'Invalid role ID' }, { status: 400 });
    }

    const response = await apiClient.get<EventRole>(
      `/api/event/role/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`GET /api/event/role/${params.id} error:`, error);
    return NextResponse.json({ statusCode: 500, message: 'Internal Server Error' }, { status: 500 });
  }
}
