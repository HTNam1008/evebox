import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ErrorResponse } from '../../../../types/errorResponse';

export const useResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('reset_token');
    if (token) {
      setResetToken(token);
    } else {
      setError('Không tìm thấy mã yêu cầu thay đổi mật khẩu.');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: '',
      re_password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Yêu cầu nhập mật khẩu'),
      re_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
        .required('Yêu cầu nhập lại mật khẩu'),
    }),
    onSubmit: async (values) => {
      if (!resetToken) {
        setError('Không tìm thấy mã yêu cầu thay đổi mật khẩu.');
        return;
      }

      try {
        const result = await axios.post('/api/user/reset-password', {
          newPassword: values.password,
          confirmPassword: values.re_password,
          resetToken
        });

        if (result.status === 200) {
          router.push('/login');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Đổi mật khẩu thất bại');
        } else {
          setError('Đổi mật khẩu thất bại');
        }
      }
    },
  });

  return {
    showPassword,
    setShowPassword,
    showRePassword,
    setShowRePassword,
    error,
    formik,
  };
};