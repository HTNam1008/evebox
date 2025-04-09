import { BaseApiResponse } from "../BaseApiResponse";

export interface PaymentInfo {
    id: string;
    eventId: number;
    organizerId: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    businessType: number;
    fullName: string;
    address: string;
    taxCode: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

// Response cho API /user/me
export type PaymentOrgResponse = BaseApiResponse<PaymentInfo>;