import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email và mật khẩu là bắt buộc.' },
        { status: 400 }
      );
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
      email,
      password,
    });

    const { access_token, refresh_token } = response.data.data;

    return NextResponse.json(
      { message: 'Login successful', data: { access_token, refresh_token } },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error);

      return NextResponse.json(
        { message: error.response?.data?.message || 'Đăng nhập thất bại' },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error during login:', error);

      return NextResponse.json(
        { message: 'Đăng nhập thất bại' },
        { status: 500 }
      );
    }
  }
}
