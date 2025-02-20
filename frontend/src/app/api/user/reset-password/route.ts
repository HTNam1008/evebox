import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { newPassword, confirmPassword, resetToken } = await request.json();

    if (!newPassword || !confirmPassword || !resetToken) {
      return NextResponse.json(
        { message: 'Thiếu thông tin cần thiết.' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password`,
      { newPassword, confirmPassword, resetToken }
    );

    if (response.data.statusCode == 200) {
      return NextResponse.json(
        { message: 'Đổi mật khẩu thành công' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Đổi mật khẩu thất bại' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Đổi mật khẩu thất bại' },
      { status: 500 }
    );
  }
}