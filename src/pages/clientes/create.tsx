import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  createAndUpdate, Response } from "../../services/createAndUpdate";

import React, {useEffect, useState } from "react";
import api from "../../api/api";
import { useNotifications } from "@toolpad/core/useNotifications";



const CriarCliente: React.FC = () => {
  const {id} = useParams();
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    rg: "",
    email: "",
    telefone: "",
    endereco: "",
  });
  
  const notifications = useNotifications()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setCliente((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const getCliente = async () => {
    const response = await api.get(`clientes/${id}`)
    console.log(response)
    setCliente(response.data);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        let response : Response = {message: "", response: {}} ;
        response = await createAndUpdate("/clientes",  cliente) as Response;
        if(response.type === "error"){  
          notifications.show(response.message, {
            severity: 'error',
            autoHideDuration: 2000,
          });
        }
        notifications.show(response.message, {
          severity: 'success',
          autoHideDuration: 2000,
        });
  };

  useEffect(() => {
    getCliente()
  },[])

  return (
    <Box
      sx={{
        maxWidth: '100%',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Editar" : "Criar"} Cliente
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          label="Nome"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
        <TextField
          label="CPF"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
         <TextField
          label="Registro geral"
          name="rg"
          value={cliente.rg}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
         <TextField
          label="Telefone"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
          type="phone"
        />
         <TextField
          label="Endereço"
          name="endereco"
          value={cliente.endereco}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
        <TextField
          label="E-mail"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {id ? "Editar" : "Criar"} Cliente
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CriarCliente;
