import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { name, phone, email, password, re_password, role_id, province_id, agree } = await request.json();

    // Validate required fields
    if (!name || !phone || !email || !password || !re_password) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin.' },
        { status: 400 }
      );
    }

    // Forward request to backend API
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
      name,
      phone,
      email,
      password,
      re_password,
      role_id,
      province_id,
      agree
    });

    const { request_token, remaining_attempts, resend_allowed_in } = response.data.data;

    return NextResponse.json(
      { 
        message: 'Registration successful', 
        data: { 
          request_token,
          remaining_attempts,
          resend_allowed_in 
        } 
      },
      { status: 200 }
    );

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during registration:', error);

      return NextResponse.json(
        { message: error.response?.data?.message || 'Đăng ký thất bại' },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error during registration:', error);

      return NextResponse.json(
        { message: 'Đăng ký thất bại' },
        { status: 500 }
      );
    }
  }
}