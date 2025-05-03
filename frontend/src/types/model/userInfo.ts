// types/user.ts

import { BaseApiResponse } from "../BaseApiResponse";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: number;
  avatar_id?: number;
}

// Response cho API /user/me
export type UserInfoResponse = BaseApiResponse<UserInfo>;