import React, { useEffect, useState } from "react";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Contract } from "../../interfaces/Contract";
import { User } from "../../interfaces/User";

import api from "../../api/api";
import TabIndexPrimary from "../../components/contrato/TabIndexPrimary";
import TabIndexSecondary from "../../components/contrato/TabIndexSecondary";
import TabIndexTertiary from "../../components/contrato/TabIndexTertiary";
import TabIndexQuaternary from "../../components/contrato/TabIndexQuaternary";
import TabButtons from "../../components/contrato/TabButtons";



const CriarContrato: React.FC = () => {
  
  const { id } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useState<User>();

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const [contract, setContract] = useState<Contract>({
    user_id: null,
    contract_number: "",
    start_date: "",
    end_date: null,
    value: null,
    status: null,
    details: {
      contrato: {
        servico_prestado: "",
      },
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

  return (
    <Box sx={{ maxWidth: "100%", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Contrato" : "Criar Contrato"}
      </Typography>

      <TabButtons
        contract={contract}
        id={id}
        setTabIndex={setTabIndex}
        tabIndex={tabIndex}
      />

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Contrato" />
        <Tab label="Contratante" />
        <Tab label="Contratado" />
        <Tab label="Cláusulas" />
        <Tab label="Testemunhas" />
      </Tabs>

      <TabIndexPrimary
        contract={contract}
        setContract={setContract}
        tabIndex={tabIndex}
      />
      <TabIndexSecondary
        contract={contract}
        tabIndex={tabIndex}
        setContract={setContract}
      />
      <TabIndexTertiary
        setContract={setContract}
        contract={contract}
        tabIndex={tabIndex}
      />
      <TabIndexQuaternary
        contract={contract}
        setContract={setContract}
        tabIndex={tabIndex}
      />
    </Box>
  );
};

export default CriarContrato;
