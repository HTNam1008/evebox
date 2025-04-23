export interface EventRoleListResponse {
    statusCode: number;
    message: string;
    data: EventRole[];
  }
  
  export interface EventRole {
    role: number;
    isEdited: boolean;
    isSummarized: boolean;
    viewVoucher: boolean;
    marketing: boolean;
    viewOrder: boolean;
    viewSeatmap: boolean;
    viewMember: boolean;
    checkin: boolean;
    checkout: boolean;
    redeem: boolean;
  }
  