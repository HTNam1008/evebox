import React from 'react';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import EventDetail from './components/EventDetail';
import VerifyOTP from './components/VerifyOTP';

const DynamicPage = ({ page }: { page: string }) => {
  if (page === '/') {
    return <Dashboard />;
  }
  if (page === 'register') {
    return <Register />;
  }
  if (page === 'login') {
    return <Login />;
  }
  if (page === 'forgot-password') {
    return <ForgotPassword />;
  }
  if (page === 'reset-password') {
    return <ResetPassword />;
  }
  if (page === 'event-detail') {
    return <EventDetail />;
  }
  if (page === 'verify-otp') {
    return <VerifyOTP />;
  }
  return <div>Trang không tồn tại</div>;
};

export async function getServerSideProps(context: any) {
  const { page } = context.params;
  return {
    props: { page }, // Truyền `page` vào props
  };
}

export default DynamicPage;