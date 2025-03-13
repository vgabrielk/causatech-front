import { Add, Delete } from "@mui/icons-material";
import {
    Button,
    Divider,
    Grid,
    TextField,
  } from "@mui/material";
import { ChangeEvent } from "react";

export default function TabIndexQuaternary({tabIndex, contract, setContract}) {
    const handleSignatureChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = event.target;
        setContract((prevContract) => ({
          ...prevContract,
          details: {
            ...prevContract.details,
            assinatura: {
              ...prevContract.details.assinatura,
              [name as keyof typeof prevContract.details.assinatura]: value,
            },
          },
        }));
      };
    
      const handleClausulaChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
        const { name, value } = e.target;
    
        const updatedClausulas = [...contract.details.clausulas];
    
        updatedClausulas[index] = {
          ...updatedClausulas[index],
          [name]: value,
        };
    
        setContract({
          ...contract,
          details: {
            ...contract.details,
            clausulas: updatedClausulas,
          },
        });
      };
    
      const addClausula = () => {
        setContract({
          ...contract,
          details: {
            ...contract.details,
            clausulas: [
              ...(contract.details.clausulas || []),
              { nome: "", descricao: "" },
            ],
          },
        });
      };
    
      const removeClausula = (index: number) => {
        const updatedClausulas = contract.details.clausulas.filter(
          (_, i) => i !== index
        );
        setContract({
          ...contract,
          details: { ...contract.details, clausulas: updatedClausulas },
        });
      };
    
    return(
        <>
        {tabIndex == 3 && (
        <Grid item xs={12}>
          <h3>Cláusulas</h3>
          <Button
            sx={{ height: 30, minWidth: 30, width: 30, borderRadius: 100 }}
            variant="contained"
            color="primary"
            onClick={addClausula}
          >
            <Add />
          </Button>
          {contract.details?.clausulas?.map((clausula, index) => (
            <Grid container spacing={2} key={index} display="flex">
              <Grid item xs={12} sm={5}>
                <TextField
                  label={`Cláusula ${index + 1}`}
                  name="nome"
                  value={clausula.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleClausulaChange(e, index)
                  }
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Descrição"
                  name="descricao"
                  value={clausula.descricao}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleClausulaChange(e, index)
                  }
                  fullWidth
                  margin="normal"
                  required
                  multiline
                />
              </Grid>

              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: 8, padding: "0 15px" }}>
                  <Button
                    variant="contained"
                    onClick={() => removeClausula(index)}
                  >
                    <Delete style={{ color: "#fff" }} />
                  </Button>
                </div>
                <Divider sx={{ margin: "20px 15px" }} textAlign="right">
                  {index + 1}
                </Divider>
              </div>
            </Grid>
          ))}
        </Grid>
      )}

      {tabIndex === 4 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cidade da Assinatura"
              name="cidade_assinatura"
              value={contract?.details?.assinatura?.cidade_assinatura}
              onChange={handleSignatureChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data da Assinatura"
              name="data_assinatura"
              type="date"
              value={contract?.details?.assinatura?.data_assinatura}
              onChange={handleSignatureChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
        </Grid>
      )}
        </>
    )
}