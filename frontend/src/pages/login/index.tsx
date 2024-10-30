// src/pages/login/index.tsx

import { useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { ErrorResponse } from '@/types/errorResponse';
import styles from '@/styles/Login.module.css'; // Sử dụng CSS Modules nếu cần
import Link from 'next/link';

const Login = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useContext(AuthContext); // Sử dụng login từ AuthContext

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
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, values);
        const { accessToken } = response.data;

        // Gọi phương thức login để cập nhật AuthContext
        login(accessToken);

        alert('Đăng nhập thành công!');
        router.push('/dashboard');
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

  return (
    <div className={styles.container}>
      <h1>Đăng nhập</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.field}>
          <label>Email:</label>
          <input type="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.field}>
          <label>Mật khẩu:</label>
          <input type="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? (
            <div className={styles.error}>{formik.errors.password}</div>
          ) : null}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button}>
          Đăng nhập
        </button>
      </form>
      <div className={styles.links}>
        <Link href="/register" className={styles.link}>
          Đăng ký
        </Link>
      </div>
    </div>
  );
};

export default Login;
