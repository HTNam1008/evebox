"use client";

import { IconButton, CircularProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/admin/pages/Register.css';
import { useRegisterForm } from '../libs/hooks/useRegisterForm';

export const RegisterForm = () => {
    const {
        showPassword,
        setShowPassword,
        showRePassword,
        setShowRePassword,
        error,
        isLoading,
        formik,
    } = useRegisterForm();

    return (
        <div className='container-fluid vh-100 p-0'>
            <div className='row h-100 m-0'>
                {/* Left pane */}
                <div className={`col-md-5 d-flex align-items-center justify-content-center left-register-pane`}>
                    <div className="text-center">
                        <h2>Chào mừng bạn quay lại!</h2>
                        <p>Để không bỏ lỡ sự kiện nào, hãy cho chúng tôi biết thông tin của bạn</p>
                        <Link href="/login">
                            <button className="btn btn-light login-btn">Đăng nhập</button>
                        </Link>
                    </div>
                </div>

                {/* Right pane - Form content */}
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
                                        placeholder="Nhập email của bạn"
                                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="text-danger" style={{ fontSize: '12px' }}>
                                            {formik.errors.email}
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
                                            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                        {formik.touched.name && formik.errors.name && (
                                            <div className="text-danger" style={{ fontSize: '12px' }}>
                                                {formik.errors.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="phone" className="form-label font-style">Số điện thoại</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            placeholder="Nhập số điện thoại của bạn"
                                            className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone}
                                        />
                                        {formik.touched.phone && formik.errors.phone && (
                                            <div className="text-danger" style={{ fontSize: '12px' }}>
                                                {formik.errors.phone}
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
                                                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                            />
                                            {!formik.errors.password && (
                                                <IconButton
                                                    className="position-absolute eye-btn"
                                                    aria-label="Toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <Icon icon={showPassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                                                </IconButton>
                                            )}
                                        </div>
                                        {formik.touched.password && formik.errors.password && (
                                            <div className="text-danger" style={{ fontSize: '12px' }}>
                                                {formik.errors.password}
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
                                                className={`form-control ${formik.touched.re_password && formik.errors.re_password ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.re_password}
                                            />
                                            {!formik.errors.re_password && (
                                                <IconButton
                                                    className="position-absolute eye-btn"
                                                    aria-label="Toggle password visibility"
                                                    onClick={() => setShowRePassword(!showRePassword)}
                                                >
                                                    <Icon icon={showRePassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                                                </IconButton>
                                            )}
                                        </div>
                                        {formik.touched.re_password && formik.errors.re_password && (
                                            <div className="text-danger" style={{ fontSize: '12px' }}>
                                                {formik.errors.re_password}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        className="form-check-input"
                                        {...formik.getFieldProps('agree')}
                                    />
                                    <label htmlFor="agree" className="form-check-label">
                                        Tôi đồng ý với tất cả <a href="" style={{ color: 'white', cursor: 'pointer' }}>Các điều khoản</a> và <a href="" style={{ color: 'white', cursor: 'pointer' }}>Chính sách bảo mật</a>
                                    </label>
                                    {formik.touched.agree && formik.errors.agree && (
                                        <div className="text-danger">{formik.errors.agree}</div>
                                    )}
                                </div>
                                {error && error !== '' && <div className="alert alert-danger error-msg text-center">{error}</div>}
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