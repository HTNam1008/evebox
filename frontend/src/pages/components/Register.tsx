/* Package Application */
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errorResponse';
import Link from 'next/link';

/* Package System */
import { IconButton, CircularProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../public/styles/admin/pages/Register.css'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const registerFormik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      re_password: '',
      role_id: 3,
      province_id: [],
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
    validate: values => {
      const errors: { name?: string; phone?: string; email?: string; password?: string; re_password?: string; agree?: string } = {};

      if (!values.name) {
        errors.name = 'Bạn chưa nhập tên';
      }

      if (!values.phone) {
        errors.phone = 'Bạn chưa nhập số điện thoại';
      }

      if (values.phone[0] !== '0') {
        errors.phone = 'Số điện thoại không hợp lệ';
      }

      if (!values.email) {
        errors.email = 'Bạn chưa nhập email';
      }

      if (!values.password) {
        errors.password = 'Bạn chưa nhập mật khẩu';
      }

      if (values.password.length === 0) {
        errors.password = 'Bạn chưa nhập mật khẩu';
      }

      if (values.password.length > 0 && values.password.length < 6) {
        errors.password = 'Mật khẩu tối thiểu 6 ký tự';
      }

      if (!values.re_password) {
        errors.re_password = 'Bạn chưa nhập lại mật khẩu';
      }

      if (!values.agree) {
        errors.agree = 'Bạn chưa đồng ý với các điều khoản';
      }

      return errors;
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, values);
        if (result.status === 200) {
          setRegistrationError('');
          setIsLoading(false);
          localStorage.setItem('verifyData', JSON.stringify({
            name: values.name,
            phone: values.phone,
            password: values.password,
            re_password: values.re_password,
            email: values.email,
            request_token: result.data.data.request_token,
            agree: values.agree,
            role_id: values.role_id,
            province_id: values.province_id,
            remaining_attempts: result.data.data.remaining_attempts,
            resend_allowed_in: result.data.data.resend_allowed_in,
          }));
          router.push('/verify-otp');
        }
        else {
          setIsLoading(false);
          setRegistrationError(`Đăng ký thất bại: ${result.data.message}`);
        }
      } catch (err) {
        setIsLoading(false);
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setRegistrationError(error.response?.data?.message || 'Đăng ký thất bại');
        } else {
          setRegistrationError('Đăng ký thất bại');
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
              <form onSubmit={registerFormik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label font-style">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Nhập email của bạn"
                    className={`form-control ${registerFormik.touched.email && registerFormik.errors.email ? 'is-invalid' : ''}`}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    value={registerFormik.values.email}
                  />
                  {registerFormik.touched.email && registerFormik.errors.email && (
                    <div className="text-danger" style={{ fontSize: '12px' }}>
                      {registerFormik.errors.email}
                    </div>
                  )}
                </div>

                <div className="d-flex mb-3">
                  <div className="me-2 w-50">
                    <label htmlFor="name" className="form-label font-style">Tên</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Nhập tên của bạn"
                      className={`form-control ${registerFormik.touched.name && registerFormik.errors.name ? 'is-invalid' : ''}`}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      value={registerFormik.values.name}
                    />
                    {registerFormik.touched.name && registerFormik.errors.name && (
                      <div className="text-danger" style={{ fontSize: '12px' }}>
                        {registerFormik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="w-50">
                    <label htmlFor="phone" className="form-label font-style">Số điện thoại</label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Nhập số điện thoại của bạn"
                      className={`form-control ${registerFormik.touched.phone && registerFormik.errors.phone ? 'is-invalid' : ''}`}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      value={registerFormik.values.phone}
                    />
                    {registerFormik.touched.phone && registerFormik.errors.phone && (
                      <div className="text-danger" style={{ fontSize: '12px' }}>
                        {registerFormik.errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <div className="me-2 w-50">
                    <label htmlFor="password" className="form-label font-style">Mật khẩu</label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Nhập mật khẩu"
                        className={`form-control ${registerFormik.touched.password && registerFormik.errors.password ? 'is-invalid' : ''}`}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        value={registerFormik.values.password}
                      />
                      {!registerFormik.errors.password && (
                        <IconButton
                          className="position-absolute eye-btn"
                          aria-label="Toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon icon={showPassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                        </IconButton>
                      )}
                    </div>
                    {registerFormik.touched.password && registerFormik.errors.password && (
                      <div className="text-danger" style={{ fontSize: '12px' }}>
                        {registerFormik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="w-50">
                    <label htmlFor="re_password" className="form-label font-style">Nhập lại mật khẩu</label>
                    <div className="position-relative">
                      <input
                        type={showRePassword ? 'text' : 'password'}
                        id="re_password"
                        name='re_password'
                        placeholder="Nhập lại mật khẩu"
                        className={`form-control ${registerFormik.touched.re_password && registerFormik.errors.re_password ? 'is-invalid' : ''}`}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        value={registerFormik.values.re_password}
                      />
                      {!registerFormik.errors.re_password && (
                        <IconButton
                          className="position-absolute eye-btn"
                          aria-label="Toggle password visibility"
                          onClick={() => setShowRePassword(!showRePassword)}
                        >
                          <Icon icon={showRePassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                        </IconButton>
                      )}
                    </div>
                    {registerFormik.touched.re_password && registerFormik.errors.re_password && (
                      <div className="text-danger" style={{ fontSize: '12px' }}>
                        {registerFormik.errors.re_password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="agree"
                    className="form-check-input"
                    {...registerFormik.getFieldProps('agree')}
                  />
                  <label htmlFor="agree" className="form-check-label">
                    Tôi đồng ý với tất cả <a href="" style={{ color: 'white', cursor: 'pointer' }}>Các điều khoản</a> và <a href="" style={{ color: 'white', cursor: 'pointer' }}>Chính sách bảo mật</a>
                  </label>
                  {registerFormik.touched.agree && registerFormik.errors.agree && (
                    <div className="text-danger">{registerFormik.errors.agree}</div>
                  )}
                </div>
                {registrationError && registrationError !== '' && <div className="alert alert-danger error-msg text-center">{registrationError}</div>}
                <button type="submit" className="btn w-100 mb-3">
                  {/* {isLoading ? <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div> : 'Đăng ký'} */}
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
                </button>
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
