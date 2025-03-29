import { NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/ErrorResponse';
import { CategoriesResponse } from '@/types/model/categories';
import createApiClient from '@/services/apiClient';

export async function GET(): Promise<NextResponse<CategoriesResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");

  try {
    // Type cho response từ backend
    const response = await apiClient.get<CategoriesResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
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
