import {
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { LocalOffer as LocalOfferIcon, Info as InfoIcon } from '@mui/icons-material';
import { Accommodation } from '../../types/accommodation';
import { useState, useEffect } from 'react';

interface PromoCodeButtonProps {
  accommodation: Accommodation;
  onGeneratePromoCode: (accommodation: Accommodation) => void;
  loading: boolean;
  hasExistingCode?: boolean;
}

export default function PromoCodeButton({
  accommodation,
  onGeneratePromoCode,
  loading,
  hasExistingCode = false,
}: PromoCodeButtonProps) {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (hasExistingCode) {
      setOpenDialog(true);
    }
  }, [hasExistingCode]);

  const handleGenerateCode = () => {
    if (hasExistingCode) {
      setOpenDialog(true);
      return;
    }
    onGeneratePromoCode(accommodation);
  };

  return (
    <Box sx={{width:'100%'}} >
      <Button
        variant="contained"
        color={hasExistingCode ? "warning" : "primary"}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LocalOfferIcon />}
        onClick={handleGenerateCode}
        disabled={loading}
        fullWidth
        sx={{
          height: 40,
          position: 'relative',
        }}
      >
        {loading ? 'Generando...' : hasExistingCode ? 'Código Existente' : 'Generar código promocional'}
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            overflow: 'visible',
            borderTop: '4px solid',
            borderColor: 'error.main'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          bgcolor: 'error.light',
          color: 'error.dark',
          py: 2
        }}>
          <InfoIcon /> Ya existe un código para este hospedaje
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom color="error">
            {accommodation.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Ya tienes un código promocional activo para este hospedaje.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Por políticas del sistema, solo se permite tener un código promocional por hospedaje. 
          </Typography>
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: 'grey.50', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.200'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              💡 Puedes encontrar tu código existente en la sección "Mis Códigos Promocionales"
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            variant="contained"
            color="primary"
            fullWidth
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 