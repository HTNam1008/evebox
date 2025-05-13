// src/types/model/provinceRevenue.ts

export interface ProvinceRevenueData {
    provinceName: string;
    eventCount: number;
    showingCount: number;
    totalRevenue: number;
  }
  
  export interface ProvinceRevenueResponse {
    statusCode: number;
    message: string;
    data: ProvinceRevenueData[];
  }
  