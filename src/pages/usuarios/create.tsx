import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  Response } from "../../services/createAndUpdate";

import React, {useEffect, useState } from "react";
import api from "../../api/api";



const CriarUsuario: React.FC = () => {
  const {id} = useParams();
  const [role, setRole] = useState<string>('');
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  
  const roles = [
  {
    value: 'admin',
    label: 'Administrador'
  },
  {
    value: 'manager',
    label: 'Gerenciador'
  },
  {
    value: 'user',
    label: 'Usuário'
  },
  ]


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };


  const getUser = async () => {
    if(id){
      const response = await api.get(`/user`)
      console.log(response)
      setUser(response.data);
    }
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user.role = role;
      try {
        const response = await api.post("/register",  user) as Response;
        return console.log(response);
      } catch (error) {
        console.log(error);
      }
      
  };

  useEffect(() => {
    getUser()
  },[])

  return (
    <Box
      sx={{
        maxWidth: '100%',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Editar" : "Criar"} Usuário
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          label="Nome"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
        <TextField
          label="E-mail"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
         <TextField
          label="Senha"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Select fullWidth sx={{marginTop: 2}} label="Selecione o tipo do usuário"
        onChange={(e: SelectChangeEvent) => setRole(e.target.value)}
        >
        {roles?.map((role: any) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </Select>        
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {id ? "Editar" : "Criar"} Usuário
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CriarUsuario;
