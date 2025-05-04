import { NextRequest, NextResponse } from "next/server";
import { gatewayService } from "@/services/instance.service";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    
    // Extract password data
    const { oldPassword, newPassword, confirmPassword } = body;
    
    // Basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required" }, 
        { status: 400 }
      );
    }
    
    // Check if new password and confirmation match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New password and confirmation do not match" },
        { status: 400 }
      );
    }
    
    // Send request to backend service
    const response = await gatewayService.post('/api/user/change-password', {
      oldPassword,
      newPassword,
      confirmPassword
    });

    // Return the backend response
    const data = await response.data.data;
    
    if (response.status !== 200) {
      return NextResponse.json(
        { message: data.message || "Password change failed" },
        { status: response.status }
      );
    }
    
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { message: "An error occurred while changing password" },
      { status: 500 }
    );
  }
}