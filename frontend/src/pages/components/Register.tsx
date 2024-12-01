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
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [requestToken, setRequestToken] = useState('');

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [cntOTP, setCntOTP] = useState(0);
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

      if (values.password.length < 6) {
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
      try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, values);
        console.log('result', result);
        if (result.status === 200) {
          alert('Email đã được gửi, vui lòng kiểm tra hộp thư của bạn!');
          setIsRegistered(true);
          setRequestToken(result.data.data.request_token);
        }
        else {
          setError(`Đăng ký thất bại: ${result.data.message}`);
          alert(result.data.message);
        }
        // alert('Email has been sent!');
        // setTimeout(() => {
        //   router.push('/login');
        // }, 3000);
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

  const otpFormik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string().required('Yêu cầu nhập mã OTP'),
    }),
    validate: values => {
      const errors: { otp?: string } = {};

      if (!values.otp) {
        errors.otp = 'Bạn chưa nhập mã OTP';
      }

      if (values.otp.length < 6) {
        errors.otp = 'Mã OTP không hợp lệ';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/otps/verify-otp`, {
          email: registerFormik.values.email,
          otp: values.otp,
          request_token: requestToken,
          type: 'REGISTER'
        });
        if (result.status === 200 || result.status === 201) {
          alert('Đăng ký thành công!');
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
        else {
          setError(`Xác thực thất bại: ${result.data.message}`);
          alert(result.data.message);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Xác thực thất bại');
        } else {
          setError('Xác thực thất bại');
        }
      }
    },
  })

  function handleChangeOTP(e: any, index: number) {
    if (isNaN(e.target.value)) return false;

    // Tạo một mảng mới dựa trên giá trị hiện tại của `otp`
    const newOtp = [...otp];
    newOtp[index] = e.target.value; // Cập nhật giá trị tại vị trí index

    // Cập nhật state otp
    setOtp(newOtp);

    // Cập nhật giá trị trong Formik ngay lập tức
    otpFormik.setFieldValue('otp', newOtp.join('')); // Gộp thành chuỗi

    // Chuyển focus sang ô tiếp theo nếu có
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

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
            {isRegistered ?
              <div className='verify-form'>
                <div className="verify-container d-flex flex-column align-items-center">
                  <img src="../../../images/logo.png" alt="EveBox Logo" className="mb-3 img-fluid logo" />
                  <h3><strong>Xác thực OTP</strong></h3>
                  <br></br>
                  <br></br>
                  <h4><strong>Nhập mã OTP gồm 6 chữ số</strong></h4>
                  <span className='verify-msg-1'>Chúng tôi đã gửi mã OTP đến email:</span>
                  <span className='verify-msg-2'>{registerFormik.values.email !== '' ? registerFormik.values.email : 'dattruong01082@gmail.com'}</span>
                </div>
                <form onSubmit={otpFormik.handleSubmit}>
                  <div className="otp-area d-flex flex-column align-items-center mb-3">
                    <label htmlFor="otp" className="form-label font-style text-center">Mã OTP</label>
                    <div className='otp-nums align-items-center'>
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="otp-input"
                          onChange={(e) => handleChangeOTP(e, index)}
                          value={data}
                        />
                      ))}
                    </div>
                    {otpFormik.touched.otp && otpFormik.errors.otp && (
                      <div className="text-danger" style={{ fontSize: '12px' }}>
                        {Array.isArray(otpFormik.errors.otp) ? otpFormik.errors.otp.join(', ') : otpFormik.errors.otp}
                      </div>
                    )}
                  </div>
                  {error && <div className="alert alert-danger error-msg text-center">{error}</div>}
                  <button type="submit" className="btn w-100 mb-3">Xác minh OTP</button>
                </form>
                <div className="text-center">
                  <p style={{ color: 'white' }}>Chưa nhận được mã?</p>
                  <button className="btn btn-link text-white">Gửi lại mã</button>
                </div>
              </div>
              :
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
                  {error && <div className="alert alert-danger error-msg text-center">{error}</div>}
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
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
