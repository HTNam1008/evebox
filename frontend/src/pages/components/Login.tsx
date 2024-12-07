import { useState, useContext, useEffect } from 'react';
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
import { CircularProgress } from '@mui/material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext); // Sử dụng login từ AuthContext

  // Hàm xử lý khi click vào nút Đăng nhập với Google
  // const handleGoogleLogin = async () => {
  //   try {
  //     // Điều hướng người dùng đến Google OAuth
  //     setIsLoading(true);
  //     window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/user/google`;
  //   } catch (err) {
  //     setError("Đã xảy ra lỗi khi đăng nhập với Google.");
  //     console.error("Error during Google login:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleGoogleLogin = () => {
    try {
      setIsLoading(true);
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
  
      const popup = window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/google`,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );
  
      window.addEventListener('message', (event) => {
        if (event.origin === process.env.NEXT_PUBLIC_API_URL) {
          const { type, data, error } = event.data;
  
          if (type === 'GOOGLE_LOGIN_SUCCESS') {
            const { access_token, refresh_token } = data;
            login(access_token);
            router.push('/');
            popup?.close();
          } else if (type === 'GOOGLE_LOGIN_ERROR') {
            setError(error || 'Login failed');
            popup?.close();
          }
        }
      });
  
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập với Google.");
    } finally {
      setIsLoading(false);
    }
  };


  // Xử lý callback từ Google khi người dùng đã đăng nhập thành công
  useEffect(() => {
    console.log("router.query: ", router.query); // Kiểm tra router.query
    //const { code } = router.query;
    const queryString = router.asPath.split("?")[1];
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
  
    if (code) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/google/callback`, {
          params: { code },
          withCredentials: true, // Đảm bảo gửi cookie nếu cần thiết
        })
        .then((response) => {
          console.log("Full response:", response);
          const { access_token, refresh_token } = response.data.data;
          console.log("Access token: ", access_token);
          console.log("Refresh token: ", refresh_token);
  
          if (access_token) {
            login(access_token);
            localStorage.setItem("refresh_token", refresh_token);
            console.log("Redirecting to home...");
            router.push("/"); // Chuyển hướng về trang chính
          } else {
            setError("Không nhận được access token từ Google.");
          }
        })
        .catch((err) => {
          console.error("Error during Google login callback:", err);
          setError('Đăng nhập Google thất bại');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  // }, [router.query, login]);  
  }, [router.asPath]);  

  // useEffect(() => {
  //   const currentUrl = window.location.href; // Lấy toàn bộ URL hiện tại
  //   console.log("Current URL:", currentUrl);
  
  //   const urlParams = new URLSearchParams(currentUrl.split("?")[1]); // Lấy các tham số sau dấu ?
  //   const code = urlParams.get("code");
  //   console.log("Google OAuth code:", code);
  
  //   if (code) {
  //     axios
  //       .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/google/callback`, {
  //         params: { code },
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         console.log("Full response:", response);
  //         const { access_token, refresh_token } = response.data.data;
  
  //         if (access_token) {
  //           login(access_token);
  //           localStorage.setItem("refresh_token", refresh_token);
  //           router.push("/"); // Chuyển hướng về trang chính
  //         } else {
  //           setError("Không nhận được access token từ Google.");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error during Google login callback:", err);
  //         setError("Đăng nhập Google thất bại");
  //       });
  //   }
  // }, []);  

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
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, values);
        const { access_token, refresh_token } = response.data.data;

        if (access_token) {
          login(access_token);
          router.push('/'); // Chuyển hướng về trang chính
        } else {
          throw new Error("Access token not found in response.");
        }
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
              <div className="login-container d-flex flex-column align-items-center">
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
                      style={{ height: '46px', paddingRight: '50px' }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {!formik.errors.password && (
                    <IconButton
                      className='position-absolute eye-btn'
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? "ph:eye-light" : "ph:eye-closed-light"} width="20px" color="#aaaaaa" />
                    </IconButton>
                    )}
                  </div>
                  {/* Hiển thị thông báo lỗi  */}
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger" style={{ fontSize: '12px' }}>
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 short-input">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="agree"
                      className="form-check-input me-2"
                      {...formik.getFieldProps('agree')}
                    />
                    <label htmlFor="agree" className="form-check-label m-0">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <a href="/forgot-password" className="text-decoration-none font-forget">
                    Quên mật khẩu?
                  </a>
                </div>

                <div className="short-input">
                  <button type="submit" className="btn btn-login w-100" style={{ marginBottom: '20px', marginTop: '10px' }} >
                    Đăng nhập
                  </button>
                </div>
                <div className="text-center short-input">
                  <span style={{ color: 'white' }}>Bạn chưa có tài khoản? </span>
                  <Link href="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                    Đăng ký ngay
                  </Link>
                  <p style={{ color: 'white', marginBottom: '20px', marginTop: '5px' }}>Hoặc</p>
                  <Link style={{ textDecoration: 'none' }} href="#">
                    <button className="google-button" style={{ marginBottom: '20px' }} onClick={handleGoogleLogin} disabled={isLoading}>
                      <Icon icon="flat-color-icons:google" width="20px" color="#fff" />
                      {/* Đăng nhập với Google */}
                      {isLoading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Đăng nhập với Google"
                      )}
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