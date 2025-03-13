import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  createAndUpdate, Response } from "../../services/createAndUpdate";

import React, {useEffect, useState } from "react";
import api from "../../api/api";



const CriarAdvogado: React.FC = () => {
  const {id} = useParams();
  const [advogado, setAdvogado] = useState({
    nome: "",
    oab: "",
    estado_oab: "",
  });
  


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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        let response : Response = {message: "", response: {}} ;
        response = await createAndUpdate("/advogados",  advogado) as Response;
        if(response.type === "error"){  
          return toast.error(response?.message)
        }
        return toast.success(response?.message)
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
          required
          variant="outlined"
        />
        <TextField
          label="OAB"
          name="oab"
          value={advogado.oab}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
        />
        <TextField
          label="Estado OAB"
          name="estado_oab"
          value={advogado.estado_oab}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          variant="outlined"
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
