'use client';

import { gatewayService } from "@/services/instance.service";
import { UsersResponse } from "@/types/model/admin/user";

export const fetchUsers = async (page: number, pageSize: number): Promise<UsersResponse> => {
  try {
    const response = await gatewayService.get(`/api/admin/user?page=${page}&pageSize=${pageSize}`);
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};