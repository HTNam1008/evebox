// src/pages/dashboard.tsx

import withAuth from '@/components/Auth/WithAuth';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h1>Chào mừng, {user?.email}</h1>
      <button onClick={logout} className={styles.button}>
        Đăng xuất
      </button>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
