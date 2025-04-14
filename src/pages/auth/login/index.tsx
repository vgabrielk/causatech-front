import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import { useNotifications } from '@toolpad/core/useNotifications';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const notifications = useNotifications();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    
    auth.clearFormErrors();

    await auth.login({ email, password });  
  };
  return (
    <Grid container sx={{ height: '100vh', backgroundColor: '#f5f7f9' }}>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Card sx={{ width: 360, p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  mx: 'auto',
                  backgroundColor: '#009fe3',
                  borderRadius: 1
                }}
              />
              <Typography variant="h5" fontWeight={500} mt={1}>causatech</Typography>
            </Box>

            <TextField
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              error={!!auth.formErrors?.email}
              helperText={auth.formErrors?.email}
            />
            <TextField
              name="password"
              placeholder="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              error={!!auth.formErrors?.password}
              helperText={auth.formErrors?.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }} 
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#009fe3', textTransform: 'none' }}
              fullWidth
            >
              ENTRAR
            </Button>

            <Typography variant="body2" textAlign="center">
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#009fe3' }}>
                ESQUECEU SUA SENHA?
              </Link>
            </Typography>

            <Typography variant="caption" color="textSecondary" textAlign="center" mt={2}>
              Ao entrar você concorda com os <Link to="/terms">Termos de Uso</Link> e a<br />
              <Link to="/privacy">Política de Privacidade</Link>.
              <Link to="/register" style={{ textDecoration: 'none', color: '#009fe3' }}>
                <Typography variant="body2" textAlign="center" mt={1}>
                  Não tem uma conta? Cadastre-se
                  </Typography>
                  </Link>
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
