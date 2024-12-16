import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { email, otp, request_token, type } = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/otps/verify-otp`,
      { email, otp, request_token, type }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Xác thực thất bại' },
      { status: 500 }
    );
  }
}