/* Package System */
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

/* Package Application */
import { ErrorResponse } from '@/types/ErrorResponse';
import { OtpConstants } from '@/app/(authentication)/verify-otp/libs/constants/otpConstants';
import { forgotPassword } from '@/services/auth.service';

export const useForgotPasswordForm = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const emailFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Bạn chưa nhập email!')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ!')
    }),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await forgotPassword(values.email);
        if (result.status === 200) {
          setError('');
          localStorage.setItem('verifyData', JSON.stringify({
            ...values,
            request_token: result.data.request_token,
            remaining_attempts: result.data.remaining_attempts,
            resend_allowed_in: result.data.resend_allowed_in,
            type: OtpConstants.FORGOT_PASSWORD,
          }));
          router.push('/verify-otp');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Gửi mã OTP thất bại');
        } else {
          setError('Gửi mã OTP thất bại');
        }
      } finally {
        setIsLoading(false);
      }
    }
  });

  return {
    error,
    isLoading,
    emailFormik,
  };
};