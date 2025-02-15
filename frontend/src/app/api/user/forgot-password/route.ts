import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email là bắt buộc.' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`,
      { email }
    );

    return NextResponse.json(
      { 
        success: true,
        data: response.data.data,
        message: 'Email đã được gửi thành công'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error during password reset request:', error);
    const axiosError = error as { response?: { data?: { message?: string } } };
    return NextResponse.json(
      { 
        success: false,
        message: axiosError.response?.data?.message || 'Gửi email thất bại'
      },
      { status: 500 }
    );
  }
}