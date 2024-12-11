/* Package application */
import React, { useContext } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import useSWR from 'swr';
// import axios from 'axios';
import Dashboard from './components/Dashboard';
/* Package system */
import { AuthContext } from '../contexts/AuthContext';
import '../../public/styles/admin/pages/HomePage.css';

// const fetcher = (url: string) => axios.get(url).then(res => res.data);
const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Ví dụ: Lấy số lượng người dùng từ API
  // const { data, error } = useSWR('/api/users/count', fetcher);

  return (
    <div className="container">
      {!isAuthenticated ? (
        <div className="container">
        <Dashboard />
        </div>
      ) : (
        <>
        <div className="container">
           <Dashboard />
        </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
