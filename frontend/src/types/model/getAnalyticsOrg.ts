// Define JsonValue type to replace the Prisma import
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

// Define BaseResponse interface to replace the missing import
interface BaseResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

// Define Statistic structure inside analytics
export interface StatisticData {
  month: string;
  visits: number;
}

// Main analytics fields
export interface AnalyticData {
  eventId: number;
  eventTitle: string;
  totalClicks: number;
  weekClicks: number;
  totalUsers: number;
  totalBuyers: number;
  totalOrders: number;
  transferRating: number;
  statistic: StatisticData[];  // 6 months click statistics
}

// Final API response for analytics
export interface AnalyticResponse extends BaseResponse {
  data: AnalyticData;
}
