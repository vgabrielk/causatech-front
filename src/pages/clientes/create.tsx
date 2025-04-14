import { Box, Button, TextField, Typography } from "@mui/material";
import {useNavigate, useParams } from "react-router-dom";

import React, {useEffect, useState } from "react";
import api from "../../api/api";
import {  createAndUpdate, Response } from "../../services/createAndUpdate";
import { useNotifications } from "@toolpad/core/useNotifications";
import { validateForm } from "./validation";



const CriarCliente: React.FC = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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

  const clearFormErrors = () => {
    setFormErrors({});
  };
  
  const isValidationError = (response: any) => {
    return response && response.type === "error" && response.response?.errors;
  };
  
  const isSuccessResponse = (response: any) => {
    return response && response.type === "success";
  };
  
  const handleValidationError = (response: any) => {
    setFormErrors(response.response.errors);
    notifications.show('Erros de validação no formulário', {
      severity: 'error',
      autoHideDuration: 3000,
    });
  };
  
  const handleSuccess = () => {
    notifications.show('Cliente salvo com sucesso!', {
      severity: 'success',
      autoHideDuration: 3000,
    });
    navigate("/clientes");
  };
  
  const handleUnexpectedError = (error: any) => {
    console.error(error);
    notifications.show('Erro inesperado.', {
      severity: 'error',
      autoHideDuration: 3000,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearFormErrors();
  
    const errors = validateForm(cliente);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      notifications.show('Corrija os erros no formulário.', {
        severity: 'error',
        autoHideDuration: 3000,
      });
      return;
    }
  
    try {
      const response = await createAndUpdate("/clientes", cliente);
  
      if (isValidationError(response)) {
        handleValidationError(response);
        return;
      }
  
      if (isSuccessResponse(response)) {
        handleSuccess();
      }
  
    } catch (error) {
      handleUnexpectedError(error);
    }
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
          variant="outlined"
          error={!!formErrors?.nome}
          helperText={formErrors?.nome}
        />
        <TextField
          label="CPF"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!formErrors?.cpf}
          helperText={formErrors?.cpf}
          type="text"
          slotProps={{
            htmlInput:
            {
              maxLength: 11,
            }
          }}        />
         <TextField
          label="Registro geral"
          name="rg"
          value={cliente.rg}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!formErrors?.rg}
          helperText={formErrors?.rg}
        />
         <TextField
          label="Telefone"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          type="phone"
          error={!!formErrors?.telefone}
          helperText={formErrors?.telefone}
        />
         <TextField
          label="Endereço"
          name="endereco"
          value={cliente.endereco}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!formErrors?.endereco}
          helperText={formErrors?.endereco}
        />
        <TextField
          label="E-mail"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!formErrors?.email}
          helperText={formErrors?.email}
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
