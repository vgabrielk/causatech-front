import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createAndUpdate, Response } from "../../services/createAndUpdate";
import api from "../../api/api";


const CriarCategoria: React.FC = () => {
  const {id} = useParams();

  const [category, setCategory] = useState({
    name: "",
    value: 0,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };


  const getCategoria = async () => {
    const response = await api.get(`categories/${id}`)
    console.log(response)
    setCategory(response.data);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        let response : Response = {message: "", response: {}} ;
        response = await createAndUpdate("/categories",  category) as Response;
        if(response.type === "error"){  
          return toast.error(response?.message)
        }
        return toast.success(response?.message)
  };

  useEffect(() => {
    getCategoria()
  },[])

  return (
    <Box
      sx={{
        maxWidth: 500,
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Editar" : "Criar"} Categoria
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={category.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Criar Categoria
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CriarCategoria;
