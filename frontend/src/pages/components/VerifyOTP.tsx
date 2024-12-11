/* Package Application */
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errorResponse';
import Link from 'next/link';

/* Package System */
import { Button, IconButton, DialogTitle, Dialog, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../public/styles/admin/pages/VerifyOTP.css'

const TIMELEFT = 60;
const ATTEMPS = 5;

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResendAllowed, setIsResendAllowed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [cntAttempts, setCntAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [requestToken, setRequestToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const formatTime = (time: number) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const verifyData = JSON.parse(localStorage.getItem('verifyData') || '{}');
    if (!verifyData) {
      router.push('/register');
      return;
    }

    setEmail(verifyData.email);
    setTimeLeft(verifyData.resend_allowed_in ?? TIMELEFT);
    setAttempts(verifyData.remaining_attempts ?? ATTEMPS);
    setRequestToken(verifyData.request_token);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendAllowed(true);
    } else {
      setIsResendAllowed(false);
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

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
      setIsLoading(true);
      try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/otps/verify-otp`, {
          email: email,
          otp: values.otp,
          request_token: requestToken,
          type: 'REGISTER'
        });
        if (result.status === 200 || result.status === 201) {
          setIsLoading(false);
          setIsOpen(true);
          setIsVerified(true);
          setError('');
        }
        else {
          setIsLoading(false);
          setIsOpen(true);
          setIsVerified(false);
          setError(`Xác thực thất bại: ${result.data.message}`);
        }
      } catch (err) {
        setIsLoading(false);
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          setError(error.response?.data?.message || 'Xác thực thất bại');
        } else {
          setError('Xác thực thất bại');
        }
      }
    },
  });

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        e.preventDefault();
        newOtp[index - 1] = '';
        setOtp(newOtp);
  
        const prevInput = (e.target as HTMLInputElement).previousSibling as HTMLInputElement | null;
        if (prevInput) prevInput.focus();
      }
    }
  }  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newOtp = [...otp];
  
    if (isNaN(Number(e.target.value))) return;
  
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    otpFormik.setFieldValue('otp', newOtp.join(''));
  
    if (e.target.value && (e.target as HTMLInputElement).nextSibling) {
      ((e.target as HTMLInputElement).nextSibling as HTMLInputElement).focus();
    }
  }    

  const handleResendOtp = async () => {
    setError('');
    // setTimeLeft(TIMELEFT);
    setCntAttempts(cntAttempts + 1);

    if (cntAttempts >= attempts) {
      setIsResendAllowed(false);
      return;
    }

    const verifyData = JSON.parse(localStorage.getItem('verifyData') || '{}');
    const values = {
      name: verifyData.name,
      phone: verifyData.phone,
      email: verifyData.email,
      password: verifyData.password,
      re_password: verifyData.re_password,
      agree: verifyData.agree,
      role_id: verifyData.role_id,
      province_id: verifyData.province_id,
    }

    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, values);
    if (result.status === 200 || result.status === 201) {
      setTimeLeft(result.data.data.resend_allowed_in ?? TIMELEFT);
      setAttempts(result.data.data.remaining_attempts ?? ATTEMPS);
      setError('');
    }
    else {
      setError(`Gửi mã OTP thất bại: ${result.data.message}`);
      alert(result.data.message);
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    router.push('/login');
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
            <div className='verify-form'>
              <div className="verify-container d-flex flex-column align-items-center">
                <img src="../../../images/logo.png" alt="EveBox Logo" className="mb-3 img-fluid logo" />
                <h3><strong>Xác thực OTP</strong></h3>
                <br></br>
                <h4><strong>Nhập mã OTP gồm 6 chữ số</strong></h4>
                <span className='verify-msg-1'>Chúng tôi đã gửi mã OTP đến email:</span>
                <span className='verify-msg-2'>{email !== '' ? email : ''}</span>
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
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onChange={(e) => handleChange(e, index)}
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
                {error && error !== '' && <div className="alert alert-danger error-msg text-center">{error}</div>}
                <div className="text-center">
                  <span style={{ fontSize: '12px', color: 'white' }}>Lưu ý: Bạn vui lòng kiểm tra tất cả các thư mục của email<br></br>(Hộp thư đến, Quảng cáo, Thư rác,...)</span>
                  <br></br>
                  <p style={{ color: 'white' }}>Bạn không nhận được mã OTP? <strong onClick={handleResendOtp} className={`resend-btn ${isResendAllowed ? '' : 'disabled'}`}>Gửi lại mã</strong></p>
                </div>
                <div className="otp-timer d-flex align-items-center justify-content-center">
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <button type="submit" className="btn w-100 mb-3">
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Xác minh OTP'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isOpen} className="custom-dialog">
        <DialogTitle>
          <div className="dialog-title">
            {isVerified ? 'Đăng ký thành công' : 'Đăng ký thất bại'}
            <IconButton
              className="close-button"
              onClick={handleCloseDialog}
              aria-label="Close"
            >
              <Icon icon="ph:x" width="24px" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="dialog-content">
            <Icon icon={isVerified ? 'ph:check-circle-fill' : 'fluent-color:error-circle-24'} width="48px" color="#22C55E" />
            <h3>{isVerified ? 'Thành công' : 'Thất bại'}</h3>
            <br />
            <p className="subtext">Kích hoạt tài khoản {isVerified ? 'thành công' : 'thất bại'}!</p>
          </div>
        </DialogContent>
        <DialogActions style={{ marginBottom: '30px' }} className='d-flex flex-column justify-content-center'>
          <Button
            onClick={handleCloseDialog}
            className="action-button"
          >
            Về trang Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyOTP;