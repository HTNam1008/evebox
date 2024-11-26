import React from 'react';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
const DynamicPage = ({ page }: { page: string }) => {
  if (page === 'dashboard') {
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
  return <div>Trang không tồn tại</div>;
};

export async function getServerSideProps(context: any) {
  const { page } = context.params;
  return {
    props: { page }, // Truyền `page` vào props
  };
}

export default DynamicPage;