import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  LocalOffer as LocalOfferIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

interface NavbarProps {
  userName?: string;
}

export default function Navbar({ userName }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push('/offers')}
          >
            Hotelinking
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, ml: 4 }}>
 
          
          </Box>
          <Box sx={{pr:5}}>

          <Button
              color="inherit"
              startIcon={<LocalOfferIcon />}
              onClick={() => router.push('/promo-codes')}
              sx={{
                backgroundColor: isActive('/promo-codes') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
              >
              Mis Códigos
            </Button>
              </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {userName && (
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                {userName}
              </Typography>
            )}
            <Tooltip title="Cerrar sesión">
              <IconButton color="inherit" onClick={handleLogout} size="large">
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Espaciador para el contenido debajo del AppBar */}
    </>
  );
} 