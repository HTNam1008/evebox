import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import apiClient from '@/services/apiClient';

export async function GET() {
  try {
    // Lấy session từ NextAuth
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.accessToken) {
      return NextResponse.json(
        {
          statusCode: 401,
          message: 'Unauthorized: No valid session found',
        },
        { status: 401 }
      );
    }

    // Gửi request tới API backend để lấy thông tin người dùng
    const response = await apiClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`);

    // Trả về dữ liệu thành công
    return NextResponse.json({
      statusCode: 200,
      message: 'User details fetched successfully',
      data: response.data.data,
    });
  } catch (error: any) {
    console.error('Error fetching user details:', error);

    // Kiểm tra lỗi từ backend (nếu có)
    if (error.response && error.response.status === 401) {
      return NextResponse.json(
        {
          statusCode: 401,
          message: error.response.data.message || 'Unauthorized',
        },
        { status: 401 }
      );
    }

    // Trả về lỗi khác
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
