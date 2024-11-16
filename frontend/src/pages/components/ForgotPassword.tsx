import React from "react";
import { useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errorResponse';
import '../../../public/styles/admin/pages/ForgotPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Yêu cầu nhập email'),
    }),
    onSubmit: async (values) => {
      try {
        alert('Email đã được gửi, vui lòng kiểm tra hộp thư của bạn!');
        router.push('/Login'); // Chuyển hướng về trang đăng nhập
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Lỗi xảy ra, vui lòng thử lại');
        } else {
          setError('Lỗi xảy ra, vui lòng thử lại');
        }
      }
    },
  });

  return (
    <div className="row">
      <div className="col-md-7 d-flex align-items-center justify-content-center right-pane">
        <div className="w-75">
          <div className="form">
            <div className="container">
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button
                style={{ marginTop: '50px' }}
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={!formik.isValid || !formik.dirty} // Disable button nếu email không hợp lệ hoặc chưa thay đổi
              >
                Tiếp tục
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-5 backdground">
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
