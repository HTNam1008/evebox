// src/pages/register/index.tsx

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errorResponse';
import Link from 'next/link';

const Register = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'CUSTOMER',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Yêu cầu nhập email'),
      password: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Yêu cầu nhập mật khẩu'),
    }),
    onSubmit: async (values) => {
      console.log('{process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, values);
        // await axios.post(`http://172.18.0.3/auth/signup`, values);
        alert('Đăng ký thành công!');
        router.push('/login');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Đăng ký thất bại');
        } else {
          setError('Đăng ký thất bại');
        }
      }
    },
  });

  return (
    <div style={styles.container}>
      <h1>Đăng ký</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
        </div>
        <div>
          <label>Vai trò:</label>
          <select {...formik.getFieldProps('role')}>
            <option value="CUSTOMER">Khách hàng</option>
            <option value="ADMIN">Quản trị viên</option>
          </select>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Đăng ký</button>
      </form>
      <div style={styles.links}>
        <Link href="/login" style={styles.link}>
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '50px',
  },
  links: {
    marginTop: '20px',
  },
  link: {
    display: 'inline-block',
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};

export default Register;
