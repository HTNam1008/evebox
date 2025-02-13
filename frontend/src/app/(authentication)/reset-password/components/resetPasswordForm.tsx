"use client";

import Link from 'next/link';
import { useResetPasswordForm } from '../libs/hooks/useResetPasswordForm';
import { Icon } from '@iconify/react';
import '@/styles/admin/pages/ForgotPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton } from '@mui/material';

export const ResetPasswordForm = () => {
    const {
        showPassword,
        setShowPassword,
        showRePassword,
        setShowRePassword,
        error,
        formik,
    } = useResetPasswordForm();

    return (
        <div className="row">
            <div className="col-md-7 d-flex align-items-center justify-content-center left-pane">
                <Link href="/login" className="back-link">&lt; Quay lại Đăng nhập</Link>
                <div className="w-75">
                    <div className="form">
                        <div className="container d-flex flex-column align-items-center">
                            <img src="../../../images/logo.png" alt="EveBox Logo" className="logo" />
                            <h3 ><strong>Đặt lại mật khẩu</strong></h3>
                            <p className="subheading">Mật khẩu trước của bạn đã được thiết lập lại. Vui lòng đặt mật khẩu mới cho tài khoản của bạn!</p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label bold-label">NHẬP MẬT KHẨU MỚI</label>
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="pasword"
                                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Nhập mật khẩu"
                                        onChange={(e) => {
                                            formik.setFieldValue('password', e.target.value);
                                            formik.setFieldTouched('password', true, false);
                                        }}
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
                                {formik.touched.password && formik.errors.password && (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                )}
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label bold-label">NHẬP LẠI MẬT KHẨU MỚI</label>
                                <div className="position-relative">
                                    <input
                                        type={showRePassword ? 'text' : 'password'}
                                        id="re_password"
                                        className={`form-control ${formik.touched.re_password && formik.errors.re_password ? 'is-invalid' : ''}`}
                                        placeholder="Nhập lại mật khẩu"
                                        onChange={(e) => {
                                            formik.setFieldValue('re_password', e.target.value);
                                            formik.setFieldTouched('re_password', true, false);
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.re_password}
                                    />
                                    <IconButton
                                        className='position-absolute eye-btn'
                                        aria-label="Toggle password visibility"
                                        onClick={() => setShowRePassword(!showRePassword)}
                                    >
                                        <Icon icon={showRePassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                                    </IconButton>
                                </div>
                                {formik.touched.re_password && formik.errors.re_password && (
                                    <div className="invalid-feedback">{formik.errors.re_password}</div>
                                )}
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <button
                                style={{ marginTop: '50px' }}
                                type="submit"
                                className="btn btn-primary w-100 mb-3"
                                disabled={!formik.isValid || !formik.dirty}
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