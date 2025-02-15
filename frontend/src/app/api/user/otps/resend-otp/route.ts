import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { email, type, request_token } = await request.json();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/otps/resend-otp`,
      { email, type, request_token }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Gửi lại OTP thất bại' },
      { status: 500 }
    );
  }
}