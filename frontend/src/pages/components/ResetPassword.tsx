import React from "react";
import { useState, useContext, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errorResponse';
import '../../../public/styles/admin/pages/ForgotPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react';
import { TextField, Button, IconButton, } from '@mui/material';


const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [error, setError] = useState('');
    const [resetToken, setResetToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const tokenFromQuery = router.query.reset_token as string;
        const tokenFromStorage = sessionStorage.getItem('reset_token');
        const token = tokenFromQuery || tokenFromStorage;
    
        if (token) {
            setResetToken(token);
            if (!tokenFromQuery) {
                router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, reset_token: token },
                });
            }
        } else {
            setError('Không tìm thấy mã yêu cầu thay đổi mật khẩu.');
        }
    }, [router.query]);
    
      const resetPasswordFormik = useFormik({
        initialValues: {
          password: '',
          re_password: '',
          resetToken: resetToken || '',
        },
        validationSchema: Yup.object({
          password: Yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Yêu cầu nhập mật khẩu'),
          re_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
            .required('Yêu cầu nhập lại mật khẩu'),
        }),
        validate: values => {
          const errors: { password?: string; re_password?: string; } = {};
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
    
          return errors;
        },
        onSubmit: async (values) => {
          if (!resetToken) {
            setError('Không tìm thấy mã yêu cầu thay đổi mật khẩu.');
            return;
          }
    
          try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password`, {
              newPassword: values.password,
              confirmPassword: values.re_password,
              resetToken: resetToken,
            });
            if (result.status === 200 || result.status === 201) {
              alert('Đổi mật khẩu thành công!');
              setTimeout(() => {
                router.push('/login');
              }, 3000);
            } else {
              setError(`Đổi mật khẩu thất bại: ${result.data.message}`);
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

    return (
        <div className="row">
            <div className="col-md-7 d-flex align-items-center justify-content-center left-pane">
                <a href="/login" className="back-link">
                    &lt; Quay lại Đăng nhập
                </a>
                <div className="w-75">
                    <div className="form">
                        <div className="container d-flex flex-column align-items-center">
                            <img src="../../../images/logo.png" alt="EveBox Logo" className="logo" />
                            <h3 ><strong>Đặt lại mật khẩu</strong></h3>
                            <p className="subheading">Mật khẩu trước của bạn đã được thiết lập lại. Vui lòng đặt mật khẩu mới cho tài khoản của bạn!</p>
                        </div>
                        <form onSubmit={resetPasswordFormik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label bold-label">NHẬP MẬT KHẨU MỚI</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="pasword"
                                        className={`form-control ${resetPasswordFormik.touched.password && resetPasswordFormik.errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Nhập mật khẩu"
                                        onChange={(e) => {
                                            resetPasswordFormik.setFieldValue('password', e.target.value);
                                            resetPasswordFormik.setFieldTouched('password', true, false);
                                        }}
                                        onBlur={resetPasswordFormik.handleBlur}
                                        value={resetPasswordFormik.values.password}
                                    />
                                    {!resetPasswordFormik.errors.password && (
                                        <IconButton
                                            className='position-absolute eye-btn'
                                            aria-label="Toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <Icon icon={showPassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                                        </IconButton>
                                    )}
                                </div>
                                {resetPasswordFormik.touched.password && resetPasswordFormik.errors.password && (
                                    <div className="invalid-feedback">{resetPasswordFormik.errors.password}</div>
                                )}
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label bold-label">NHẬP LẠI MẬT KHẨU MỚI</label>
                                <div className="position-relative">
                                    <input
                                        type={showRePassword ? 'text' : 'password'}
                                        id="re_password"
                                        className={`form-control ${resetPasswordFormik.touched.re_password && resetPasswordFormik.errors.re_password ? 'is-invalid' : ''}`}
                                        placeholder="Nhập lại mật khẩu"
                                        onChange={(e) => {
                                            resetPasswordFormik.setFieldValue('re_password', e.target.value);
                                            resetPasswordFormik.setFieldTouched('re_password', true, false);
                                        }}
                                        onBlur={resetPasswordFormik.handleBlur}
                                        value={resetPasswordFormik.values.re_password}
                                    />
                                    {!resetPasswordFormik.errors.re_password && (
                                        <IconButton
                                            className='position-absolute eye-btn'
                                            aria-label="Toggle password visibility"
                                            onClick={() => setShowRePassword(!showRePassword)}
                                        >
                                            <Icon icon={showRePassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                                        </IconButton>
                                    )}
                                </div>
                                {resetPasswordFormik.touched.re_password && resetPasswordFormik.errors.re_password && (
                                    <div className="invalid-feedback">{resetPasswordFormik.errors.re_password}</div>
                                )}
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <button
                                style={{ marginTop: '50px' }}
                                type="submit"
                                className="btn btn-primary w-100 mb-3"
                                disabled={!resetPasswordFormik.isValid || !resetPasswordFormik.dirty}
                            >
                                Đặt lại mật khẩu
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

export default ResetPassword;