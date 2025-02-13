import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';  // Lấy token từ session

export async function POST(request: NextRequest) {
  try {
    // Lấy token từ request header
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    console.log('accessToken:', token.accessToken);

    // Gửi yêu cầu logout đến API của backend với Bearer token
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    // Kiểm tra phản hồi từ API
    if (response.status === 200) {
      // Thành công, trả về phản hồi thành công
      return NextResponse.json({ message: 'Logout successful' });
    } else {
      // Nếu có lỗi từ API
      return NextResponse.json({ message: 'Failed to logout' }, { status: response.status });
    }
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
