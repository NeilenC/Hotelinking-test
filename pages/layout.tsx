import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import Layout from '../components/Layout';
import AccommodationFilters, { Filters } from '../components/accommodations/AccommodationFilters';
import AccommodationCard from '../components/accommodations/AccommodationCard';
import PromoCodeDialog from '../components/accommodations/PromoCodeDialog';
import { Accommodation } from '../types/accommodation';
import { 
  fetchAccommodations, 
  generatePromoCode, 
  createTestData,
  fetchAccommodationsWithPromoCodes,
} from '../services/api';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export default function Home() {
return(
  <>hola</>
)
} 