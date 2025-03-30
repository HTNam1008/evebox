import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ErrorResponse } from '@/types/ErrorResponse';
import { authOptions } from '@/lib/authOptions';
import createApiClient from '@/services/apiClient';
import { BaseApiResponse } from '@/types/BaseApiResponse';

export async function PUT(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  
    try {
      const session = await getServerSession(authOptions);
      console.log('Session route api me:', session);
  
      if (!session?.user?.accessToken) {
        return NextResponse.json(
          { statusCode: 401, message: 'Unauthorized' },
          { status: 401 }
        );
      }
  
      const { 
        name, description, color, isFree, originalPrice, 
        startTime, endTime, position, quantity, 
        maxQtyPerOrder, minQtyPerOrder, file, isHidden 
      } = await request.json();
  
      // Validate required fields
      if (!startTime || !endTime || !name || !description || !color || 
          isFree === undefined || originalPrice === undefined || !position || 
          quantity === undefined || maxQtyPerOrder === undefined || 
          minQtyPerOrder === undefined || isHidden === undefined) {
        return NextResponse.json(
          { statusCode: 400, message: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json(
          { statusCode: 400, message: 'Missing id parameter' },
          { status: 400 }
        );
      }
  
      // Create FormData object
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("color", color);
      formData.append("isFree", String(isFree));
      formData.append("originalPrice", String(originalPrice));
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("position", String(position));
      formData.append("quantity", String(quantity));
      formData.append("maxQtyPerOrder", String(maxQtyPerOrder));
      formData.append("minQtyPerOrder", String(minQtyPerOrder));
      formData.append("isHidden", String(isHidden));
  
      if (file) {
        const buffer = Buffer.from(file, 'base64'); // Assuming file is sent as base64
        const blob = new Blob([buffer], { type: "application/octet-stream" }); // Adjust MIME type if necessary
        formData.append("file", blob, "uploadedFile");
      }
  
      // Send request with FormData
      const response = await apiClient.put<BaseApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/org/ticketType/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" } // Set content type for FormData
        }
      );
  
      return NextResponse.json(response.data);
    } catch (error) {
      console.error('Error:', error);
  
      return NextResponse.json(
        { statusCode: 500, message: 'Internal Server Error' },
        { status: 500 }
      );
    }
}

export async function DELETE(request: Request): Promise<NextResponse<BaseApiResponse | ErrorResponse>> {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
  
    try {
      const session = await getServerSession(authOptions);
      console.log('Session route api me:', session);
      if (!session?.user?.accessToken) {
        return NextResponse.json(
          { statusCode: 401, message: 'Unauthorized' },
          { status: 401 }
        );
      }
  
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json(
          { statusCode: 400, message: 'Missing id parameter' },
          { status: 400 }
        );
      }
  
      // Type cho response từ backend
      const response = await apiClient.delete<BaseApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/org/ticketType/${id}` 
      );
  
      return NextResponse.json(response.data);
    } catch (error) {
      console.error('Error:', error);
  
      return NextResponse.json(
        { statusCode: 500, message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }