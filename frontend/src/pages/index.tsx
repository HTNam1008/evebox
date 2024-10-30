// src/pages/index.tsx

import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import useSWR from 'swr';
import axios from 'axios';
import styles from '@/styles/HomePage.module.css';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const HomePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Ví dụ: Lấy số lượng người dùng từ API
  const { data, error } = useSWR('/api/users/count', fetcher);

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <>
          <h1>Chào mừng trở lại, {user?.email}!</h1>
          <p>Khám phá dashboard của bạn.</p>
          <Link href="/dashboard" className={styles.link}>
            Vào Dashboard
          </Link>
          {data ? (
            <p>Số lượng người dùng hiện tại: {data.count}</p>
          ) : error ? (
            <p>Không thể lấy thông tin người dùng.</p>
          ) : (
            <p>Đang tải số lượng người dùng...</p>
          )}
        </>
      ) : (
        <>
          <h1>Chào mừng đến với EveBox!</h1>
          <p>Ứng dụng quản lý người dùng hiệu quả và bảo mật.</p>
          <div className={styles.links}>
            <Link href="/register" className={styles.link}>
              Đăng ký
            </Link>
            <Link href="/login" className={styles.link}>
              Đăng nhập
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;