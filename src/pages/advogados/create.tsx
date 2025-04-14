import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  createAndUpdate, Response } from "../../services/createAndUpdate";

import React, {useEffect, useState } from "react";
import api from "../../api/api";
import { useNotifications } from "@toolpad/core/useNotifications";
import { validateForm } from "./validation";



const CriarAdvogado: React.FC = () => {
  const {id} = useParams();
  const [advogado, setAdvogado] = useState({
    nome: "",
    oab: "",
    estado_oab: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  
  const notifications = useNotifications();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setAdvogado((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const getAdvogado = async () => {
    const response = await api.get(`advogados/${id}`)
    console.log(response)
    setAdvogado(response.data);
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
    notifications.show('Advogado salvo com sucesso!', {
      severity: 'success',
      autoHideDuration: 3000,
    });
    navigate("/advogados");
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
  
    const errors = validateForm(advogado);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      notifications.show('Corrija os erros no formulário.', {
        severity: 'error',
        autoHideDuration: 3000,
      });
      return;
    }
  
    try {
      const response = await createAndUpdate("/advogados", advogado);
  
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
    getAdvogado()
  },[])

  return (
    <Box
      sx={{
        maxWidth: '100%',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Editar" : "Criar"} Advogado
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          label="Nome"
          name="nome"
          value={advogado.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!formErrors?.nome}
          helperText={formErrors?.nome}
        />
        <TextField
          label="OAB"
          name="oab"
          value={advogado.oab}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!formErrors?.oab}
          helperText={formErrors?.oab}
        />
        <TextField
          label="Estado OAB"
          name="estado_oab"
          value={advogado.estado_oab}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!formErrors?.estado_oab}
          helperText={formErrors?.estado_oab}
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {id ? "Editar" : "Criar"} Advogado
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CriarAdvogado;
