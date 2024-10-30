// src/components/Auth/withAuth.tsx

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: P) => {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default withAuth;
