import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Snackbar,
  Container,
  Grid,
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setShowSuccess(true);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      setTimeout(() => {
        router.replace('/offers');
      }, 1000);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          p: 4,
          maxWidth:450,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Grid container spacing={3}>
          {/* Título */}
          <Grid item xs={12}>
            <Typography 
              variant="h4" 
              align="center"
              sx={{ 
                mb: 1,
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              Iniciar sesión
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
                {/* Email */}
                <Grid item xs={12}>
                  <TextField
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>

                {/* Contraseña */}
                <Grid item xs={12}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    autoComplete="current-password"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>

                {/* Botón de inicio de sesión */}
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
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </Grid>

                {/* Enlace a registro */}
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      ¿No tienes una cuenta?{" "}
                      <Button
                        onClick={() => router.push("/register")}
                        sx={{ 
                          textTransform: 'none',
                          fontWeight: 'bold',
                          ml: 1
                        }}
                      >
                        Regístrate aquí
                      </Button>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          ¡Login exitoso! Redirigiendo...
        </Alert>
      </Snackbar>
    </Container>
  );
}
