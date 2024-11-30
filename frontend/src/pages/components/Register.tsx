/* Package Application */
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errorResponse';
import Link from 'next/link';

/* Package System */
import { TextField, Button, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../public/styles/admin/pages/Register.css'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email('Email không hợp lệ').required('Yêu cầu nhập email'),
    //   password: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Yêu cầu nhập mật khẩu'),
    //   confirmPassword: Yup.string()
    //     .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    //     .required('Yêu cầu nhập lại mật khẩu'),
    //   agree: Yup.boolean().oneOf([true], 'Bạn phải đồng ý với các điều khoản'),
    // }),
    onSubmit: async (values) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, values);
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
    <div className='container-fluid vh-100 p-0'>
      <div className='row h-100 m-0'>
        <div className={`col-md-5 d-flex align-items-center justify-content-center left-register-pane`}>
          <div className="text-center">
            <h2>Chào mừng bạn quay lại!</h2>
            <p>Để không bỏ lỡ sự kiện nào, hãy cho chúng tôi biết thông tin của bạn</p>
            <Link href="/login">
              <button className="btn btn-light login-btn">Đăng nhập</button>
            </Link>
          </div>
        </div>
        <div className="col-md-7 d-flex align-items-center justify-content-center right-register-pane">
          <div className="w-75">
            <div className="register-form">
              <div className="register-container d-flex flex-column align-items-center">
                <img src="../../../images/logo.png" alt="EveBox Logo" className="mb-3 img-fluid logo" />
                <h3><strong>Đăng ký ngay với EveBox</strong></h3>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label font-style">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder='Nhập email của bạn'
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  // {...formik.getFieldProps('email')}
                  />
                  {/* {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )} */}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label font-style">Mật khẩu</label>
                  <div className='position-relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder='Nhập mật khẩu'
                      className={`form-control pr-10 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    // {...formik.getFieldProps('password')}
                    />
                    <IconButton
                      className='position-absolute eye-btn'
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                    </IconButton>
                  </div>
                  {/* {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  )} */}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label font-style">Nhập lại mật khẩu</label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder='Nhập lại mật khẩu'
                      className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                    // {...formik.getFieldProps('confirmPassword')}
                    />
                    <IconButton
                      className='position-absolute eye-btn'
                      aria-label="Toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Icon icon={showConfirmPassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                    </IconButton>
                  </div>
                  {/* {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                  )} */}
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="agree"
                    className="form-check-input"
                    {...formik.getFieldProps('agree')}
                  />
                  <label htmlFor="agree" className="form-check-label">
                    Tôi đồng ý với tất cả <a href='' style={{ color: 'white', cursor: 'pointer' }}>Các điều khoản</a> và <a href='' style={{ color: 'white', cursor: 'pointer' }}>Chính sách bảo mật</a>
                  </label>
                  {/* {formik.touched.agree && formik.errors.agree && (
                    <div className="text-danger">{formik.errors.agree}</div>
                  )} */}
                </div>
                {/* {error && <div className="text-danger mb-3">{error}</div>} */}
                <button type="submit" className="btn w-100 mb-3">Đăng ký</button>
                <div className="text-center">
                  <p style={{ color: 'white' }}>Hoặc</p>
                  <Link style={{ textDecoration: 'none' }} href="#">
                    <button className="google-button">
                      <Icon icon="flat-color-icons:google" width="20px" color="#fff" />
                      Đăng nhập với Google
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
