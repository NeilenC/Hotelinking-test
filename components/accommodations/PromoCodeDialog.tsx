import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
} from '@mui/material';
import { LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import { Accommodation } from '@/types/accommodation';

interface PromoCodeDialogProps {
  open: boolean;
  onClose: () => void;
  accommodation: Accommodation | null;
  promoCode: string;
}

export default function PromoCodeDialog({
  open,
  onClose,
  accommodation,
  promoCode,
}: PromoCodeDialogProps) {
  if (!accommodation) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          textAlign: 'center', 
          pb: 0,
          fontSize: '1.5rem',
          fontWeight: 600
        }}
      >
        ¡Felicidades! 🎉
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" gutterBottom>
            Has obtenido un código promocional para
          </Typography>
          <Typography 
            variant="h5" 
            color="primary" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              mb: 3
            }}
          >
            {accommodation.name}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Chip
              icon={<LocalOfferIcon />}
              label={`${accommodation.discount}% OFF`}
              color="error"
              sx={{ fontWeight: 500 }}
            />
          </Box>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              bgcolor: 'primary.main',
              display: 'inline-block',
              minWidth: '250px',
              borderRadius: 2,
              transition: 'transform 0.2s ease-in-out',
             
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                letterSpacing: 2,
                fontWeight: 600,
                fontFamily: 'monospace'
              }}
            >
              {promoCode}
            </Typography>
          </Paper>

          <Typography 
            variant="body2" 
            sx={{ 
              mt: 3, 
              color: 'text.secondary',
              fontStyle: 'italic'
            }}
          >
            Este código es válido por 7 días. ¡No lo pierdas!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button 
          onClick={onClose}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 2,
            px: 4,
            fontWeight: 500
          }}
        >
          ¡Entendido!
        </Button>
      </DialogActions>
    </Dialog>
  );
} 