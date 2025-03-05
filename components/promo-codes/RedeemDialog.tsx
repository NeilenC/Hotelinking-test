import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { PromoCode } from '../../types/promoCode';

interface RedeemDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  promoCode: PromoCode | null;
}

export default function RedeemDialog({
  open,
  onClose,
  onConfirm,
  promoCode,
}: RedeemDialogProps) {
  if (!promoCode) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Confirmar canje de código promocional</DialogTitle>
      <DialogContent>
        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {promoCode.accommodation?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {promoCode.accommodation?.description}
            </Typography>
           
          </CardContent>
        </Card>
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Al canjear este código, se aplicará el descuento a tu reserva.   </Typography>
      </DialogContent>
      <DialogActions sx={{display:'flex',justifyContent:'space-between', paddingInline:2.5, pb:2}}>
        <Button onClick={onClose} variant="contained" color="warning">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirmar canje
        </Button>
      </DialogActions>
    </Dialog>
  );
} 