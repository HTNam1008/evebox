"use client";

import { useForgotPasswordForm } from '../libs/hooks/useForgotPasswordForm';
import '@/styles/admin/pages/ForgotPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgress } from '@mui/material';
import Image from 'next/image'

export const ForgotPasswordForm = () => {
  const {
    error,
    // isContinued,
    // timeLeft,
    // isResendAllowed,
    // otp,
    // formatTime,
    // handleChangeOTP,
    // handleResendOtp,
    isLoading,
    emailFormik,
    // otpFormik
  } = useForgotPasswordForm();

  return (
    <div className="row">
      <div className="col-md-7 d-flex align-items-center justify-content-center left-pane">
        <a href="/login" className="back-link">
          &lt; Quay lại Đăng nhập
        </a>
        <div className="w-75">
          <div className="form">
            <div className="container d-flex flex-column align-items-center">
              <Image
                src="/images/logo.png"
                alt="EveBox Logo"
                width={50}
                height={50}
                className="logo"
              />
              <h3 ><strong>Quên mật khẩu?</strong></h3>
              <p className="subheading">Đừng lo, điều này xảy ra với tất cả chúng ta. Nhập email của bạn dưới đây để khôi phục mật khẩu.</p>
            </div>
            <form onSubmit={emailFormik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label bold-label">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${emailFormik.touched.email && emailFormik.errors.email ? 'is-invalid' : ''}`}
                  placeholder="Nhập email của bạn"
                  onChange={(e) => {
                    emailFormik.setFieldValue('email', e.target.value);
                    emailFormik.setFieldTouched('email', true, false);
                  }}
                  onBlur={emailFormik.handleBlur}
                  value={emailFormik.values.email}
                />
                {emailFormik.touched.email && emailFormik.errors.email && (
                  <div className="invalid-feedback">{emailFormik.errors.email}</div>
                )}
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button
                style={{ marginTop: '50px' }}
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={!emailFormik.isValid || !emailFormik.dirty}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Tiếp tục'}
              </button>

            </form>
          </div>
        </div>
      </div>
      <div className="col-md-5 background">
        <div className="overlay"></div>
      </div>
    </div>
  );
};