import { NextResponse } from 'next/server';
import apiClient from '@/services/apiClient';
import { ErrorResponse } from '@/types/ErrorResponse';
import { CategoriesResponse } from '@/types/model/categories';

export async function GET(): Promise<NextResponse<CategoriesResponse | ErrorResponse>> {
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
