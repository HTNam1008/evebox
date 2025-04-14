import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import createApiClient from '@/services/apiClient';
import { BaseApiResponse } from '@/types/BaseApiResponse';
import { ErrorResponse } from '@/types/ErrorResponse';
import { EventMemberResponse } from '@/types/model/EventMemberResponse';

export async function POST(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ statusCode: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const { eventId, email, role } = await request.json();

    if (!eventId || !email || role === undefined) {
      return NextResponse.json({ statusCode: 400, message: 'Missing request body field' }, { status: 400 });
    }

    const response = await apiClient.post<BaseApiResponse>(
      `/org/member?eventId=${eventId}`,
      { email, role }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('POST /org/member error:', error);
    return NextResponse.json({ statusCode: 500, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request): Promise<NextResponse<EventMemberResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ statusCode: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const email = searchParams.get('email');

    if (!eventId) {
      return NextResponse.json({ statusCode: 400, message: 'Missing eventId parameter' }, { status: 400 });
    }

    const response = await apiClient.get<EventMemberResponse>(
      `/org/member/${eventId}`,
      {
        params: email ? { email } : undefined,
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('GET /org/member error:', error);
    return NextResponse.json({ statusCode: 500, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ statusCode: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const { eventId, email, role } = await request.json();

    if (!eventId || !email || role === undefined) {
      return NextResponse.json({ statusCode: 400, message: 'Missing request body field' }, { status: 400 });
    }

    const response = await apiClient.put<BaseApiResponse>(
      `/org/member?eventId=${eventId}`,
      { email, role },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('PUT /org/member error:', error);
    return NextResponse.json({ statusCode: 500, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || '');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ statusCode: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const email = searchParams.get('email');

    if (!eventId || !email) {
      return NextResponse.json({ statusCode: 400, message: 'Missing eventId or email parameter' }, { status: 400 });
    }

    const response = await apiClient.delete<BaseApiResponse>(
      `/org/member/${eventId}?email=${email}`,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('DELETE /org/member error:', error);
    return NextResponse.json({ statusCode: 500, message: 'Internal Server Error' }, { status: 500 });
  }
}
