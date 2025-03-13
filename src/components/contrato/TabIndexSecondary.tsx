import {
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function TabIndexSecondary({
  contract,
  tabIndex,
  setContract
}) {
    const handleContratanteChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = event.target;
      
        setContract((prevContract) => ({
          ...prevContract,
          details: {
            ...prevContract.details,
            contratante: {
              ...prevContract.details.contratante,
              [name]: value,
            },
          },
        }));
      };
  return (
    <>
      {tabIndex === 1 && (
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <h3>O Contratante, é uma pessoa física ou jurídica?</h3>
                <RadioGroup
                  name="contratante_natureza"
                  value={
                    contract?.details?.contratante?.contratante_natureza || ""
                  }
                  onChange={handleContratanteChange}
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
          {contract?.details?.contratante?.contratante_natureza == "pf" && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome completo"
                name="nome_completo"
                value={contract?.details?.contratante?.nome_completo}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Nacionalidade"
                name="nacionalidade"
                value={contract?.details?.contratante?.nacionalidade}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Estado civil"
                name="estado_civil"
                value={contract?.details?.contratante?.estado_civil}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="CPF"
                name="cpf"
                value={contract?.details?.contratante?.cpf}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Endereço completo"
                name="endereco"
                value={contract?.details?.contratante?.endereco}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                value={contract?.details?.contratante?.email}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          )}

          {contract?.details?.contratante?.contratante_natureza == "pj" && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Razão social"
                name="razao_social"
                value={contract?.details?.contratante?.razao_social}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="CNPJ"
                name="cnpj"
                value={contract?.details?.contratante?.cnpj}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Endereço completo"
                name="endereco"
                value={contract?.details?.contratante?.endereco}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Email"
                name="email"
                value={contract?.details?.contratante?.email}
                onChange={handleContratanteChange}
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
                value={contract?.details?.contratante?.nome_completo}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Nacionalidade do Representante Legal"
                name="nacionalidade"
                value={contract?.details?.contratante?.nacionalidade}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Estado Civil do Representante Legal"
                name="estado_civil"
                value={contract?.details?.contratante?.estado_civil}
                onChange={handleContratanteChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="CPF do Representante Legal"
                name="cpf"
                value={contract?.details?.contratante?.cpf}
                onChange={handleContratanteChange}
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
