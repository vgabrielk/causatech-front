import { Grid, TextField } from "@mui/material";

export default function TabIndexPrimary({ contract, tabIndex, setContract }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContract((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContratoChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setContract((prevContract) => ({
      ...prevContract,
      details: {
        ...prevContract.details,
        contrato: {
          ...prevContract.details.contrato,
          [name as keyof typeof prevContract.details.contrato]: value,
        },
      },
    }));
  };
  return (
    <>
      {tabIndex === 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Serviço prestado"
              name="servico_prestado"
              value={contract?.details?.contrato?.servico_prestado}
              onChange={handleContratoChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Número do Contrato"
              name="contract_number"
              value={contract.contract_number}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Valor"
              name="value"
              type="number"
              value={contract.value || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data de Início"
              name="start_date"
              type="date"
              value={contract.start_date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data de Término"
              name="end_date"
              type="date"
              value={contract.end_date || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
