import { Button, Card, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function RegisterPage() {

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const register = async (e: any) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', {name: name, email: email, password: password});
            console.log(response)
            toast.success('Registrado com sucesso');
            
            setTimeout(() => {
                if(response.status == 201) {
                    return  navigate('/login')
                }
            },1000)
            return;
        } catch (error) {
            console.log(error);
            
            if (error instanceof Error) {
              const errors = (error as any)?.response?.data?.errors;
          
              if (errors) {
                Object.keys(errors).forEach((field) => {
                  toast.error(`${errors[field]}`);
                });
              } else {
                const errorMessage =
                  (error as any)?.response?.data?.error ||
                  error.message ||
                  "Erro inesperado";
                toast.error(errorMessage);
              }
            } else {
              toast.error("Erro inesperado");
            }
          }
    }

    
    return (
        <Grid container sx={{ height: '100vh', width: '100%' }}>
          <Grid item xs={8} sx={{ backgroundColor: '#f5f5f5' }} ></Grid>
              
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: 400, padding: 3, backgroundColor: 'transparent' }} elevation={0}>
              <form onSubmit={register} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <h1 style={{ textAlign: 'center' }}>Criar sua conta</h1>
                <TextField
                  required
                  name="name"
                  placeholder="Digite seu nome"
                  label="Nome"
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                />
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
                <Button type="submit" variant="contained">Registrar</Button>
                <Link to='/login'>Fazer login</Link>

              </form>
            </Card>
          </Grid>
        </Grid>
      );
}