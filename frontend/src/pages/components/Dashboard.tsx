// src/pages/dashboard.tsx

import withAuth from '@/components/Auth/WithAuth';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import '../../../public/styles/admin/pages/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Chào mừng, {user?.email}</h1>
      <button onClick={logout} className="">
        Đăng xuất
      </button>
      <div className="links">
        <Link href="/" className="link">
          Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
