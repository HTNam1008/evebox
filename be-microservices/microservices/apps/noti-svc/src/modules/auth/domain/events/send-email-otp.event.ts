export interface ISendEmailOtpEvent {
  email: string; 
  otp: string; 
  type: string; 
  expiresAt: number;
}
