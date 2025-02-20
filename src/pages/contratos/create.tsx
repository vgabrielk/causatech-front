import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Response } from "../../services/createAndUpdate";
import { useNavigate, useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import { ContratosPDF } from "./contratos-pdf";
import api from "../../api/api";
import { Add, Delete, SkipNext, SkipPrevious } from "@mui/icons-material";
import { ContratosPDF } from "./contratos-pdf";

interface Contract {
  user_id: number | null;
  contract_number: string;
  start_date: string;
  end_date: string | null;
  value: string | null;
  status: "active" | "inactive" | "canceled" | null;
  details: {
    contrato: {
      servico_prestado?: string;
      vezes_no_mes?: string;
      tempo_servico?: string;
    };
    contratado: {
      contratado_natureza?: string;
      razao_social?: string;
      cnpj?: string;
      endereco?: string;
      email?: string;
      representante_legal?: string;
      nacionalidade?: string;
      estado_civil?: string;
      cpf?: string;
      nome_completo?: string;
    };
    contratante: {
      contratante_natureza?: string;
      razao_social?: string;
      cnpj?: string;
      endereco?: string;
      email?: string;
      representante_legal?: string;
      nacionalidade?: string;
      estado_civil?: string;
      cpf?: string;
      nome_completo?: string;
    };
    pagamento: {
      valor_servico?: string; // Valor em reais (número e por extenso)
      pagamento_unico_ou_recorrente?: string; // Checkbox
      dia_pagamento_unico?: string; // Caso seja pagamento único
      quantas_vezes?: string; // Caso seja pagamento recorrente
      valor_de_cada_pagamento?: string; // Ex: 750 (setecentos) // Numérico e por extenso
      data_primeiro_pagamento?: string; // Campo de data
      data_primeiro_pagamento_recorrente?: string; // Campo de data
      meio_de_pagamento?: string; // Transferência bancária / Boleto / Outro
      outro_meio_de_pagamento?: string; // Apenas se for selecionado "Outro"
    };

    clausulas: { nome: string; descricao: string }[];

    assinatura: {
      cidade_assinatura?: string; // Cidade onde foi feita a assinatura do contrato
      data_assinatura?: string; // Data da assinatura
    };

    testemunha: {
      tem_testemunhas?: string; // Se o contrato terá testemunhas
      nome_primeira_testemunha?: string;
      cpf_primeira_testemunha?: string;
      nome_segunda_testemunha?: string;
      cpf_segunda_testemunha?: string;
    };
  };
}

const CriarContrato: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const [user, setUser] = useState();

  const [contract, setContract] = useState<Contract>({
    user_id: null,
    contract_number: "",
    start_date: "",
    end_date: null,
    value: null,
    status: null,
    details: {
      servico_prestado: "",
      vezes_no_mes: "",
      tempo_servico: "",

      contratado: {
        contratado_natureza: "",
        razao_social: "",
        cnpj: "",
        endereco: "",
        email: "",
        representante_legal: "",
        nacionalidade: "",
        estado_civil: "",
        cpf: "",
        nome_completo: "",
      },
      contratante: {
        contratante_natureza: "",
        razao_social: "",
        cnpj: "",
        endereco: "",
        email: "",
        representante_legal: "",
        nacionalidade: "",
        estado_civil: "",
        cpf: "",
        nome_completo: "",
      },
      pagamento: {
        valor_servico: "",
        pagamento_unico_ou_recorrente: "",
        dia_pagamento_unico: "",
        quantas_vezes: "",
        valor_de_cada_pagamento: "",
        data_primeiro_pagamento: "",
        meio_de_pagamento: "",
        outro_meio_de_pagamento: "",
      },

      clausula: {
        clausula_nao_concorrencia_e_sigilo: "",
        valor_multa_quebrada: "",
        tempo_acordo_mantido: "",
      },
      clausulas: [{ nome: "", descricao: "" }],
      assinatura: {
        cidade_assinatura: "",
        data_assinatura: "",
      },

      testemunha: {
        tem_testemunhas: "",
        nome_primeira_testemunha: "",
        cpf_primeira_testemunha: "",
        nome_segunda_testemunha: "",
        cpf_segunda_testemunha: "",
      },
    },
  });

  const getUser = async () => {
    const response = await api.get("/user");
    console.log(response);
    setUser(response.data);
    return;
  };

  const getContract = async () => {
    if (id) {
      const response = await api.get(`/contracts/${id}`);
      console.log(response.data);
      setContract(response.data);
    }
    return;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(contract);
      if (id) {
        (await api.put(`/contracts/${id}`, contract)) as Response;
        toast.success("Atualizado com sucesso!");
      } else {
        (await api.post("/contracts", contract)) as Response;
        toast.success("Cadastrado com sucesso!");
        navigate("/contratos");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Erro inesperado";
      toast.error(errorMessage);
    }
  };

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

  const handleContratanteChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (!name) return;

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


  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setContract((prevContract) => ({
        ...prevContract,
        user_id: user.id,
      }));
      getContract();
    }
  }, [user]);

  // const contratanteOptions = [
  //   {
  //     value: 'pf',
  //     label: 'Pessoa física'
  //   },
  //   {
  //     value: 'pj',
  //     label: 'Pessoa Jurídica'
  //   }
  // ]

  return (
    <Box sx={{ maxWidth: "100%", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Contrato" : "Criar Contrato"}
      </Typography>

      <Box sx={{ mt: 2, display: "flex", gap: 2, marginBottom: 2 }}>
        {/* {id && (
          <PDFDownloadLink
            className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary"
            document={<ContratosPDF contract={contract} />}
            fileName={`CT-${contract.contract_number}`}
          >
            <Download />
          </PDFDownloadLink>
        )} */}
          <>
            <Button
            onClick={() => setTabIndex(tabIndex - 1)}
            variant="contained"
            color="primary"
            disabled={tabIndex == 0 }
          >
            <SkipPrevious/>
          </Button>
            </>
          <>
          <Button
            onClick={() => setTabIndex(tabIndex + 1)}
            variant="contained"
            color="primary"
            disabled={tabIndex == 4}
            >
            <SkipNext/>
          </Button>
            </>
        

          <Button  onClick={handleSubmit} variant="contained" color="primary">
            {id ? "Atualizar Contrato" : "Criar Contrato"}
          </Button>
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange} variant="standard">
        <Tab label="Contrato" />
        <Tab label="Contratante" />
        <Tab label="Contratado" />
        <Tab label="Cláusulas" />
        <Tab label="Testemunhas" />
      </Tabs>

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

      {tabIndex == 3 && (
        <Grid item xs={12}>
          <h3>Cláusulas</h3>
          <Button
          
          sx={{height: 30, minWidth: 30, width: 30, borderRadius: 100}}
            variant="outlined"
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
                  onChange={(e) => handleClausulaChange(e, index)}
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
                  onChange={(e) => handleClausulaChange(e, index)}
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
                <Divider sx={{margin: '20px 15px'}} textAlign="right">{index+1}</Divider>
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

<PDFDownloadLink fileName={`CT-${contract?.contract_number}`} document={<ContratosPDF contract={contract} />}>
Download
</PDFDownloadLink>
     
      {/* {contract ? <ContractPreview contract={contract as any} /> : null} */}
    </Box>
  );
};

export default CriarContrato;
