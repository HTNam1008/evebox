import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { ErrorResponse } from "@/types/ErrorResponse";
import { authOptions } from "@/lib/authOptions";
import createApiClient from "@/services/apiClient";
import { UsersResponse } from "@/types/model/admin/user";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<UsersResponse | ErrorResponse>> {
  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  const { searchParams } = new URL(req.url);
  
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.accessToken) {
        console.log("Unauthorized access attempt");
      return NextResponse.json(
        { statusCode: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await apiClient.get<UsersResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user?page=${page}&pageSize=${pageSize}`
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
