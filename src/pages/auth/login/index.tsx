import { Button, Card, Divider, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotifications } from "@toolpad/core/useNotifications";
import { User } from "../../../interfaces/User";


export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const auth = useAuth();
    const notifications = useNotifications();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 
      const user: User = { email, password };
      await auth.login(user);
    };

    const user = {
      email:email,
      password: password
    }

    
    return (
        <Grid container sx={{ height: '100vh', width: '100%' }}>
          <Grid item xs={8} sx={{ backgroundColor: '#f5f5f5' }} ></Grid>
              
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: 400, padding: 3, backgroundColor: 'transparent' }} elevation={0}>
              <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Faça login</h1>
                <TextField
                  required
                  name="email"
                  placeholder="Digite seu e-mail"
                  label="E-mail"
                  onChange={(e: any) => setEmail(e.target.value)}
                  value={email}
                />
                <OutlinedInput
                  required
                  name="password"
                  placeholder="Digite sua senha"
                  onChange={(e: any) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Button type="submit" variant="contained">Login</Button>
                <Link to='/register'>Não tem uma conta? Registrar</Link>
              </form>
            </Card>
          </Grid>
        </Grid>
      );
}
