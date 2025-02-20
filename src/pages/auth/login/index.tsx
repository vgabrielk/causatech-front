import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";


export default function LoginPage() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const auth = useAuth();

    const login = async (e: any) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', {email: email, password: password});
            console.log(response)
            localStorage.setItem('token',response.data.token)
            toast.success('Logado com sucesso');
            
            setTimeout(() => {
                if(response.status == 200) {
                    return  navigate('/')
                }
            },1000)
            auth.isAuthenticated = true;

            return;
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Card sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <form onSubmit={login} style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: 'column', gap: '20px' }}>
        <img src="/logo.png" width="200px" style={{margin: '0 auto'}} />
        <TextField
            required
            name="email"
            placeholder="Digite seu e-mail"
            label="E-mail"
            onChange={(e : any) => setEmail(e.target.value)}
            value={email}
        />
        <TextField
            required
            name="password"
            placeholder="Digite sua senha"
            label="Senha"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
        />
        <Button type="submit" variant="contained">Login</Button>
    </form>
</Card>
  );
}
