import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  Response } from "../../services/createAndUpdate";
import api from "../../api/api";


const CriarUsuario: React.FC = () => {
  const {id} = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });


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
      toast.error('Você não pode alterar um usuário!')
    }
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        maxWidth: 500,
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
        />
        <TextField
          label="E-mail"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
         <TextField
          label="Senha"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        
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
