import React from "react";
import { useState, useContext, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errorResponse';
import '../../../public/styles/admin/pages/ForgotPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TIMELEFT = 3600;
const ATTEMPTS = 5;

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [isContinued, setIsContinued] = useState(false);
  const [requestToken, setRequestToken] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIMELEFT);
  const [isResendAllowed, setIsResendAllowed] = useState(false);

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const router = useRouter();

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendAllowed(true);
    } else {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); 
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Bạn chưa nhập email!')
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          'Email không hợp lệ!'
        ), // Kiểm tra định dạng email
    }),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`, values);
        console.log('result', result);
        if (result.data.statusCode === 200) {
          alert('Email đã được gửi, vui lòng kiểm tra hộp thư của bạn!');
          setIsContinued(true);
          setRequestToken(result.data.data.request_token ?? '');
          setTimeLeft(result.data.data.resend_allowed_in ?? TIMELEFT);
          //setAttempts(result.data.data.remaining_attempts ?? ATTEMPTS);
          setIsResendAllowed(false);
        }
        else {
          setError(`Thất bại: ${result.data.message}`);
          alert(result.data.message);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Thất bại');
        } else {
          setError('Thất bại');
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
          email: formik.values.email,
          otp: values.otp,
          request_token: requestToken,
          type: 'FORGOT_PASSWORD'
        });
        if (result.status === 200 || result.status === 201) {
          alert('Xác nhận OTP thành công!');
          
          // Lấy reset_token từ response
          const resetToken = result.data.data.token;

          sessionStorage.setItem('reset_token', resetToken);
          console.log('resetToken in ForgotPassword:', resetToken);

          setTimeout(() => {
            router.push({
              pathname: '/reset-password',
              query: { reset_token: resetToken },
            });
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

    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    setOtp(newOtp);

    otpFormik.setFieldValue('otp', newOtp.join(''));

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  const handleResendOtp = () => {
    setError('');

    formik.handleSubmit();
  };
  
  return (
    <div className="row">
      <div className="col-md-7 d-flex align-items-center justify-content-center left-pane">
        <a href="/login" className="back-link">
          &lt; Quay lại Đăng nhập
        </a>
        <div className="w-75">
          {isContinued ?
            <div className='verify-form'>
              <div className="verify-container d-flex flex-column align-items-center">
                <img src="../../../images/logo.png" alt="EveBox Logo" className="mb-3 img-fluid logo" />
                <h3><strong>Xác thực OTP</strong></h3>
                <br></br>
                <h4><strong>Nhập mã OTP gồm 6 chữ số</strong></h4>
                <span className='verify-msg-1'>Chúng tôi đã gửi mã OTP đến email:</span>
                <span className='verify-msg-2'>{formik.values.email !== '' ? formik.values.email : 'dattruong01082@gmail.com'}</span>
              </div>
              <form onSubmit={otpFormik.handleSubmit}>
                <div className="otp-area d-flex flex-column align-items-center">
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
                <div className="text-center">
                  <span style={{ fontSize: '12px', color: 'white' }}>Lưu ý: Bạn vui lòng kiểm tra tất cả các thư mục của email<br></br>(Hộp thư đến, Quảng cáo, Thư rác,...)</span>
                  <br></br>
                  <p style={{ color: 'white' }}>Bạn không nhận được mã OTP? <strong onClick={handleResendOtp} className={`resend-btn ${isResendAllowed ? '' : 'disabled'}`}>Gửi lại mã</strong></p>
                </div>
                <div className="otp-timer d-flex align-items-center justify-content-center">
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <button type="submit" className="btn w-100 mb-3">Xác minh OTP</button>
              </form>
            </div>
            :
            <div className="form">
              <div className="container d-flex flex-column align-items-center">
                <img src="../../../images/logo.png" alt="EveBox Logo" className="logo" />
                <h3 ><strong>Quên mật khẩu?</strong></h3>
                <p className="subheading">Đừng lo, điều này xảy ra với tất cả chúng ta. Nhập email của bạn dưới đây để khôi phục mật khẩu.</p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label bold-label">EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    placeholder="Nhập email của bạn"
                    onChange={(e) => {
                      formik.setFieldValue('email', e.target.value);
                      formik.setFieldTouched('email', true, false);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  style={{ marginTop: '50px' }}
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Tiếp tục
                </button>
              </form>
            </div>
        }
        </div>
      </div>
      <div className="col-md-5 background">
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
