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
import api from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotifications } from "@toolpad/core/useNotifications";
import { validateRegister } from "./validation";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const notifications = useNotifications();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(); 
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});


  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', { name, email, password });

      notifications.show("Registrado com sucesso!", {
        severity: 'success',
        autoHideDuration: 2000,
      });

      setTimeout(() => {
        if (response.status === 201) {
          navigate('/login');
        }
      }, 1000);
    } catch (error) {
      const errors = (error as any)?.response?.data?.errors;
      if (errors) {
        setFormErrors(errors);
      }
    }
  };

  return (
    <Grid container sx={{ height: '100vh', backgroundColor: '#f5f7f9' }}>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Card sx={{ width: 360, p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Box component="form" onSubmit={register} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              
              name="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              error={!!formErrors?.name}
              helperText={formErrors?.name}


            />
            <TextField
              
              name="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!formErrors?.email}
              helperText={formErrors?.email}


              fullWidth
            />
            <TextField
              name="password"
              placeholder="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors?.password}
              helperText={formErrors?.password}
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
              fullWidth
              sx={{ backgroundColor: '#009fe3', textTransform: 'none' }}
            >
              REGISTRAR
            </Button>

            <Typography variant="body2" textAlign="center">
              Já possui uma conta?{" "}
              <Link to="/login" style={{ textDecoration: 'none', color: '#009fe3' }}>
                Fazer login
              </Link>
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
