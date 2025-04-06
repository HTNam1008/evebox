import createApiClient from "@/services/apiClient";
import { END_POINT_LIST } from "@/services/endpoints";

const authService = createApiClient(process.env.NEXT_PUBLIC_API_URL!);

export const forgotPassword = async (email: string) => {
  return await authService.post(END_POINT_LIST.USER.FORGOT_PASSWORD, {
    email,
  });
};

interface RegisterPayloadProps {
  name: string;
  phone: string;
  email: string;
  password: string;
  re_password: string;
  agree: boolean;
  role_id: number;
  province_id: number[];
}

export const register = async (payload: RegisterPayloadProps) => {
  return await authService.post(END_POINT_LIST.USER.REGISTER, payload);
}

interface VerifyOtpPayloadProps {
  email: string;
  otp: string;
  request_token: string;
  type: string;
}

export const verifyOtp = async (payload: VerifyOtpPayloadProps) => {
  return await authService.post(END_POINT_LIST.USER.VERIFY_OTP, payload);
}