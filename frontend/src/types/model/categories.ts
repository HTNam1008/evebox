// types/user.ts

import { BaseApiResponse } from "../BaseApiResponse";

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

// Response cho API /user/me
export type CategoriesResponse = BaseApiResponse<Category[]>;