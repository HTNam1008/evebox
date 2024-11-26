/* Package application */
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import Dashboard from './components/Dashboard';


/* Package system */
import { AuthContext } from '../contexts/AuthContext';
import '../../public/styles/admin/pages/HomePage.css';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const HomePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Ví dụ: Lấy số lượng người dùng từ API
  const { data, error } = useSWR('/api/users/count', fetcher);

  return (
    <div className="container">
      {!isAuthenticated ? (
        // <>
        //   <h1>Chào mừng trở lại, {user?.email}!</h1>
        //   <p>Khám phá dashboard của bạn.</p>
        //   <Link href="/dashboard" className="link">
        //     Vào Dashboard
        //   </Link>
        //   {data ? (
        //     <p>Số lượng người dùng hiện tại: {data.count}</p>
        //   ) : error ? (
        //     <p>Không thể lấy thông tin người dùng.</p>
        //   ) : (
        //     <p>Đang tải số lượng người dùng...</p>
        //   )}
        // </>
        <Dashboard />
      ) : (
        <>
          <h1>Chào mừng đến với EveBox!</h1>
          <p>Ứng dụng quản lý người dùng hiệu quả và bảo mật.</p>
          <div className="links">
            <Link href="/register" className="link">
              Đăng ký
            </Link>
            <Link href="/login" className="link">
              Đăng nhập
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
