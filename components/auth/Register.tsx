import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/offers');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ 
      height: '100vh', 
          maxWidth:450,
          display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Grid container spacing={3}>
          {/* Título */}
          <Grid item xs={12}>
            <Typography 
              component="h1" 
              variant="h4" 
              align="center"
              sx={{ 
                mb: 1,
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              Registro
            </Typography>
          </Grid>

          {/* Mensaje de error */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">
                {error}
              </Alert>
            </Grid>
          )}

          {/* Formulario */}
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Nombre completo */}
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    autoFocus
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>

                {/* Contraseña */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>

                {/* Confirmar Contraseña */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ 
                      mt: 2,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem'
                    }}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                  >
                    {loading ? "Registrando..." : "Crear cuenta"}
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      ¿Ya tienes una cuenta?{" "}
                      <Button
                        onClick={() => router.push("/")}
                        sx={{ 
                          textTransform: 'none',
                          fontWeight: 'bold',
                          ml: 1
                        }}
                      >
                        Inicia sesión
                      </Button>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register; 