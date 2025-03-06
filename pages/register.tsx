import Register from '@/components/auth/Register';
import { Box } from '@mui/material';
import Head from 'next/head';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Registro - Hotelinking</title>
        <meta name="description" content="Registro de usuario en Hotelinking" />
      </Head>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>

      <Register />
      </Box>
    </>
  );
} 