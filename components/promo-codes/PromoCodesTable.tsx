import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import { PromoCode } from '../../types/promoCode';

interface PromoCodesTableProps {
  promoCodes: PromoCode[];
  onRedeemClick: (promoCode: PromoCode) => void;
  onCancelClick: () => void;
}

export default function PromoCodesTable({
  promoCodes,
  onRedeemClick,
  onCancelClick,
}: PromoCodesTableProps) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        boxShadow: 2,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 'bold', width: '22%' }}>Código</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>Hospedaje</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '22%' }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promoCodes.length > 0 ? (
            promoCodes.map((promoCode) => (
              <TableRow 
                key={promoCode.id}
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'grey.50',
                    transition: 'background-color 0.2s ease'
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalOfferIcon color="primary" sx={{ fontSize: 20 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace', 
                        fontWeight: 'bold',
                        bgcolor: 'grey.100',
                        p: 0.5,
                        borderRadius: 1,
                        color: 'primary.main'
                      }}
                    >
                      {promoCode.code}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {promoCode.accommodation?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {promoCode.accommodation?.location}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={promoCode.isUsed ? 'Canjeado' : 'Disponible'}
                    color={promoCode.isUsed ? 'default' : 'success'}
                    size="small"
                    sx={{ 
                      fontWeight: 'medium',
                      minWidth: 90,
                      '& .MuiChip-label': {
                        px: 2
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  {promoCode.isUsed ? (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={onCancelClick}
                      sx={{
                        minWidth: 100,
                        '&:hover': {
                          bgcolor: 'error.light'
                        }
                      }}
                    >
                      Cancelar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onRedeemClick(promoCode)}
                      disabled={new Date(promoCode.expiresAt) < new Date()}
                      sx={{
                        minWidth: 100,
                        '&.Mui-disabled': {
                          bgcolor: 'grey.300'
                        }
                      }}
                    >
                      Canjear
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell 
                colSpan={4} 
                align="center" 
                sx={{ 
                  py: 6,
                  bgcolor: 'grey.50'
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: 1
                }}>
                  <LocalOfferIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    No tienes códigos promocionales aún
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Los códigos que generes aparecerán aquí
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 