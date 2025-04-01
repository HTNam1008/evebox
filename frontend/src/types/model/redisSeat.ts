// types/user.ts

import { BaseApiResponse } from "../BaseApiResponse";

export interface redisInfo {
  showingId: string;
  ticketTypeId: string;
  seatId: number[];
  quantity: number;
  expiredTime: number;
  ticketTypeName: string;
  ticketTypePrice: number;
  totalAmount: number;
}

export type redisInfoResponse = BaseApiResponse<redisInfo>;