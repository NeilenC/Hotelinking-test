import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import LoginForm from "@/components/auth/LoginForm";
import { Box } from "@mui/material";

export default function Home() {

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <LoginForm/>
    </Box>
  );
}
