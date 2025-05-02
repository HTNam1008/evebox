import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UserInfoResponse } from "@/types/model/userInfo";
import { ErrorResponse } from "@/types/ErrorResponse";
import { authOptions } from "@/lib/authOptions";
import createApiClient from "@/services/apiClient";

export async function GET(
  req: NextRequest
): Promise<NextResponse<UserInfoResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { statusCode: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await apiClient.get<UserInfoResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error:", error);

    // Xử lý lỗi type-safe
    // if (error instanceof Error && 'response' in error) {
    //   const axiosError = error as any; // Chỉ dùng any ở đây nếu cần thiết
    //   return NextResponse.json(
    //     {
    //       statusCode: axiosError.response?.status || 500,
    //       message: axiosError.response?.data?.message || 'Unknown error',
    //     },
    //     { status: axiosError.response?.status || 500 }
    //   );
    // }

    return NextResponse.json(
      { statusCode: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
