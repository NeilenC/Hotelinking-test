import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import Layout from '../components/Layout';
import PromoCodesTable from '../components/promo-codes/PromoCodesTable';
import RedeemDialog from '../components/promo-codes/RedeemDialog';
import { PromoCode } from '../types/promoCode';
import { fetchPromoCodes, redeemPromoCode } from '../services/api';
import { formatDate } from '../utils/formatters';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export default function PromoCodes() {
  const router = useRouter();
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCode, setSelectedCode] = useState<PromoCode | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    const loadPromoCodes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/');
          return;
        }

        const codes = await fetchPromoCodes();
        setPromoCodes(codes);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los códigos promocionales');
      } finally {
        setLoading(false);
      }
    };

    loadPromoCodes();
  }, [router]);

  const handleRedeemCode = (promoCode: PromoCode) => {
    setSelectedCode(promoCode);
    setOpenDialog(true);
  };

  const handleCancelCode = () => {
    setSnackbar({
      open: true,
      message: 'Para cancelar tu reserva, por favor contacta con la agencia',
      severity: 'info'
    });
  };

  const confirmRedeem = async () => {
    if (!selectedCode) return;

    try {
      await redeemPromoCode(selectedCode.id);
      
      setPromoCodes(prevCodes =>
        prevCodes.map(code =>
          code.id === selectedCode.id ? { ...code, isUsed: true } : code
        )
      );

      setSnackbar({
        open: true,
        message: '¡Código canjeado exitosamente! Para cancelar, por favor contacta con la agencia.',
        severity: 'success',
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al canjear el código',
        severity: 'error',
      });
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Mis Códigos Promocionales
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        ) : (
          <PromoCodesTable
            promoCodes={promoCodes}
            onRedeemClick={handleRedeemCode}
            onCancelClick={handleCancelCode}
          />
        )}

        <RedeemDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={confirmRedeem}
          promoCode={selectedCode}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
} 