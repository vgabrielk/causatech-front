import {
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function TabIndexTertiary({
  contract,
  tabIndex,
  setContract,
}) {
     const handleContratadoChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = event.target;
        if (!name) return;
    
        setContract((prevContract) => ({
          ...prevContract,
          details: {
            ...prevContract.details,
            contratado: {
              ...prevContract.details.contratado,
              [name]: value,
            },
          },
        }));
      };
  return (
    <>
      {tabIndex === 2 && (
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <h3>O Contratado, é uma pessoa física ou jurídica?</h3>
                <RadioGroup
                  name="contratado_natureza"
                  value={
                    contract?.details?.contratado?.contratado_natureza || ""
                  }
                  onChange={handleContratadoChange}
                >
                  <FormControlLabel
                    value="pf"
                    control={<Radio />}
                    label="Pessoa física"
                  />
                  <FormControlLabel
                    value="pj"
                    control={<Radio />}
                    label="Pessoa Jurídica"
                  />
                </RadioGroup>
              </FormGroup>
            </Grid>
          </Grid>

          {contract?.details?.contratado?.contratado_natureza == "pf" && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome completo"
                name="nome_completo"
                value={contract?.details?.contratado?.nome_completo}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Nacionalidade"
                name="nacionalidade"
                value={contract?.details?.contratado?.nacionalidade}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Estado civil"
                name="estado_civil"
                value={contract?.details?.contratado?.estado_civil}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="CPF"
                name="cpf"
                value={contract?.details?.contratado?.cpf}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Endereço completo"
                name="endereco"
                value={contract?.details?.contratado?.endereco}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                value={contract?.details?.contratado?.email}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          )}

          {contract?.details?.contratado?.contratado_natureza == "pj" && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Razão social"
                name="razao_social"
                value={contract?.details?.contratado?.razao_social}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="CNPJ"
                name="cnpj"
                value={contract?.details?.contratado?.cnpj}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Endereço completo"
                name="endereco"
                value={contract?.details?.contratado?.endereco}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                value={contract?.details?.contratado?.email}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <h3>E quem será o representante legal da pessoa jurídica?</h3>
              <p>
                É preciso que uma pessoa física represente legalmente a pessoa
                jurídica. Ela pode ser qualquer pessoa vinculada à pessoa
                jurídica que seja apta a representá-la.
              </p>
              <TextField
                label="Nome Completo do Representante Legal"
                name="nome_completo"
                value={contract?.details?.contratado?.nome_completo}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Nacionalidade do Representante Legal"
                name="nacionalidade"
                value={contract?.details?.contratado?.nacionalidade}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Estado Civil do Representante Legal"
                name="estado_civil"
                value={contract?.details?.contratado?.estado_civil}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="CPF do Representante Legal"
                name="cpf"
                value={contract?.details?.contratado?.cpf}
                onChange={handleContratadoChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          )}
        </>
      )}
    </>
  );
}
