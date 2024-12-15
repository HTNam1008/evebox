/* Package application */
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import useSWR from 'swr';
// import axios from 'axios';
import Dashboard from './components/Dashboard';
import React, { useContext } from 'react';
/* Package system */
import { AuthContext } from '../contexts/AuthContext';
import '../../public/styles/admin/pages/HomePage.css';

// const fetcher = (url: string) => axios.get(url).then(res => res.data);
const HomePage = () => {  
  return (
      <div className="container">
           <Dashboard />
      </div>
  );
};

export default HomePage;
