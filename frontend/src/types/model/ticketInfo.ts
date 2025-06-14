import { BaseApiResponse } from "../BaseApiResponse";

export interface IUserEvent {
    title: string;
    description: string;
  }
  
  export interface IUserShowing {
    startTime: Date;
    endTime: Date;
    Events: IUserEvent;
  }
  
  export interface IUserFormInput {
    fieldName: string;
  }
  
  export interface IUserFormAnswer {
    formInput: IUserFormInput;
    value: string;
  }
  
  export interface IUserFormResponse {
    answers: IUserFormAnswer[];
  }
  
  export interface IPaymentInfo {
    paidAt: Date;
  }
  
  export interface ITicketQRCode {
    qrCode: string;
    ticketTypeId: string;
    seatId?: number;
  }
  
  export interface IUserTicket {
    id: string; //order code
    showingId: string;
    status: number;
    type: string;
    price: number;
    PaymentInfo?: IPaymentInfo;
    TicketQRCode?: ITicketQRCode[];
    Showing?: IUserShowing;
    FormResponse: IUserFormResponse;
  }
  
  export interface IGetUserTicketResponse {
    statusCode: number;
    message: string;
    data: IUserTicket[];
  }
  

// Response cho API /ticket/getUserTicket
export type TicketInfoResponse = BaseApiResponse<IGetUserTicketResponse>;