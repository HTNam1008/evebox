import { useState, useContext, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../../contexts/auth.context';
import { ErrorResponse } from '../../../../types/errorResponse';

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    try {
      setIsLoading(true);
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/google`,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      window.addEventListener('message', (event) => {
        if (event.origin === process.env.NEXT_PUBLIC_API_URL) {
          const { type, data, error } = event.data;

          if (type === 'GOOGLE_LOGIN_SUCCESS') {
            const { access_token } = data;
            login(access_token);
            router.push('/');
            popup?.close();
          } else if (type === 'GOOGLE_LOGIN_ERROR') {
            setError(error || 'Login failed');
            popup?.close();
          }
        }
      });
    } catch (err) {
      setError('Đã xảy ra lỗi khi đăng nhập với Google.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/google/callback`, {
          params: { code },
          withCredentials: true,
        })
        .then((response) => {
          const { access_token, refresh_token } = response.data.data;

          if (access_token) {
            login(access_token);
            localStorage.setItem('refresh_token', refresh_token); // Lưu refresh_token vào localStorage
            router.push('/');
          } else {
            setError('Không nhận được access token từ Google.');
          }
        })
        .catch(() => {
          setError('Đăng nhập Google thất bại');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Yêu cầu nhập email'),
      password: Yup.string().required('Yêu cầu nhập mật khẩu'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/user/login', values);

        const { access_token, refresh_token } = response.data.data;

        if (access_token) {
          login(access_token);
          localStorage.setItem('refresh_token', refresh_token); // Lưu refresh_token vào localStorage
          router.push('/');
        } else {
          throw new Error('Access token not found in response.');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Đăng nhập thất bại');
        } else {
          setError('Đăng nhập thất bại');
        }
      }
    },
  });

  return {
    showPassword,
    setShowPassword,
    error,
    isLoading,
    handleGoogleLogin,
    formik,
  };
};
