import React, { useState } from 'react';
import { Card, CardContent, Avatar, Button, TextField, Typography, Box, useTheme, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function LoginCard({ onLogin }) {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const co = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
    return co.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    setEmailError('');

    /**if (!validatePassword(password)) {
      setPasswordError('Por favor ingresa una contraseña que tenga los siguientes atributos: Al menos 8 caracteres de longitud. Al menos una letra mayúscula. Al menos una letra minúscula. Al menos un número. Al menos un carácter especial (como @, #, $, %, etc.).');
      return;
    }
    setPasswordError('');*/

    onLogin(email, password);
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2, bgcolor: theme.palette.background.paper }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailError}
              error={!!emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordError}
              error={!!passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography variant="body2">
                {"¿Aún no tienes una cuenta? "}
                <Link href="#" variant="body2" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LoginCard;
