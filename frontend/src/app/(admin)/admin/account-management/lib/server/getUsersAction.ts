'use server'

import { fetchUsers } from './fetchUsers';
import { UsersResponse } from "@/types/model/admin/user";

export async function getUsersAction(page: number, pageSize: number): Promise<UsersResponse> {
  return fetchUsers(page, pageSize);
}