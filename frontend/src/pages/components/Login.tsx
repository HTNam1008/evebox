// src/pages/login/index.tsx

import { useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { ErrorResponse } from '@/types/errorResponse';
import '../../../public/styles/admin/pages/Login.css';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button, IconButton, colors } from '@mui/material';
import { Icon } from '@iconify/react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    validate: values => {
      const errors: { email?: string; password?: string } = {};

      if (!values.email) {
        errors.email = 'Bạn chưa nhập email';
      }

      if (!values.password) {
        errors.password = 'Bạn chưa nhập mật khẩu';
      }
      
      return errors;
    },
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
    <div>
      <div className="row">
        <div className="col-lg-7 col-md-12 d-flex align-items-center justify-content-center left-pane">
          <div className="w-75">
            <div className="login-form">
              <div className="login-container">
                <img src="../../../images/logo.png" alt="EveBox Logo" className="logo" />
                <h3 className='mt-3'><strong>Đăng nhập EveBox</strong></h3>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 short-input">
                  <label htmlFor="email" className="form-label font-style">Email</label>
                  <input
                    type="email"
                    id="email"
                    name='email'
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    placeholder="Nhập email của bạn"
                    style={{ height: '46px' }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {/* Hiển thị thông báo lỗi */}
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger" style={{ fontSize: '12px' }}>
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3 short-input">
                  <label htmlFor="password" className="form-label font-style">Mật khẩu</label>
                  <div className='position-relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name='password'
                      className={`form-control pr-10 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                      placeholder="Nhập mật khẩu"
                      style={{ height: '46px' }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <IconButton
                      className='position-absolute eye-btn'
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                    </IconButton>
                  </div>
                  {/* Hiển thị thông báo lỗi  */}
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger" style={{ fontSize: '12px' }}>
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 short-input">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="agree"
                      className="form-check-input"
                      {...formik.getFieldProps('agree')}
                    />
                    <label htmlFor="agree" className="form-check-label">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <div>
                    <a href="/ForgotPassword" className="text-decoration-none font-forget">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div className="short-input">
                  <button type="submit" className="btn btn-primary w-100"  style={{ marginBottom: '15px', marginTop: '10px' }} >
                    Đăng nhập
                  </button>
                </div>
                <div className="text-center short-input">
                  <p style={{ color: 'white', marginBottom: '10px'}}>Hoặc</p>
                  <Link style={{ textDecoration: 'none' }} href="#">
                    <button className="google-button" style={{ marginBottom: '20px', marginTop: '15px' }}>
                      <Icon icon="flat-color-icons:google" width="20px" color="#fff" />
                      Đăng nhập với Google
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 backdground">
          <div className="overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;