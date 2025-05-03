'use client'


/* Package System */
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

/* Package Application */
import { register } from '@/services/auth.service';
import { OtpConstants } from '@/app/(authentication)/verify-otp/libs/constants/otpConstants';
import { ErrorResponse } from '@/types/ErrorResponse';

export const useRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      re_password: '',
      role_id: 3,
      province_id: null,
      agree: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Yêu cầu nhập tên'),
      phone: Yup.string().min(10, 'Số điện thoại không hợp lệ').required('Yêu cầu nhập số điện thoại'),
      email: Yup.string().email('Email không hợp lệ').required('Yêu cầu nhập email'),
      password: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Yêu cầu nhập mật khẩu'),
      re_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
        .required('Yêu cầu nhập lại mật khẩu'),
      agree: Yup.boolean().oneOf([true], 'Bạn phải đồng ý với các điều khoản'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await register(values);
        if (result.statusCode === 200) {
          setError('');
          localStorage.setItem('verifyData', JSON.stringify({
            ...values,
            request_token: result.data.request_token,
            remaining_attempts: result.data.remaining_attempts,
            resend_allowed_in: result.data.resend_allowed_in,
            type: OtpConstants.REGISTER,
          }));
          router.push('/verify-otp');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Đăng ký thất bại');
        } else {
          setError('Đăng ký thất bại');
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return {
    showPassword,
    setShowPassword,
    showRePassword,
    setShowRePassword,
    error,
    isLoading,
    formik,
  };
};