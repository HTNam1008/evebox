import { BaseApiResponse } from "@/types/BaseApiResponse";


export interface User{
  userId: string;
  name: string;
  email: string;
  status: string;
  role_id: number;
  created_at: string;
  role: {
    role_name: string;
  }
}

export interface UsersData {
    users: User[];
    total: number;
  }

export type UsersResponse = BaseApiResponse<UsersData>;