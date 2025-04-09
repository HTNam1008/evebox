import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ErrorResponse } from '@/types/ErrorResponse';
import { authOptions } from '@/lib/authOptions';
import createApiClient from '@/services/apiClient';
import { BaseApiResponse } from '@/types/BaseApiResponse';
import { PaymentOrgResponse } from '@/types/model/PaymentOrgResponse';

export async function POST(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");

  try {
    const session = await getServerSession(authOptions);
    console.log('Session route api me:', session);

    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { statusCode: 401, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId, accountName, accountNumber, bankName, branch, businessType,fullName, address, taxCode } = await request.json();

    // Validate required fields
    if (!eventId || !accountName || !accountNumber || !bankName || !branch || !businessType || !fullName || !address || !taxCode) {
      return NextResponse.json(
        { statusCode: 400, message: 'Missing request body field' },
        { status: 400 }
      );
    }

    // API call with eventId in the path instead of query parameters
    const response = await apiClient.post<BaseApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/org/payment`, 
      { eventId, accountName, accountNumber, bankName, branch, businessType,fullName, address, taxCode }
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

export async function GET(request: Request): Promise<NextResponse<PaymentOrgResponse | ErrorResponse>> {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  
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
      const eventId = searchParams.get('eventId');
  
      if (!eventId) {
        return NextResponse.json(
          { statusCode: 400, message: 'Missing eventId parameter' },
          { status: 400 }
          
        );
      }
  
      // Type cho response từ backend
      const response = await apiClient.get<PaymentOrgResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/org/payment`, {
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

export async function PUT(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  
    try {
      const session = await getServerSession(authOptions);
      console.log('Session route api me:', session);
      if (!session?.user?.accessToken) {
        return NextResponse.json(
          { statusCode: 401, message: 'Unauthorized' },
          { status: 401 }
        );
      }
  
      const {accountName, accountNumber, bankName, branch, businessType,fullName, address, taxCode } = await request.json();
  
      // Validate required fields
     if (!accountName || !accountNumber || !bankName || !branch || !businessType || !fullName || !address || !taxCode) {
        return NextResponse.json(
          { statusCode: 400, message: 'Missing request body field' },
          { status: 400 }
        );
      }
  
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json(
          { statusCode: 400, message: 'Missing showingId parameter' },
          { status: 400 }
        );
      }
  
      // Type cho response từ backend
      const response = await apiClient.put<BaseApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/org/payment/${id}`, 
        {accountName, accountNumber, bankName, branch, businessType,fullName, address, taxCode } 
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

export async function DELETE(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  
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
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json(
          { statusCode: 400, message: 'Missing showingId parameter' },
          { status: 400 }
        );
      }
  
      // Type cho response từ backend
      const response = await apiClient.delete<BaseApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/org/payment/${id}` 
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