import React, {useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography, Select } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Product } from "../../interfaces/Products";
import { createAndUpdate, Response } from "../../services/createAndUpdate";
import api from "../../api/api";

const CriarProduto: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>({
    name: "",
    value: 0,
    companyId: "",
    categoryId: "",
  });

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);

  const getEmpresas = async () => {
    const response = await api.get("companies");
    setCompanies(response.data);
  };

  const getCategorias = async () => {
    const response = await api.get("categories");
    setCategories(response.data);
  };

  const getProduto = async () => {
    const response = await api.get(`products/${id}`);
    console.log(response);
    setProduct(response.data);
    setProduct({
      companyId: response.data.company.id,
      categoryId: response.data.category.id,
      name: response.data.name,
      value: response.data.value,
    });
  };

  const handleChange = (e: any ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response: Response = { message: "", response: {} };
    response = (await createAndUpdate("/products", product)) as Response;
    if (response.type === "error") {
      return toast.error(response?.message);
    }
    return toast.success(response?.message);
  };

  useEffect(() => {
    getEmpresas();
    getCategorias();
  }, []);
  
  useEffect(() => {
    if (id) {
      getProduto();
    }
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 500,
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? <span>Editar Produto</span> : <span>Criar Produto</span>}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Valor"
          name="value"
          type="number"
          value={product.value}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Select
          sx={{ width: "100%", mt: 2 }}
          name="companyId"
          value={product.companyId}
          onChange={handleChange}
          label="Empresa"
        >
          {companies?.map((company: any) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          sx={{ width: "100%", mt: 2 }}
          name="categoryId"
          label="Categoria"
          value={product.categoryId}
          onChange={(e) => handleChange(e)}
        >
          {categories?.map((category: any) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {id ? "Atualizar Produto" : "Criar Produto"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CriarProduto;
