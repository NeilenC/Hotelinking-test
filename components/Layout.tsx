import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import { Box } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/register') {
      return;
    }

    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name || '');
    } else {
      router.push('/');
    }
  }, [router.pathname]);

  if (router.pathname === '/' || router.pathname === '/register') {
    return <>{children}</>;
  }

  return (
    <Box>
      <Navbar userName={userName} />
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
} 