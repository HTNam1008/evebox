import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ErrorResponse } from '../../../../types/errorResponse';
import { OtpConstants } from '../../../verify-otp/libs/constants/otpConstants';

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
        const result = await axios.post('/api/user/forgot-password', values);
        if (result.status === 200) {
          setError('');
          localStorage.setItem('verifyData', JSON.stringify({
            ...values,
            request_token: result.data.data.request_token,
            remaining_attempts: result.data.data.remaining_attempts,
            resend_allowed_in: result.data.data.resend_allowed_in,
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